import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { habits } from "~/server/db/schema";

export const habitRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(habits).values({
        userId: ctx.session.user.id,
        name: input.name,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        newName: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(habits)
        .set({
          name: input.newName,
        })
        .where(eq(habits.id, input.id));
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(habits).where(eq(habits.id, input.id));
    }),

  getByUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.habits.findMany({
      where: eq(habits.userId, ctx.session.user.id),
      orderBy: (habits, { asc }) => [asc(habits.id)],
    });
  }),
});

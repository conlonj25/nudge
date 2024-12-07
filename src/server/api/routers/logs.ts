import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { logs } from "~/server/db/schema";

export const logRouter = createTRPCRouter({
  getByUserAndDate: protectedProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.logs.findMany({
        where: (logs, { and, eq }) =>
          and(eq(logs.userId, ctx.session.user.id), eq(logs.date, input.date)),
        orderBy: (logs, { asc }) => [asc(logs.id)],
      });
    }),

  getByThisYear: protectedProcedure
    .input(z.object({ habitId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.logs.findMany({
        where: (logs, { and, eq, between }) =>
          and(
            eq(logs.userId, ctx.session.user.id),
            eq(logs.habitId, input.habitId),
            between(logs.date, "2024-01-01", "2024-12-31"),
          ),
        orderBy: (logs, { asc }) => [asc(logs.date)],
      });
    }),

  setLogEntry: protectedProcedure
    .input(
      z.object({
        date: z.string().min(1),
        habitId: z.number(),
        valueBoolean: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingLog = await ctx.db.query.logs.findFirst({
        where: and(eq(logs.date, input.date), eq(logs.habitId, input.habitId)),
      });
      if (existingLog) {
        await ctx.db
          .update(logs)
          .set({
            valueBoolean: input.valueBoolean,
          })
          .where(eq(logs.id, existingLog.id));
      } else {
        await ctx.db.insert(logs).values({
          date: input.date,
          userId: ctx.session.user.id,
          habitId: input.habitId,
          valueBoolean: input.valueBoolean,
        });
      }
    }),
});

import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { logs } from "~/server/db/schema";

export const logRouter = createTRPCRouter({
  getByUserAndDate: protectedProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          id: logs.id,
          date: logs.date,
          habitId: logs.habitId,
          userId: logs.userId,
          valueBoolean: logs.valueBoolean,
        })
        .from(logs)
        .where(
          eq(logs.userId, ctx.session.user.id) && eq(logs.date, input.date),
        );
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

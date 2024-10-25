import { z } from "zod";
import { eq } from 'drizzle-orm';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { habits, logs } from "~/server/db/schema";

export const habitRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(habits).values({
        userId: ctx.session.user.id,
        name: input.name,
        habitType: 'boolean'
      });
    }),

    update: protectedProcedure
    .input(z.object({
      id: z.number(),
      newName: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(habits).set({
        name: input.newName,
      })
      .where(eq(habits.id, input.id));
    }),

    delete: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(habits)
      .where(eq(habits.id, input.id));
    }),

    getLatest: protectedProcedure.query(async ({ ctx }) => {
      const habit = await ctx.db.query.habits.findMany({
        orderBy: (habits, { asc }) => [asc(habits.name)],
      });
  
      return habit ?? null;
    }),

    getByDate: protectedProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.select({
          id: logs.id,
          name: habits.name,
          value: logs.valueBoolean
        })
          .from(logs)
          .where(eq(logs.date, input.date))
          .leftJoin(habits, eq(logs.habitId, habits.id));

          return habit ?? null;
    }),

    setLogEntry: protectedProcedure
    .input(z.object({
      id: z.number(),
      value: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(logs).set({
        valueBoolean: input.value,
      })
      .where(eq(logs.id, input.id));
    }),

});

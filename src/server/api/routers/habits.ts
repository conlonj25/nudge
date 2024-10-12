import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { habits } from "~/server/db/schema";

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

    getLatest: protectedProcedure.query(async ({ ctx }) => {
      const habit = await ctx.db.query.habits.findMany({
        orderBy: (habits, { asc }) => [asc(habits.name)],
      });
  
      return habit ?? null;
    }),

  
});

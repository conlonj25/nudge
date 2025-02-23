import { z } from "zod";
import { eq } from "drizzle-orm";
import { publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { createSSCRouter } from "../trpc";

export const userRouter = createSSCRouter({
  modifyUserAccess: publicProcedure
    .input(
      z.object({
        email: z.string().min(1),
        priceId: z.string(),
        hasAccess: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          priceId: input.priceId,
          hasAccess: input.hasAccess,
        })
        .where(eq(users.email, input.email));
    }),
});

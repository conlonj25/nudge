import { env } from "~/env";
import { db } from "../db";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

const createSSCContext = async (opts: { headers: Headers }) => {
  const secret = env.STRIPE_WEBHOOK_SECRET;

  return {
    db,
    secret,
    ...opts,
  };
};

const t = initTRPC.context<typeof createSSCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createSSCRouter = t.router;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (ctx.secret !== env.SSC_SECRET) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
});

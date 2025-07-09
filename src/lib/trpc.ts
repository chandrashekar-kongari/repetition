import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { stackServerApp } from "@/stack";
import type { ServerUser } from "@stackframe/stack";

// Define the context type
export type Context = {
  user: ServerUser | null;
};

// Create context function
export const createContext = async (): Promise<Context> => {
  try {
    const user = await stackServerApp.getUser();
    return { user };
  } catch (error) {
    // User is not authenticated or other error occurred
    console.warn("Failed to get user in TRPC context:", error);
    return { user: null };
  }
};

const t = initTRPC.context<Context>().create({
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

export const router = t.router;
export const publicProcedure = t.procedure;

// Create an authenticated procedure that requires a user
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // This ensures TypeScript knows user is not null
    },
  });
});

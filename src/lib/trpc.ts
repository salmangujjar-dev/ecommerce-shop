import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
  };
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 * Avoid exporting the entire t-object since it's not very descriptive.
 * For instance, the use of a t variable is common in i18n libraries.
 */
const t = initTRPC.create({
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

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
// const timingMiddleware = t.middleware(async ({ next, path }) => {
//   const start = Date.now();

//   if (t._config.isDev) {
//     // artificial delay in dev
//     const waitMs = Math.floor(Math.random() * 400) + 100;
//     await new Promise((resolve) => setTimeout(resolve, waitMs));
//   }

//   const result = await next();

//   const end = Date.now();
//   console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

//   return result;
// });
// export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

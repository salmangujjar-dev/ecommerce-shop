import { initTRPC, TRPCError } from '@trpc/server';
import { JWTPayload } from 'jose';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { JWTService } from '@services/JWT';

import prisma from './prisma';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const token = opts.headers.get('cookie')?.split('token=')[1]?.split(';')[0];
  const user = token ? await JWTService.decrypt(token) : undefined;

  return {
    ...opts,
    user: user as (JWTPayload & UserJWTPayload) | undefined,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 * Avoid exporting the entire t-object since it's not very descriptive.
 * For instance, the use of a t variable is common in i18n libraries.
 */
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

const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const user = await prisma.user.findUnique({
    where: { id: ctx.user.id },
  });

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

const isAdminAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const user = await prisma.user.findUnique({
    where: { id: ctx.user.id },
  });

  if (!user?.isAdmin) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Admin access required',
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdminAuthed);

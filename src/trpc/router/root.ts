import { createCallerFactory, createTRPCRouter } from '@lib/trpc';

import { authRouter } from './auth';
import { categoryRouter } from './category';
import { productRouter } from './product';
import { reviewRouter } from './review';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: userRouter,
  categories: categoryRouter,
  products: productRouter,
  reviews: reviewRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

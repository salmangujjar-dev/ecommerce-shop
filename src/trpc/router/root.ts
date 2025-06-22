import { createCallerFactory, createTRPCRouter } from '@lib/trpc';

import { adminRouter } from './admin';
import { authRouter } from './auth';
import { cartRouter } from './cart';
import { categoryRouter } from './category';
import { genderRouter } from './gender';
import { newsletterRouter } from './newsletter';
import { orderRouter } from './order';
import { productRouter } from './product';
import { reviewRouter } from './review';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: userRouter,
  categories: categoryRouter,
  genders: genderRouter,
  products: productRouter,
  reviews: reviewRouter,
  admin: adminRouter,
  cart: cartRouter,
  orders: orderRouter,
  newsletter: newsletterRouter,
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

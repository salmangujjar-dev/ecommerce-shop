import { z } from "zod";

import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "@lib/trpc";

import { productRouter } from "./product";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  users: userRouter,
  products: productRouter,
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

import prisma from '@lib/prisma';
import { createTRPCRouter, publicProcedure } from '@lib/trpc';

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
});

import { z } from 'zod';

import prisma from '@lib/prisma';
import { createTRPCRouter, protectedProcedure } from '@lib/trpc';

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
  getById: protectedProcedure.input(z.string()).query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });
    return user;
  }),
});

import { z } from 'zod';

import prisma from '@lib/prisma';
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '@lib/trpc';

export const userRouter = createTRPCRouter({
  getAll: adminProcedure.query(async () => {
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
        isAdmin: true,
        isActive: true,
      },
    });
    return user;
  }),
});

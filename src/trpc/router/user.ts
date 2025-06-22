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
  updateName: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const user = await prisma.user.update({
        where: { id: userId },
        data: { name: input.name },
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
  updatePassword: protectedProcedure
    .input(
      z.object({
        oldPassword: z.string().min(6),
        newPassword: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user || !user.password) throw new Error('User not found');
      const { compare, hash } = await import('bcrypt-ts');
      const isValid = await compare(input.oldPassword, user.password);
      if (!isValid) throw new Error('Old password is incorrect');
      const hashed = await hash(input.newPassword, 10);
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashed },
      });
      return { success: true };
    }),
});

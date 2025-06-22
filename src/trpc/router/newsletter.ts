import { z } from 'zod';

import prisma from '@lib/prisma';
import { createTRPCRouter, publicProcedure } from '@lib/trpc';

export const newsletterRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const email = input.email.toLowerCase();
      // Check if already subscribed
      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email },
      });
      if (existing) {
        return { success: false, message: 'You are already subscribed.' };
      }
      await prisma.newsletterSubscriber.create({ data: { email } });
      return { success: true, message: 'Thanks for signing up!' };
    }),
});

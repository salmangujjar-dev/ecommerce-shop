import { z } from 'zod';

import prisma from '@lib/prisma';
import { createTRPCRouter, publicProcedure } from '@lib/trpc';

export const genderRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return prisma.gender.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.gender.findUnique({
        where: { id: input.id },
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return prisma.gender.findUnique({
        where: { slug: input.slug },
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
    }),
});

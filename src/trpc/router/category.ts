import { z } from 'zod';

import prisma from '@lib/prisma';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@lib/trpc';

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return prisma.category.findMany({
      include: {
        subcategories: true,
        _count: {
          select: { products: true },
        },
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.category.findUnique({
        where: { id: input.id },
        include: {
          subcategories: true,
          products: {
            include: {
              images: true,
              colors: true,
              sizes: true,
            },
          },
        },
      });
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return prisma.category.findUnique({
        where: { slug: input.slug },
        include: {
          subcategories: true,
          products: {
            include: {
              images: true,
              colors: true,
              sizes: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.category.create({
        data: input,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ input: { id, ...data } }) => {
      return prisma.category.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.category.delete({
        where: { id: input.id },
      });
    }),
});

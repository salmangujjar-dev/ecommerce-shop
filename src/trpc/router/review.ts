import { z } from 'zod';

import prisma from '@lib/prisma';
import { createTRPCRouter, publicProcedure } from '@lib/trpc';

export const reviewRouter = createTRPCRouter({
  getByProductId: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      return prisma.review.findMany({
        where: { productId: input.productId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }),

  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return prisma.review.findMany({
        where: { userId: input.userId },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              images: {
                where: { primary: true },
                select: { src: true, alt: true },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        userId: z.string(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const review = await prisma.review.create({
        data: input,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
      });

      // Update product rating
      const productReviews = await prisma.review.findMany({
        where: { productId: input.productId },
        select: { rating: true },
      });

      const averageRating =
        productReviews.reduce((acc, review) => acc + review.rating, 0) /
        productReviews.length;

      await prisma.product.update({
        where: { id: input.productId },
        data: {
          rating: averageRating,
          reviewCount: productReviews.length,
        },
      });

      return review;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        rating: z.number().min(1).max(5).optional(),
        comment: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const review = await prisma.review.update({
        where: { id },
        data,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
      });

      // Update product rating
      const productReviews = await prisma.review.findMany({
        where: { productId: review.productId },
        select: { rating: true },
      });

      const averageRating =
        productReviews.reduce((acc, review) => acc + review.rating, 0) /
        productReviews.length;

      await prisma.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating,
          reviewCount: productReviews.length,
        },
      });

      return review;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const review = await prisma.review.delete({
        where: { id: input.id },
      });

      // Update product rating
      const productReviews = await prisma.review.findMany({
        where: { productId: review.productId },
        select: { rating: true },
      });

      const averageRating =
        productReviews.length > 0
          ? productReviews.reduce((acc, review) => acc + review.rating, 0) /
            productReviews.length
          : 0;

      await prisma.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating,
          reviewCount: productReviews.length,
        },
      });

      return review;
    }),
});

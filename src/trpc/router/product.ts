import { z } from 'zod';

import prisma from '@lib/prisma';
import { createTRPCRouter, publicProcedure } from '@lib/trpc';

import type { Prisma } from '../../../prisma/generated';

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        gender: true,
        images: true,
        colors: true,
        sizes: true,
        _count: {
          select: { reviews: true },
        },
      },
    });
    return products.map((product) => ({
      ...product,
      price: Number(product.price) || 0,
    }));
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { id: input.id },
        include: {
          category: true,
          gender: true,
          images: true,
          colors: { include: { color: true } },
          sizes: true,
          variants: {
            include: {
              color: true,
              size: true,
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                },
              },
            },
          },
        },
      });
      if (!product) return null;
      return {
        ...product,
        price: Number(product.price) || 0,
        rating:
          product.reviews.length > 0
            ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
              product.reviews.length
            : 0,
        variants: product.variants.map((variant) => ({
          ...variant,
          price: variant.price != null ? Number(variant.price) : null,
        })),
      };
    }),

  getByIds: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: { id: { in: input.ids } },
        include: {
          images: true,
        },
      });
      return products.map((product) => ({
        ...product,
        price: Number(product.price) || 0,
      }));
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { slug: input.slug },
        include: {
          category: true,
          gender: true,
          images: true,
          colors: true,
          sizes: true,
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                },
              },
            },
          },
        },
      });
      if (!product) return null;
      return {
        ...product,
        price: Number(product.price) || 0,
      };
    }),

  getByFilter: publicProcedure
    .input(
      z.object({
        categoryId: z.string().optional(),
        categorySlug: z.string().optional(),
        genderSlug: z.string().optional(),
        genderId: z.string().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        search: z.string().optional(),
        colors: z.array(z.string()).optional(),
        sizes: z.array(z.string()).optional(),
        sort: z
          .enum(['popularity', 'newest', 'price_asc', 'price_desc', 'rating'])
          .optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input }) => {
      const {
        categoryId,
        categorySlug,
        genderSlug,
        genderId,
        minPrice,
        maxPrice,
        search,
        colors,
        sizes,
        sort,
        page,
        limit,
      } = input;
      const skip = (page - 1) * limit;

      const where: Prisma.ProductWhereInput = {
        ...(categoryId && {
          OR: [
            { categoryId },
            {
              category: {
                parentId: categoryId,
              },
            },
          ],
        }),
        ...(genderId && { genderId }),
        ...(categorySlug && {
          OR: [
            {
              category: {
                slug: categorySlug,
              },
            },
            {
              category: {
                parent: {
                  slug: categorySlug,
                },
              },
            },
          ],
        }),
        ...(genderSlug && {
          gender: {
            OR: [{ slug: genderSlug }, { slug: 'unisex' }],
          },
        }),
        ...(minPrice && { price: { gte: minPrice } }),
        ...(maxPrice && { price: { lte: maxPrice } }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }),
        ...(colors &&
          colors.length > 0 && {
            colors: {
              some: {
                color: {
                  slug: { in: colors },
                },
              },
            },
          }),
        ...(sizes &&
          sizes.length > 0 && {
            sizes: {
              some: {
                name: {
                  in: sizes.map((size) => size.toUpperCase()),
                },
              },
            },
          }),
      };

      // Determine sort order based on the sort parameter
      let orderBy: Prisma.ProductOrderByWithRelationInput | undefined;
      switch (sort) {
        case 'popularity':
          // Sort by number of reviews in descending order
          orderBy = { reviews: { _count: 'desc' } };
          break;
        case 'newest':
          orderBy = { createdAt: 'desc' };
          break;
        case 'price_asc':
          orderBy = { price: 'asc' };
          break;
        case 'price_desc':
          orderBy = { price: 'desc' };
          break;
        case 'rating':
          orderBy = { rating: 'desc' };
          break;
        default:
          orderBy = { createdAt: 'desc' };
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            category: true,
            gender: true,
            images: true,
            colors: { include: { color: true } },
            sizes: true,
            variants: {
              include: {
                color: true,
                size: true,
              },
            },
            _count: { select: { reviews: true } },
            reviews: true,
          },
          orderBy,
          skip,
          take: limit,
        }),
        prisma.product.count({ where }),
      ]);

      return {
        products: products.map((product) => ({
          ...product,
          price: Number(product.price),
          rating:
            product.reviews.length > 0
              ? product.reviews.reduce(
                  (acc, review) => acc + review.rating,
                  0
                ) / product.reviews.length
              : 0,
          variants: product.variants.map((variant) => ({
            ...variant,
            price: variant.price != null ? Number(variant.price) : null,
          })),
        })),
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }),

  getVariantsByIds: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ input }) => {
      const variants = await prisma.productVariant.findMany({
        where: { id: { in: input.ids } },
        include: {
          product: {
            include: {
              images: true,
            },
          },
          color: true,
          size: true,
        },
      });
      return variants.map((variant) => ({
        ...variant,
        price: variant.price != null ? Number(variant.price) : null,
      }));
    }),
});

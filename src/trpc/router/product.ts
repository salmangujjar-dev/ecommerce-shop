import { z } from 'zod';

import prisma from '@lib/prisma';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@lib/trpc';

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
          colors: {
            include: {
              color: true,
            },
          },
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
      return product ? { ...product, price: Number(product.price) || 0 } : null;
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
      return product ? { ...product, price: Number(product.price) || 0 } : null;
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
        sort,
        page,
        limit,
      } = input;
      const skip = (page - 1) * limit;

      const where: Prisma.ProductWhereInput = {
        ...(categoryId && { categoryId }),
        ...(genderId && { genderId }),
        ...(categorySlug && {
          category: {
            slug: categorySlug,
          },
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
            colors: true,
            sizes: true,
            _count: {
              select: { reviews: true },
            },
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
        })),
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string(),
        price: z.number(),
        categoryId: z.string(),
        genderId: z.string(),
        details: z.array(z.string()),
        images: z.array(
          z.object({
            src: z.string(),
            alt: z.string(),
            primary: z.boolean().optional(),
          })
        ),
        colors: z.array(z.string()),
        sizes: z.array(
          z.object({
            name: z.string(),
            inStock: z.boolean().optional(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { images, colors, sizes, ...productData } = input;

      return prisma.product.create({
        data: {
          ...productData,
          images: {
            create: images,
          },
          colors: {
            create: colors.map((colorId) => ({
              color: {
                connect: { id: colorId },
              },
            })),
          },
          sizes: {
            create: sizes,
          },
        },
        include: {
          category: true,
          gender: true,
          images: true,
          colors: {
            include: {
              color: true,
            },
          },
          sizes: true,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        categoryId: z.string().optional(),
        genderId: z.string().optional(),
        details: z.array(z.string()).optional(),
        images: z
          .array(
            z.object({
              id: z.string().optional(),
              src: z.string(),
              alt: z.string(),
              primary: z.boolean().optional(),
            })
          )
          .optional(),
        colors: z.array(z.string()).optional(),
        sizes: z
          .array(
            z.object({
              id: z.string().optional(),
              name: z.string(),
              inStock: z.boolean().optional(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, images, colors, sizes, ...productData } = input;

      // Handle nested updates
      const updateData: Prisma.ProductUpdateInput = { ...productData };

      if (images) {
        updateData.images = {
          deleteMany: {},
          create: images.map((img) => ({
            src: img.src,
            alt: img.alt,
            primary: img.primary,
          })),
        };
      }

      if (colors) {
        updateData.colors = {
          deleteMany: {},
          create: colors.map((colorId) => ({
            color: {
              connect: { id: colorId },
            },
          })),
        };
      }

      if (sizes) {
        updateData.sizes = {
          deleteMany: {},
          create: sizes.map((size) => ({
            name: size.name,
            inStock: size.inStock,
          })),
        };
      }

      return prisma.product.update({
        where: { id },
        data: updateData,
        include: {
          category: true,
          gender: true,
          images: true,
          colors: {
            include: {
              color: true,
            },
          },
          sizes: true,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.product.delete({
        where: { id: input.id },
      });
    }),
});

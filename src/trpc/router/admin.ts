import { z } from 'zod';

import prisma from '@lib/prisma';
import { createTRPCRouter, protectedProcedure } from '@lib/trpc';

import type { Prisma } from '../../../prisma/generated';

export const adminRouter = createTRPCRouter({
  // Dashboard Stats
  getDashboardStats: protectedProcedure.query(async () => {
    const [
      totalProducts,
      totalCategories,
      totalOrders,
      totalUsers,
      recentOrders,
      lowStockProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.product.findMany({
        where: {
          OR: [
            { sizes: { some: { inStock: false } } },
            { variants: { some: { inStock: false } } },
          ],
        },
        take: 10,
        include: {
          category: true,
          images: true,
        },
      }),
    ]);

    return {
      totalProducts,
      totalCategories,
      totalOrders,
      totalUsers,
      recentOrders,
      lowStockProducts,
    };
  }),

  // Product Management
  getAllProducts: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
        categoryId: z.string().optional(),
        genderId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, search, categoryId, genderId } = input;
      const skip = (page - 1) * limit;

      const where: Prisma.ProductWhereInput = {
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(categoryId && { categoryId }),
        ...(genderId && { genderId }),
      };

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          include: {
            category: true,
            gender: true,
            images: true,
            colors: { include: { color: true } },
            sizes: true,
            _count: {
              select: { reviews: true, orders: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.product.count({ where }),
      ]);

      return {
        products: products.map((product) => ({
          ...product,
          price: Number(product.price),
        })),
        total,
        pages: Math.ceil(total / limit),
      };
    }),

  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().min(1),
        price: z.number().positive(),
        genderId: z.string(),
        categoryId: z.string(),
        details: z.array(z.string()).optional(),
        images: z
          .array(
            z.object({
              src: z.string().url(),
              alt: z.string(),
              primary: z.boolean().default(false),
            })
          )
          .optional(),
        variants: z
          .array(
            z.object({
              colorId: z.string(),
              sizeId: z.string(),
              price: z.number().positive().optional(),
              inStock: z.boolean().default(true),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { images = [], variants = [], ...productData } = input;

      return prisma.product.create({
        data: {
          ...productData,
          price: productData.price,
          images: {
            create: images,
          },
          variants: {
            create: variants.map((variant) => ({
              colorId: variant.colorId,
              sizeId: variant.sizeId,
              price: variant.price,
              inStock: variant.inStock,
            })),
          },
        },
        include: {
          category: true,
          gender: true,
          images: true,
          variants: {
            include: {
              color: true,
              size: true,
            },
          },
        },
      });
    }),

  updateProduct: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        price: z.number().positive().optional(),
        genderId: z.string().optional(),
        categoryId: z.string().optional(),
        details: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input: { id, ...data } }) => {
      return prisma.product.update({
        where: { id },
        data: {
          ...data,
          ...(data.price && { price: data.price }),
        },
        include: {
          category: true,
          gender: true,
          images: true,
          colors: { include: { color: true } },
          sizes: true,
        },
      });
    }),

  deleteProduct: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.product.delete({
        where: { id: input.id },
      });
    }),

  // Product Variant Management
  getAllVariants: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        productId: z.string().optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, productId, search } = input;
      const skip = (page - 1) * limit;

      const where: Prisma.ProductVariantWhereInput = {
        ...(productId && { productId }),
        ...(search && {
          OR: [
            { product: { name: { contains: search, mode: 'insensitive' } } },
            { color: { name: { contains: search, mode: 'insensitive' } } },
            { size: { name: { contains: search, mode: 'insensitive' } } },
          ],
        }),
      };

      const [variants, total] = await Promise.all([
        prisma.productVariant.findMany({
          where,
          skip,
          take: limit,
          include: {
            product: {
              select: { id: true, name: true, slug: true },
            },
            color: true,
            size: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.productVariant.count({ where }),
      ]);

      return {
        variants: variants.map((variant) => ({
          ...variant,
          price: variant.price ? Number(variant.price) : null,
        })),
        total,
        pages: Math.ceil(total / limit),
      };
    }),

  createVariant: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        colorId: z.string(),
        sizeId: z.string(),
        price: z.number().positive().optional(),
        inStock: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.productVariant.create({
        data: {
          ...input,
          ...(input.price && { price: input.price }),
        },
        include: {
          product: {
            select: { id: true, name: true, slug: true },
          },
          color: true,
          size: true,
        },
      });
    }),

  getVariantById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.productVariant.findUnique({
        where: { id: input.id },
        include: {
          product: {
            select: { id: true, name: true, slug: true },
          },
          color: true,
          size: true,
        },
      });
    }),

  updateVariant: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        colorId: z.string().optional(),
        sizeId: z.string().optional(),
        price: z.number().positive().optional(),
        inStock: z.boolean().optional(),
      })
    )
    .mutation(async ({ input: { id, ...data } }) => {
      return prisma.productVariant.update({
        where: { id },
        data: {
          ...data,
          ...(data.price && { price: data.price }),
        },
        include: {
          product: {
            select: { id: true, name: true, slug: true },
          },
          color: true,
          size: true,
        },
      });
    }),

  deleteVariant: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.productVariant.delete({
        where: { id: input.id },
      });
    }),

  // Category Management
  getAllCategories: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, search } = input;
      const skip = (page - 1) * limit;

      const where: Prisma.CategoryWhereInput = {
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
      };

      const [categories, total] = await Promise.all([
        prisma.category.findMany({
          where,
          skip,
          take: limit,
          include: {
            parent: true,
            subcategories: true,
            _count: {
              select: { products: true, subcategories: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.category.count({ where }),
      ]);

      return {
        categories,
        total,
        pages: Math.ceil(total / limit),
      };
    }),

  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.category.create({
        data: input,
        include: {
          parent: true,
          subcategories: true,
        },
      });
    }),

  getCategoryById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.category.findUnique({
        where: { id: input.id },
        include: {
          parent: true,
          subcategories: true,
        },
      });
    }),

  updateCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        description: z.string().optional(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ input: { id, ...data } }) => {
      return prisma.category.update({
        where: { id },
        data,
        include: {
          parent: true,
          subcategories: true,
        },
      });
    }),

  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.category.delete({
        where: { id: input.id },
      });
    }),

  // Color Management
  getAllColors: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, search } = input;
      const skip = (page - 1) * limit;

      const where: Prisma.ColorWhereInput = {
        ...(search && {
          name: { contains: search, mode: 'insensitive' },
        }),
      };

      const [colors, total] = await Promise.all([
        prisma.color.findMany({
          where,
          skip,
          take: limit,
          include: {
            _count: {
              select: { products: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.color.count({ where }),
      ]);

      return {
        colors,
        total,
        pages: Math.ceil(total / limit),
      };
    }),

  createColor: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        bgColor: z.string().min(1),
        selectedColor: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.color.create({
        data: input,
      });
    }),

  getColorById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.color.findUnique({
        where: { id: input.id },
      });
    }),

  updateColor: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        bgColor: z.string().min(1).optional(),
        selectedColor: z.string().min(1).optional(),
      })
    )
    .mutation(async ({ input: { id, ...data } }) => {
      return prisma.color.update({
        where: { id },
        data,
      });
    }),

  deleteColor: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.color.delete({
        where: { id: input.id },
      });
    }),

  // Size Management
  getAllSizes: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        productId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, productId } = input;
      const skip = (page - 1) * limit;

      const where: Prisma.ProductSizeWhereInput = {
        ...(productId && { productId }),
      };

      const [sizes, total] = await Promise.all([
        prisma.productSize.findMany({
          where,
          skip,
          take: limit,
          include: {
            product: {
              select: { id: true, name: true, slug: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.productSize.count({ where }),
      ]);

      return {
        sizes: sizes.map((size) => ({
          ...size,
          price: size.price ? Number(size.price) : null,
        })),
        total,
        pages: Math.ceil(total / limit),
      };
    }),

  createSize: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        name: z.string().min(1),
        price: z.number().positive().optional(),
        inStock: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.productSize.create({
        data: {
          ...input,
          ...(input.price && { price: input.price }),
        },
        include: {
          product: {
            select: { id: true, name: true, slug: true },
          },
        },
      });
    }),

  getSizeById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.productSize.findUnique({
        where: { id: input.id },
        include: {
          product: {
            select: { id: true, name: true, slug: true },
          },
        },
      });
    }),

  updateSize: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        price: z.number().positive().optional(),
        inStock: z.boolean().optional(),
      })
    )
    .mutation(async ({ input: { id, ...data } }) => {
      return prisma.productSize.update({
        where: { id },
        data: {
          ...data,
          ...(data.price && { price: data.price }),
        },
        include: {
          product: {
            select: { id: true, name: true, slug: true },
          },
        },
      });
    }),

  deleteSize: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.productSize.delete({
        where: { id: input.id },
      });
    }),

  // Gender Management
  getAllGenders: protectedProcedure.query(async () => {
    return prisma.gender.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }),

  createGender: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.gender.create({
        data: input,
      });
    }),

  updateGender: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
      })
    )
    .mutation(async ({ input: { id, ...data } }) => {
      return prisma.gender.update({
        where: { id },
        data,
      });
    }),

  deleteGender: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.gender.delete({
        where: { id: input.id },
      });
    }),

  // Order Management
  getAllOrders: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        status: z
          .enum(['PENDING', 'CONFIRMED', 'CANCELED', 'IN_PROCESS', 'DELIVERED'])
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, status } = input;
      const skip = (page - 1) * limit;

      const where: Prisma.OrderWhereInput = {
        ...(status && { status }),
      };

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where,
          skip,
          take: limit,
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
            payment: true,
            products: {
              include: {
                images: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.order.count({ where }),
      ]);

      return {
        orders: orders.map((order) => ({
          ...order,
          total: Number(order.total),
        })),
        total,
        pages: Math.ceil(total / limit),
      };
    }),

  updateOrderStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum([
          'PENDING',
          'CONFIRMED',
          'CANCELED',
          'IN_PROCESS',
          'DELIVERED',
        ]),
      })
    )
    .mutation(async ({ input: { id, status } }) => {
      return prisma.order.update({
        where: { id },
        data: { status },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          payment: true,
          products: {
            include: {
              images: true,
            },
          },
        },
      });
    }),

  // User Management
  getAllUsers: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, search } = input;
      const skip = (page - 1) * limit;

      const where: Prisma.UserWhereInput = {
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { username: { contains: search, mode: 'insensitive' } },
          ],
        }),
      };

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: { orders: true, reviews: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.user.count({ where }),
      ]);

      return {
        users,
        total,
        pages: Math.ceil(total / limit),
      };
    }),

  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { orders: true, reviews: true },
          },
        },
      });
    }),

  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        username: z.string().min(1).optional(),
        email: z.string().email().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input: { id, ...data } }) => {
      return prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { orders: true, reviews: true },
          },
        },
      });
    }),

  updateUserStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isActive: z.boolean(),
      })
    )
    .mutation(async ({ input: { id, isActive } }) => {
      return prisma.user.update({
        where: { id },
        data: { isActive },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }),
});

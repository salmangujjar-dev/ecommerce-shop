import { z } from 'zod';

import prisma from '@lib/prisma';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@lib/trpc';

export const orderRouter = createTRPCRouter({
  // Create order for authenticated users (from provided cart items)
  createOrder: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            productId: z.string().optional(),
            variantId: z.string().optional(),
            quantity: z.number().min(1),
          })
        ),
        shippingAddress: z.object({
          firstName: z.string(),
          lastName: z.string().optional(),
          address: z.string(),
          apartment: z.string().optional(),
          city: z.string(),
          country: z.string(),
          region: z.string(),
          postalCode: z.string().optional(),
        }),
        paymentInfo: z.object({
          paymentType: z.enum(['card', 'cod']),
          cardNumber: z.string().optional(),
          nameOnCard: z.string().optional(),
          expirationDate: z.string().optional(),
          cvc: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      if (!input.items.length) {
        throw new Error('Cart is empty');
      }

      // Prepare order items with price lookup
      const orderItems = await Promise.all(
        input.items.map(async (item) => {
          let price = 0;
          if (item.variantId) {
            const variant = await prisma.productVariant.findUnique({
              where: { id: item.variantId },
            });
            price = variant?.price ? Number(variant.price) : 0;
          } else if (item.productId) {
            const product = await prisma.product.findUnique({
              where: { id: item.productId },
            });
            price = product?.price ? Number(product.price) : 0;
          }
          return {
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price,
          };
        })
      );

      // Calculate total
      const total = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Create order and order items
      const order = await prisma.order.create({
        data: {
          userId,
          total,
          status: 'PENDING',
          shippingAddress: {
            shippingAddress: input.shippingAddress,
            paymentInfo: input.paymentInfo,
          },
          items: {
            create: orderItems,
          },
        },
        include: { items: true },
      });

      // Clear user's cart after successful order
      const cart = await prisma.cart.findUnique({
        where: { userId },
      });
      if (cart) {
        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      }

      return order;
    }),

  // Create order for guest users (from provided cart items)
  createGuestOrder: publicProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            productId: z.string().optional(),
            variantId: z.string().optional(),
            quantity: z.number().min(1),
          })
        ),
        guestInfo: z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
        }),
        shippingAddress: z.object({
          firstName: z.string(),
          lastName: z.string().optional(),
          address: z.string(),
          apartment: z.string().optional(),
          city: z.string(),
          country: z.string(),
          region: z.string(),
          postalCode: z.string().optional(),
        }),
        paymentInfo: z.object({
          paymentType: z.enum(['card', 'cod']),
          cardNumber: z.string().optional(),
          nameOnCard: z.string().optional(),
          expirationDate: z.string().optional(),
          cvc: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      if (!input.items.length) {
        throw new Error('Cart is empty');
      }

      // Prepare order items with price lookup
      const orderItems = await Promise.all(
        input.items.map(async (item) => {
          let price = 0;
          if (item.variantId) {
            const variant = await prisma.productVariant.findUnique({
              where: { id: item.variantId },
            });
            price = variant?.price ? Number(variant.price) : 0;
          } else if (item.productId) {
            const product = await prisma.product.findUnique({
              where: { id: item.productId },
            });
            price = product?.price ? Number(product.price) : 0;
          }
          return {
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price,
          };
        })
      );

      // Calculate total
      const total = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Create order and order items (without userId for guest)
      const order = await prisma.order.create({
        data: {
          total,
          status: 'PENDING',
          description: `Guest order for ${input.guestInfo.name} (${input.guestInfo.email})`,
          shippingAddress: {
            guestInfo: input.guestInfo,
            shippingAddress: input.shippingAddress,
            paymentInfo: input.paymentInfo,
          },
          items: {
            create: orderItems,
          },
        },
        include: { items: true },
      });

      return order;
    }),

  getMyOrders: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      },
    });

    // Fetch product and variant information for all order items
    const ordersWithProductInfo = await Promise.all(
      orders.map(async (order) => {
        const itemsWithProductInfo = await Promise.all(
          order.items.map(async (item) => {
            let productInfo = null;
            let variantInfo = null;

            if (item.variantId) {
              const variant = await prisma.productVariant.findUnique({
                where: { id: item.variantId },
                include: {
                  product: {
                    select: {
                      id: true,
                      name: true,
                      slug: true,
                      images: true,
                    },
                  },
                  color: true,
                  size: true,
                },
              });
              if (variant) {
                variantInfo = variant;
                productInfo = variant.product;
              }
            } else if (item.productId) {
              const product = await prisma.product.findUnique({
                where: { id: item.productId },
                select: { id: true, name: true, slug: true, images: true },
              });
              if (product) {
                productInfo = product;
              }
            }

            return {
              ...item,
              product: productInfo,
              variant: variantInfo,
            };
          })
        );

        return {
          ...order,
          items: itemsWithProductInfo,
          total: Number(order.total),
        };
      })
    );

    return {
      orders: ordersWithProductInfo,
    };
  }),

  getMyOrderById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const order = await prisma.order.findUnique({
        where: { id: input.id, userId },
        include: { items: true },
      });
      if (!order) return null;
      // Fetch product and variant information for order items
      const itemsWithProductInfo = await Promise.all(
        order.items.map(async (item) => {
          let productInfo = null;
          let variantInfo = null;
          if (item.variantId) {
            const variant = await prisma.productVariant.findUnique({
              where: { id: item.variantId },
              include: {
                product: {
                  select: { id: true, name: true, slug: true, images: true },
                },
                color: true,
                size: true,
              },
            });
            if (variant) {
              variantInfo = variant;
              productInfo = variant.product;
            }
          } else if (item.productId) {
            const product = await prisma.product.findUnique({
              where: { id: item.productId },
              select: { id: true, name: true, slug: true, images: true },
            });
            if (product) {
              productInfo = product;
            }
          }
          return {
            ...item,
            product: productInfo,
            variant: variantInfo,
          };
        })
      );
      return {
        ...order,
        items: itemsWithProductInfo,
        total: Number(order.total),
        shippingAddress: order.shippingAddress,
      };
    }),
});

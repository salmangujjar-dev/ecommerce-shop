import { z } from 'zod';

import prisma from '@lib/prisma';
import { createTRPCRouter, protectedProcedure } from '@lib/trpc';

export const cartRouter = createTRPCRouter({
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    return cart;
  }),

  addOrUpdateItem: protectedProcedure
    .input(
      z.object({
        productId: z.string().optional(),
        variantId: z.string().optional(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      let cart = await prisma.cart.findUnique({ where: { userId } });
      if (!cart) {
        cart = await prisma.cart.create({ data: { userId } });
      }
      const where = {
        cartId: cart.id,
        productId: input.productId ?? undefined,
        variantId: input.variantId ?? undefined,
      };
      // Only one of productId or variantId will be set
      let item = await prisma.cartItem.findFirst({ where });
      if (item) {
        item = await prisma.cartItem.update({
          where: { id: item.id },
          data: { quantity: input.quantity },
        });
      } else {
        item = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: input.productId,
            variantId: input.variantId,
            quantity: input.quantity,
          },
        });
      }
      return item;
    }),

  removeItem: protectedProcedure
    .input(
      z.object({
        productId: z.string().optional(),
        variantId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const cart = await prisma.cart.findUnique({ where: { userId } });
      if (!cart) return null;
      const where = {
        cartId: cart.id,
        productId: input.productId ?? undefined,
        variantId: input.variantId ?? undefined,
      };
      const item = await prisma.cartItem.findFirst({ where });
      if (!item) return null;
      await prisma.cartItem.delete({ where: { id: item.id } });
      return true;
    }),

  mergeCart: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            productId: z.string().optional(),
            variantId: z.string().optional(),
            quantity: z.number().min(1),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      let cart = await prisma.cart.findUnique({ where: { userId } });
      if (!cart) {
        cart = await prisma.cart.create({ data: { userId } });
      }
      // Remove all existing items
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      // Add new items
      const created = await prisma.cartItem.createMany({
        data: input.items.map((item) => ({
          cartId: cart.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      });
      return created;
    }),
});

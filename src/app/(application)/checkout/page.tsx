'use client';

import { useRouter } from 'next/navigation';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@ui/button';
import Spinner from '@ui/Spinner';

import useCartStore from '@store/cart';

import { useSession } from '@lib/session/provider';

import { trpc } from '~trpc/client';

import CheckoutForm from './form';
import CheckoutSummary from './summary';
import { checkoutSchema } from './validation';

const CheckoutPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useSession();
  const cartStore = useCartStore();

  const formMethods = useForm<z.infer<typeof checkoutSchema>>({
    defaultValues: {
      paymentType: 'card',
    },
    resolver: zodResolver(checkoutSchema),
  });

  // TRPC mutations for order creation
  const createOrder = trpc.orders.createOrder.useMutation();
  const createGuestOrder = trpc.orders.createGuestOrder.useMutation();

  const handleSubmit = useCallback(
    async (data: z.infer<typeof checkoutSchema>) => {
      try {
        if (cartStore.items.length === 0) {
          toast.error('Your cart is empty');
          return;
        }

        if (isAuthenticated) {
          // Create order for authenticated user
          const shippingAddress = {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            apartment: data.apartment,
            city: data.city,
            country: data.country,
            region: data.region,
            postalCode: data.postalCode,
          };

          const paymentInfo = {
            paymentType: data.paymentType,
            cardNumber: data.cardNumber,
            nameOnCard: data.nameOnCard,
            expirationDate: data.expirationDate,
            cvc: data.cvc,
          };

          const order = await createOrder.mutateAsync({
            items: cartStore.items,
            shippingAddress,
            paymentInfo,
          });
          toast.success('Order placed successfully!');

          // Clear cart after successful order
          cartStore.clearCart();

          // Redirect to success page with order ID
          router.push(`/order-success?orderId=${order.id}`);
        } else {
          // Create order for guest user
          const guestInfo = {
            name: `${data.firstName} ${data.lastName || ''}`.trim(),
            email: data.email,
            phone: data.phone,
          };

          const shippingAddress = {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            apartment: data.apartment,
            city: data.city,
            country: data.country,
            region: data.region,
            postalCode: data.postalCode,
          };

          const paymentInfo = {
            paymentType: data.paymentType,
            cardNumber: data.cardNumber,
            nameOnCard: data.nameOnCard,
            expirationDate: data.expirationDate,
            cvc: data.cvc,
          };

          const order = await createGuestOrder.mutateAsync({
            items: cartStore.items,
            guestInfo,
            shippingAddress,
            paymentInfo,
          });
          toast.success('Order placed successfully!');

          // Clear cart after successful order
          cartStore.clearCart();

          // Redirect to success page with order ID
          router.push(`/order-success?orderId=${order.id}`);
        }
      } catch (error) {
        console.error('Order creation failed:', error);
        toast.error(
          error instanceof Error ? error.message : 'Failed to place order'
        );
      }
    },
    [cartStore, isAuthenticated, createOrder, createGuestOrder, router]
  );

  const updateItem = useCallback(
    (item: { variantId?: string; productId?: string }, quantity: number) => {
      cartStore.updateQuantity(item, quantity);
      toast.success('Item quantity updated Successfully.');
    },
    [cartStore]
  );

  const removeItem = useCallback(
    (item: { variantId?: string; productId?: string }) => {
      cartStore.removeItem(item);
      toast.success('Item removed Successfully.');
    },
    [cartStore]
  );

  if (!cartStore._hasHydrated) {
    return (
      <div className='flex justify-center items-center h-52'>
        <Spinner />
      </div>
    );
  }

  if (cartStore._hasHydrated && cartStore.items.length === 0) {
    return (
      <div className='flex justify-center gap-y-2 flex-col items-center h-52'>
        <h1 className='text-2xl font-bold'>No items in cart</h1>
        <Button href='/shop'>Shop Now</Button>
      </div>
    );
  }

  return (
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Checkout</h2>
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'
          >
            <CheckoutForm />

            {/* Order summary */}
            <CheckoutSummary
              items={cartStore.items}
              updateItem={updateItem}
              removeItem={removeItem}
              isSubmitting={createOrder.isPending || createGuestOrder.isPending}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CheckoutPage;

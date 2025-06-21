'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@ui/button';
import Spinner from '@ui/Spinner';

import useCartStore from '@store/cart';

import CheckoutForm from './form';
import CheckoutSummary from './summary';
import { checkoutSchema } from './validation';

const CheckoutPage = () => {
  const formMethods = useForm<z.infer<typeof checkoutSchema>>({
    defaultValues: {
      paymentType: 'card',
    },
    resolver: zodResolver(checkoutSchema),
  });

  const cartStore = useCartStore();

  const _handleSubmit = useCallback((data: unknown) => {
    console.log(data);
  }, []);

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
            onSubmit={formMethods.handleSubmit(_handleSubmit)}
            className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'
          >
            <CheckoutForm />

            {/* Order summary */}
            <CheckoutSummary
              items={cartStore.items}
              updateItem={updateItem}
              removeItem={removeItem}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CheckoutPage;

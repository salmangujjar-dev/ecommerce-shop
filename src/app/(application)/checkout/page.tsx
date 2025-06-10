'use client';

import { useCallback } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useCartStore from '@store/cart';

import CheckoutForm from './form';
import CheckoutSummary from './summary';

const CheckoutPage = () => {
  const formMethods = useForm();

  const cartStore = useCartStore();

  const updateItem = useCallback(
    (id: string, quantity: number) => {
      cartStore.updateQuantity(id, quantity);
      toast.success('Item quantity updated Successfully.');
    },
    [cartStore]
  );

  const removeItem = useCallback(
    (id: string) => {
      cartStore.removeItem(id);
      toast.success('Item removed Successfully.');
    },
    [cartStore]
  );

  return (
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Checkout</h2>
        <FormProvider {...formMethods}>
          <form className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'>
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

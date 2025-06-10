'use client';

import dynamic from 'next/dynamic';

import { useMemo } from 'react';

import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@ui/button';
import { Input } from '@ui/input';

import useCartStore from '@store/cart';

import { productRouter } from '~trpc/router/product';

import { cn } from '@utils/cn';
type AddToCartBtnProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  'children'
> & {
  product: Pick<
    NonNullable<
      Awaited<ReturnType<typeof productRouter.getByFilter>>['products'][0]
    >,
    'id' | 'name'
  >;
};

const AddToCartBtn = ({ product, className, ...props }: AddToCartBtnProps) => {
  const cartStore = useCartStore();

  const isItemAlreadyInCart = useMemo(
    () => cartStore.items.find((item) => item.id === product.id),
    [cartStore.items, product.id]
  );

  return (
    <>
      {isItemAlreadyInCart ? (
        <div className={cn('flex gap-x-4 items-center', className)}>
          <Button
            className='items-center justify-center w-15'
            onClick={() => {
              if (isItemAlreadyInCart.quantity - 1 === 0) {
                cartStore.removeItem(product.id);
                toast.success('Item Removed Successfully');
                return;
              }
              cartStore.updateQuantity(
                product.id,
                isItemAlreadyInCart.quantity - 1
              );
              toast.success('Item Quantity Updated Successfully');
            }}
          >
            <Minus />
          </Button>
          <Input
            type='number'
            classNames={{ input: 'text-center' }}
            value={isItemAlreadyInCart.quantity}
            readOnly
          />
          <Button
            className='items-center justify-center w-15'
            onClick={() => {
              cartStore.updateQuantity(
                product.id,
                isItemAlreadyInCart.quantity + 1
              );
              toast.success('Item Quantity Updated Successfully');
            }}
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <Button
          className={cn('w-full bg-transparent', className)}
          onClick={() => {
            cartStore.addItem(product.id);
            toast.success('Added to Cart Successfully');
          }}
          {...(props as typeof Button)}
        >
          Add to cart<span className='sr-only'>, {product.name}</span>
        </Button>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(AddToCartBtn), { ssr: false });

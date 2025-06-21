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
  selectedVariantId?: string;
};

const AddToCartBtn = ({
  product,
  selectedVariantId,
  className,
  ...props
}: AddToCartBtnProps) => {
  const cartStore = useCartStore();

  const isItemAlreadyInCart = useMemo(() => {
    if (selectedVariantId) {
      return cartStore.items.find(
        (item) => item.variantId === selectedVariantId
      );
    }
    return cartStore.items.find((item) => item.productId === product.id);
  }, [cartStore.items, selectedVariantId, product.id]);

  const handleAddToCart = () => {
    if (selectedVariantId) {
      cartStore.addItem({ variantId: selectedVariantId });
    } else {
      cartStore.addItem({ productId: product.id });
    }
    toast.success('Added to Cart Successfully');
  };

  const handleRemoveFromCart = () => {
    if (selectedVariantId) {
      cartStore.removeItem({ variantId: selectedVariantId });
    } else {
      cartStore.removeItem({ productId: product.id });
    }
    toast.success('Item Removed Successfully');
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (selectedVariantId) {
      cartStore.updateQuantity({ variantId: selectedVariantId }, newQuantity);
    } else {
      cartStore.updateQuantity({ productId: product.id }, newQuantity);
    }
    toast.success('Item Quantity Updated Successfully');
  };

  return (
    <>
      {isItemAlreadyInCart ? (
        <div className={cn('flex gap-x-4 items-center', className)}>
          <Button
            className='items-center justify-center w-15'
            onClick={() => {
              if (isItemAlreadyInCart.quantity - 1 === 0) {
                handleRemoveFromCart();
                return;
              }
              handleUpdateQuantity(isItemAlreadyInCart.quantity - 1);
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
              handleUpdateQuantity(isItemAlreadyInCart.quantity + 1);
            }}
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <Button
          className={cn('w-full bg-transparent', className)}
          onClick={handleAddToCart}
          {...(props as typeof Button)}
        >
          Add to cart<span className='sr-only'>, {product.name}</span>
        </Button>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(AddToCartBtn), { ssr: false });

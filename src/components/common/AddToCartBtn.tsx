'use client';

import { Button } from '@ui/button';

import { productRouter } from '~trpc/router/product';

const AddToCartBtn = ({
  product,
}: {
  product: NonNullable<
    Awaited<ReturnType<typeof productRouter.getByFilter>>['products'][0]
  >;
}) => {
  // const { mutate } = trpc.cart.addToCart.useMutation();
  return (
    <Button
      color='white'
      className='w-full bg-transparent'
      // onClick={async () => {
      //   await mutate({ productId: product.id });
      // }}
    >
      Add to cart<span className='sr-only'>, {product.name}</span>
    </Button>
  );
};

export default AddToCartBtn;

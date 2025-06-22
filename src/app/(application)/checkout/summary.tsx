'use client';

import Image from 'next/image';

import { memo, useMemo } from 'react';

import { ChevronDownIcon, TrashIcon } from 'lucide-react';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import { CartItem } from '@store/cart';

import { trpc } from '~trpc/client';

import CommonUtils from '@utils/common';

interface CheckoutSummaryProps {
  items: CartItem[];
  updateItem: (
    item: { variantId?: string; productId?: string },
    quantity: number
  ) => void;
  removeItem: (item: { variantId?: string; productId?: string }) => void;
  isSubmitting?: boolean;
}

type Variant = {
  id: string;
  price: number | null;
  product: {
    id: string;
    name: string;
    images: { src: string; alt: string }[];
  };
  color: { id: string; name: string };
  size: { id: string; name: string };
};

type Product = {
  id: string;
  name: string;
  price: number;
  images: { src: string; alt: string }[];
};

const CheckoutSummary = ({
  items,
  updateItem,
  removeItem,
  isSubmitting = false,
}: CheckoutSummaryProps) => {
  // Get variant IDs and product IDs from cart items
  const variantIds = items
    .filter((item) => item.variantId)
    .map((item) => item.variantId!);
  const productIds = items
    .filter((item) => item.productId)
    .map((item) => item.productId!);

  // Fetch variants and products
  const { data: variants } = trpc.products.getVariantsByIds.useQuery(
    {
      ids: variantIds,
    },
    { enabled: variantIds.length > 0 }
  );

  const { data: products } = trpc.products.getByIds.useQuery(
    {
      ids: productIds,
    },
    { enabled: productIds.length > 0 }
  );

  const [subTotal, total] = useMemo(() => {
    let total = 0;

    // Calculate total for variants
    if (variants) {
      variants.forEach((variant: Variant) => {
        const cartItem = items.find((item) => item.variantId === variant.id);
        if (cartItem) {
          const price = variant.price != null ? Number(variant.price) : 0;
          total += price * cartItem.quantity;
        }
      });
    }

    // Calculate total for products without variants
    if (products) {
      products.forEach((product: Product) => {
        const cartItem = items.find((item) => item.productId === product.id);
        if (cartItem) {
          total += Number(product.price) * cartItem.quantity;
        }
      });
    }

    return [total, total];
  }, [items, variants, products]);

  const renderVariantItem = (variant: Variant) => {
    const cartItem = items.find((item) => item.variantId === variant.id);
    if (!cartItem) return null;

    return (
      <li key={variant.id} className='flex px-4 py-6 sm:px-6'>
        <div className='shrink-0'>
          <Image
            width={0}
            height={0}
            sizes='100vw'
            alt={variant.product.images[0]?.alt}
            src={variant.product.images[0]?.src}
            className='w-20 rounded-md'
          />
        </div>
        <div className='ml-6 flex flex-1 flex-col'>
          <div className='flex'>
            <div className='min-w-0 flex-1'>
              <h4 className='text-sm'>
                <Link
                  href={`/product/${variant.product.id}`}
                  className='font-medium text-gray-700 hover:text-gray-800'
                >
                  {variant.product.name}
                </Link>
              </h4>
              <p className='mt-1 text-sm text-gray-500'>{variant.color.name}</p>
              <p className='mt-1 text-sm text-gray-500'>{variant.size.name}</p>
            </div>
            <div className='ml-4 flow-root shrink-0'>
              <Button
                color='transparent'
                className='-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500'
                onClick={() => removeItem({ variantId: variant.id })}
              >
                <span className='sr-only'>Remove</span>
                <TrashIcon aria-hidden='true' className='size-5' />
              </Button>
            </div>
          </div>
          <div className='flex flex-1 items-end justify-between pt-2'>
            <p className='mt-1 text-sm font-medium text-gray-900'>
              {CommonUtils.asCurrency({
                amount: variant.price != null ? Number(variant.price) : 0,
              })}
            </p>
            <div className='ml-4'>
              <div className='grid grid-cols-1'>
                <select
                  id='quantity'
                  name='quantity'
                  aria-label='Quantity'
                  className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  defaultValue={cartItem.quantity}
                  onChange={(e) => {
                    updateItem(
                      { variantId: variant.id },
                      Number(e.target.value)
                    );
                  }}
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(
                    (item) => (
                      <option
                        key={`checkout-summary-${variant.id}-quantity-${item}`}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
                <ChevronDownIcon
                  aria-hidden='true'
                  className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4'
                />
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  const renderProductItem = (product: Product) => {
    const cartItem = items.find((item) => item.productId === product.id);
    if (!cartItem) return null;

    return (
      <li key={product.id} className='flex px-4 py-6 sm:px-6'>
        <div className='shrink-0'>
          <Image
            width={0}
            height={0}
            sizes='100vw'
            alt={product.images[0]?.alt}
            src={product.images[0]?.src}
            className='w-20 rounded-md'
          />
        </div>
        <div className='ml-6 flex flex-1 flex-col'>
          <div className='flex'>
            <div className='min-w-0 flex-1'>
              <h4 className='text-sm'>
                <Link
                  href={`/product/${product.id}`}
                  className='font-medium text-gray-700 hover:text-gray-800'
                >
                  {product.name}
                </Link>
              </h4>
            </div>
            <div className='ml-4 flow-root shrink-0'>
              <Button
                color='transparent'
                className='-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500'
                onClick={() => removeItem({ productId: product.id })}
              >
                <span className='sr-only'>Remove</span>
                <TrashIcon aria-hidden='true' className='size-5' />
              </Button>
            </div>
          </div>
          <div className='flex flex-1 items-end justify-between pt-2'>
            <p className='mt-1 text-sm font-medium text-gray-900'>
              {CommonUtils.asCurrency({
                amount: Number(product.price),
              })}
            </p>
            <div className='ml-4'>
              <div className='grid grid-cols-1'>
                <select
                  id='quantity'
                  name='quantity'
                  aria-label='Quantity'
                  className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  defaultValue={cartItem.quantity}
                  onChange={(e) => {
                    updateItem(
                      { productId: product.id },
                      Number(e.target.value)
                    );
                  }}
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(
                    (item) => (
                      <option
                        key={`checkout-summary-${product.id}-quantity-${item}`}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
                <ChevronDownIcon
                  aria-hidden='true'
                  className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4'
                />
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className='mt-10 lg:mt-0'>
      <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>

      <div className='mt-4 rounded-lg border border-gray-200 bg-white shadow-xs'>
        <h3 className='sr-only'>Items in your cart</h3>
        <ul role='list' className='divide-y divide-gray-200'>
          {/* Render variant items */}
          {variants?.map(renderVariantItem)}
          {/* Render product items */}
          {products?.map(renderProductItem)}
        </ul>
        <dl className='space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6'>
          <div className='flex items-center justify-between'>
            <dt className='text-sm'>Subtotal</dt>
            <dd className='text-sm font-medium text-gray-900'>
              {CommonUtils.asCurrency({ amount: subTotal })}
            </dd>
          </div>
          {/* <div className='flex items-center justify-between'>
            <dt className='text-sm'>Shipping</dt>
            <dd className='text-sm font-medium text-gray-900'>$5.00</dd>
          </div>
          <div className='flex items-center justify-between'>
            <dt className='text-sm'>Taxes</dt>
            <dd className='text-sm font-medium text-gray-900'>$5.52</dd>
          </div> */}
          <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
            <dt className='text-base font-medium'>Total</dt>
            <dd className='text-base font-medium text-gray-900'>
              {CommonUtils.asCurrency({ amount: total })}
            </dd>
          </div>
        </dl>

        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
          <Button
            type='submit'
            disabled={items.length === 0 || isSubmitting}
            className='w-full text-4xl'
          >
            {isSubmitting ? 'Processing...' : 'Confirm order'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(CheckoutSummary);

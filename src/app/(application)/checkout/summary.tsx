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
  updateItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CheckoutSummary = ({
  items,
  updateItem,
  removeItem,
}: CheckoutSummaryProps) => {
  const { data: variants } = trpc.products.getVariantsByIds.useQuery({
    ids: items.map((item) => item.variantId),
  });

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

  const [subTotal, total] = useMemo(() => {
    if (!variants) {
      return [0, 0];
    }
    let idx = 0;
    const subTotal = items.reduce((prev, val) => {
      const variant = variants[idx++] as Variant;
      const price = variant?.price != null ? Number(variant.price) : 0;
      return prev + price * val.quantity;
    }, 0);
    return [subTotal, subTotal];
  }, [items, variants]);

  return (
    <div className='mt-10 lg:mt-0'>
      <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>

      <div className='mt-4 rounded-lg border border-gray-200 bg-white shadow-xs'>
        <h3 className='sr-only'>Items in your cart</h3>
        <ul role='list' className='divide-y divide-gray-200'>
          {variants?.map((variant: Variant, idx: number) => (
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
                        href={variant.product.id}
                        className='font-medium text-gray-700 hover:text-gray-800'
                      >
                        {variant.product.name}
                      </Link>
                    </h4>
                    <p className='mt-1 text-sm text-gray-500'>
                      {variant.color.name}
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>
                      {variant.size.name}
                    </p>
                  </div>
                  <div className='ml-4 flow-root shrink-0'>
                    <Button
                      color='transparent'
                      className='-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500'
                      onClick={() => removeItem(variant.id)}
                    >
                      <span className='sr-only'>Remove</span>
                      <TrashIcon aria-hidden='true' className='size-5' />
                    </Button>
                  </div>
                </div>
                <div className='flex flex-1 items-end justify-between pt-2'>
                  <p className='mt-1 text-sm font-medium text-gray-900'>
                    {CommonUtils.asCurrency({
                      amount:
                        variant?.price != null ? Number(variant.price) : 0,
                    })}
                  </p>
                  <div className='ml-4'>
                    <div className='grid grid-cols-1'>
                      <select
                        id='quantity'
                        name='quantity'
                        aria-label='Quantity'
                        className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                        defaultValue={items[idx].quantity}
                        onChange={(e) => {
                          updateItem(variant.id, Number(e.target.value));
                        }}
                      >
                        {Array.from(
                          { length: 10 },
                          (_, index) => index + 1
                        ).map((item) => (
                          <option
                            key={`checkout-summary-${variant.id}-quantity-${item}`}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
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
          ))}
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
            disabled={items.length === 0}
            className='w-full text-4xl'
          >
            Confirm order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(CheckoutSummary);

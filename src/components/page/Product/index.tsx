'use client';

import Image from 'next/image';

import { useState } from 'react';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { DollarSign, Globe } from 'lucide-react';

import Breadcrumb from '@ui/breadcrumb';
import { Link } from '@ui/link';

import AddToCartBtn from '@common/AddToCartBtn';
import Rating from '@common/Rating';

import { productRouter } from '~trpc/router/product';

import { cn } from '@utils/cn';
import CommonUtils from '@utils/common';

import { FacebookIcon, InstagramIcon, XIcon } from '@assets/svgs';

const policies = [
  {
    name: 'International delivery',
    icon: Globe,
    description: 'Get your order in 2 years',
  },
  {
    name: 'Loyalty rewards',
    icon: DollarSign,
    description: "Don't look at other tees",
  },
];

interface ProductProps {
  product: NonNullable<Awaited<ReturnType<typeof productRouter.getById>>>;
}

// Helper to get all sizes with availability info
function getAllSizesWithAvailability(
  product: ProductProps['product'],
  variants: ProductProps['product']['variants'],
  selectedColorId: string
) {
  return product.sizes.map((size) => {
    const isAvailable = variants.some(
      (v) => v.colorId === selectedColorId && v.sizeId === size.id && v.inStock
    );
    return { ...size, isAvailable };
  });
}

// Helper to get all colors with availability info
function getAllColorsWithAvailability(
  product: ProductProps['product'],
  variants: ProductProps['product']['variants'],
  selectedSizeId: string
) {
  return product.colors.map((c) => {
    const color = c.color;
    const isAvailable = variants.some(
      (v) => v.sizeId === selectedSizeId && v.colorId === color.id && v.inStock
    );
    return { ...color, isAvailable };
  });
}

const Product = ({ product }: ProductProps) => {
  const variants = product.variants || [];
  // Find min/max price from variants
  const prices = variants
    .filter((v) => v.inStock && v.price != null)
    .map((v) => Number(v.price));
  const minPrice = prices.length ? Math.min(...prices) : Number(product.price);
  const maxPrice = prices.length ? Math.max(...prices) : Number(product.price);

  // Find first available variant to get default selections
  const firstAvailableVariant = variants.find((v) => v.inStock);

  // Default selections - ensure they are available
  const [selectedColor, setSelectedColor] = useState(() => {
    if (firstAvailableVariant) {
      const availableColor = product.colors.find(
        (c) => c.color.id === firstAvailableVariant.colorId
      );
      return availableColor?.color || product.colors[0]?.color || null;
    }
    return product.colors[0]?.color || null;
  });

  const [selectedSize, setSelectedSize] = useState(() => {
    if (firstAvailableVariant) {
      const availableSize = product.sizes.find(
        (s) => s.id === firstAvailableVariant.sizeId
      );
      return availableSize || product.sizes[0] || null;
    }
    return product.sizes[0] || null;
  });

  // Find the selected variant
  const selectedVariant = variants.find(
    (v) =>
      v.colorId === selectedColor?.id &&
      v.sizeId === selectedSize?.id &&
      v.inStock
  );

  // Get all sizes and colors with availability info for display
  const allSizesWithAvailability = selectedColor
    ? getAllSizesWithAvailability(product, variants, selectedColor.id)
    : [];
  const allColorsWithAvailability = selectedSize
    ? getAllColorsWithAvailability(product, variants, selectedSize.id)
    : [];

  const displayPrice =
    selectedVariant?.price != null ? selectedVariant.price : product.price;

  return (
    <div className='bg-white'>
      <div className='pt-6'>
        <Breadcrumb
          preHref='/shop/'
          breadcrumbs={[
            { name: product.gender.name, href: product.gender.slug },
            { name: product.category.name, href: product.category.slug },
          ]}
          selectedBreadcrumb={{
            name: product.name,
            href: `product/${product.id}`,
          }}
        />
        <div className='mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
            <div className='lg:col-span-5 lg:col-start-8'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-medium text-gray-900'>
                  {product.name}
                </h1>
                <p className='text-xl font-bold text-indigo-600'>
                  {CommonUtils.asCurrency({ amount: Number(displayPrice) })}
                </p>
              </div>
              {/* Reviews */}
              <div className='mt-4'>
                <h2 className='sr-only'>Reviews</h2>
                <div className='flex items-center'>
                  <p className='text-sm text-gray-700'>
                    {product.rating.toFixed(1)}
                    <span className='sr-only'> out of 5 stars</span>
                  </p>
                  <div
                    aria-hidden='true'
                    className='mx-2 text-sm text-gray-300'
                  >
                    ·
                  </div>
                  <Rating
                    rating={product.rating}
                    isCssInteractive
                    isModalInteractive
                  />
                  {product.reviews.length > 0 && (
                    <>
                      <div
                        aria-hidden='true'
                        className='ml-2 text-sm text-gray-300'
                      >
                        ·
                      </div>
                      <div className='ml-2 flex'>
                        <Link
                          href='#reviews'
                          className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                        >
                          See all {product.reviews.length} reviews
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <p className='mt-4 text-base font-medium text-gray-900'>
                {minPrice === maxPrice
                  ? CommonUtils.asCurrency({ amount: minPrice })
                  : `${CommonUtils.asCurrency({
                      amount: minPrice,
                    })} - ${CommonUtils.asCurrency({ amount: maxPrice })}`}
              </p>
              {/* Sizes */}
              {allSizesWithAvailability.length > 0 && (
                <div className='mt-2 flex flex-wrap gap-2'>
                  {allSizesWithAvailability.map((size) => (
                    <button
                      key={size.id}
                      className={cn(
                        'px-2 py-1 rounded border text-xs flex-1 size-10',
                        size.isAvailable
                          ? 'cursor-pointer'
                          : 'cursor-not-allowed opacity-50',
                        selectedSize?.id === size.id && size.isAvailable
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : size.isAvailable
                          ? 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 border-gray-300'
                      )}
                      onClick={() => size.isAvailable && setSelectedSize(size)}
                      type='button'
                      disabled={!size.isAvailable}
                      title={!size.isAvailable ? 'Out of stock' : undefined}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              )}
              {/* Colors */}
              {allColorsWithAvailability.length > 0 && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {allColorsWithAvailability.map((color) => (
                    <button
                      key={color.id}
                      className={cn(
                        'w-6 h-6 rounded-full border-2 size-12',
                        color.isAvailable
                          ? 'cursor-pointer'
                          : 'cursor-not-allowed opacity-50',
                        selectedColor?.id === color.id && color.isAvailable
                          ? 'border-indigo-600'
                          : color.isAvailable
                          ? 'border-gray-200 hover:border-gray-300'
                          : 'border-gray-300'
                      )}
                      style={{ backgroundColor: color.bgColor }}
                      onClick={() =>
                        color.isAvailable && setSelectedColor(color)
                      }
                      type='button'
                      disabled={!color.isAvailable}
                      aria-label={`${color.name}${
                        !color.isAvailable ? ' (Out of stock)' : ''
                      }`}
                      title={!color.isAvailable ? 'Out of stock' : color.name}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Image gallery */}
            <div className='mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0'>
              <h2 className='sr-only'>Images</h2>
              <TabGroup className='flex flex-col-reverse'>
                {/* Image selector */}
                <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
                  <TabList className='grid grid-cols-3 gap-6'>
                    {product.images.map((image) => (
                      <Tab
                        key={image.id}
                        className='group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden'
                      >
                        <span className='sr-only'>{image.alt}</span>
                        <span className='absolute inset-0 overflow-hidden rounded-md'>
                          <Image
                            width={0}
                            height={0}
                            sizes='100vw'
                            alt={image.alt}
                            src={image.src}
                            className='size-full object-cover'
                          />
                        </span>
                        <span
                          aria-hidden='true'
                          className='pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-indigo-500'
                        />
                      </Tab>
                    ))}
                  </TabList>
                </div>

                <TabPanels>
                  {product.images.map((image) => (
                    <TabPanel key={image.id}>
                      <Image
                        width={0}
                        height={0}
                        sizes='100vw'
                        alt={image.alt}
                        src={image.src}
                        className='aspect-square w-full size-full object-cover sm:rounded-lg'
                      />
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>
            </div>

            <div className='mt-8 lg:col-span-5'>
              <form>
                <AddToCartBtn
                  product={product}
                  selectedVariantId={selectedVariant?.id}
                />

                {/* Product details */}
                <div className='mt-10'>
                  <h2 className='text-sm font-medium text-gray-900'>
                    Description
                  </h2>

                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    className='mt-4 space-y-4 text-sm/6 text-gray-500'
                  />
                </div>

                <div className='mt-8 border-t border-gray-200 pt-8'>
                  <h2 className='text-sm font-medium text-gray-900'>
                    Fabric &amp; Care
                  </h2>

                  <div className='mt-4'>
                    <ul
                      role='list'
                      className='list-disc space-y-1 pl-5 text-sm/6 text-gray-500 marker:text-gray-300'
                    >
                      {product.details.map((item) => (
                        <li key={item} className='pl-2'>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Policies */}
                <section aria-labelledby='policies-heading' className='mt-10'>
                  <h2 id='policies-heading' className='sr-only'>
                    Our Policies
                  </h2>

                  <dl className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
                    {policies.map((policy) => (
                      <div
                        key={policy.name}
                        className='rounded-lg border border-gray-200 bg-gray-50 p-6 text-center'
                      >
                        <dt>
                          <policy.icon
                            aria-hidden='true'
                            className='mx-auto size-6 shrink-0 text-gray-400'
                          />
                          <span className='mt-4 text-sm font-medium text-gray-900'>
                            {policy.name}
                          </span>
                        </dt>
                        <dd className='mt-1 text-sm text-gray-500'>
                          {policy.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <div className='mt-10 border-t border-gray-200 pt-10'>
                  <h3 className='text-sm font-medium text-gray-900'>Share</h3>
                  <ul role='list' className='mt-4 flex items-center space-x-6'>
                    <li>
                      <Link
                        href='#'
                        className='flex size-6 items-center justify-center text-gray-400 hover:text-gray-500'
                      >
                        <span className='sr-only'>Share on Facebook</span>
                        <FacebookIcon fill='currentColor' className='size-5' />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='#'
                        className='flex size-6 items-center justify-center text-gray-400 hover:text-gray-500'
                      >
                        <span className='sr-only'>Share on Instagram</span>
                        <InstagramIcon fill='currentColor' className='size-5' />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='#'
                        className='flex size-6 items-center justify-center text-gray-400 hover:text-gray-500'
                      >
                        <span className='sr-only'>Share on X</span>
                        <XIcon fill='currentColor' className='size-5' />
                      </Link>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

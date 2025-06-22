'use client';

import Image from 'next/image';

import { useState, useEffect } from 'react';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import AddToCartBtn from '@common/AddToCartBtn';
import ProductQuickView from '@common/ProductQuickView';
import Rating from '@common/Rating';

import { productRouter } from '~trpc/router/product';

import { cn } from '@utils/cn';
import CommonUtils from '@utils/common';

interface ProductCardProps {
  product: NonNullable<
    Awaited<ReturnType<typeof productRouter.getByFilter>>
  >['products'][0];
}

// Helper to get all sizes with availability info
function getAllSizesWithAvailability(
  product: ProductCardProps['product'],
  variants: ProductCardProps['product']['variants'],
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
  product: ProductCardProps['product'],
  variants: ProductCardProps['product']['variants'],
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

// Helper to get available sizes/colors for selection logic
function getAvailableSizes(
  product: ProductCardProps['product'],
  variants: ProductCardProps['product']['variants'],
  selectedColorId: string
) {
  return product.sizes.filter((size) =>
    variants.some(
      (v) => v.colorId === selectedColorId && v.sizeId === size.id && v.inStock
    )
  );
}

function getAvailableColors(
  product: ProductCardProps['product'],
  variants: ProductCardProps['product']['variants'],
  selectedSizeId: string
) {
  return product.colors
    .map((c) => c.color)
    .filter((color) =>
      variants.some(
        (v) =>
          v.sizeId === selectedSizeId && v.colorId === color.id && v.inStock
      )
    );
}

const ProductCard = ({ product }: ProductCardProps) => {
  const variants = product.variants || [];
  const prices = variants
    .filter((v) => v.inStock && v.price != null)
    .map((v) => Number(v.price));
  const minPrice = prices.length ? Math.min(...prices) : Number(product.price);
  const maxPrice = prices.length ? Math.max(...prices) : Number(product.price);

  // Compute available colors and sizes for initial state
  const initialAvailableColors = product.sizes[0]
    ? getAvailableColors(product, variants, product.sizes[0].id)
    : [];
  const initialAvailableSizes = product.colors[0]?.color
    ? getAvailableSizes(product, variants, product.colors[0].color.id)
    : [];

  const [selectedColor, setSelectedColor] = useState(
    () => initialAvailableColors[0] || product.colors[0]?.color || null
  );
  const [selectedSize, setSelectedSize] = useState(
    () => initialAvailableSizes[0] || product.sizes[0] || null
  );

  // Update available sizes/colors when selection changes
  const availableSizes = selectedColor
    ? getAvailableSizes(product, variants, selectedColor.id)
    : [];
  const availableColors = selectedSize
    ? getAvailableColors(product, variants, selectedSize.id)
    : [];

  // Get all sizes and colors with availability info for display
  const allSizesWithAvailability = selectedColor
    ? getAllSizesWithAvailability(product, variants, selectedColor.id)
    : [];
  const allColorsWithAvailability = selectedSize
    ? getAllColorsWithAvailability(product, variants, selectedSize.id)
    : [];

  // Keep selection valid if available options change
  // If selectedSize is not in availableSizes, update it
  // If selectedColor is not in availableColors, update it
  useEffect(() => {
    if (
      selectedColor &&
      !availableSizes.find((s) => s.id === selectedSize?.id)
    ) {
      setSelectedSize(availableSizes[0] || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, availableSizes.length]);

  useEffect(() => {
    if (
      selectedSize &&
      !availableColors.find((c) => c.id === selectedColor?.id)
    ) {
      setSelectedColor(availableColors[0] || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize, availableColors.length]);

  // Find the selected variant
  const selectedVariant = variants.find(
    (v) =>
      v.colorId === selectedColor?.id &&
      v.sizeId === selectedSize?.id &&
      v.inStock
  );

  return (
    <div className='flex flex-col border-r border-b border-gray-200 p-4 sm:p-6'>
      <div className='h-full relative'>
        <div className='relative'>
          <Image
            width={0}
            height={0}
            sizes='100vw'
            alt={product.images[0]?.alt || product.name}
            src={product.images[0]?.src || '/placeholder.png'}
            className='aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75'
          />
          <div className='absolute inset-0 flex items-end p-4'>
            <ProductQuickView productId={product.id as string}>
              <Button
                type='button'
                color='white'
                className='z-2 w-full bg-white/75 px-4 py-2 opacity-0 group-hover:opacity-100'
              >
                Quick View
                <span className='sr-only'>, {product.name}</span>
              </Button>
            </ProductQuickView>
          </div>
        </div>
        <div className='pt-10 pb-4 text-center'>
          <h3 className='text-sm font-medium text-gray-900'>
            <Link href={`/product/${product.id}`}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </Link>
          </h3>
          <div className='mt-3 flex flex-col items-center'>
            <p className='sr-only'>{product.rating ?? 0} out of 5 stars</p>
            <Rating
              rating={product.rating}
              isCssInteractive
              isModalInteractive
            />
            <p className='mt-1 text-sm text-gray-500'>
              {product._count?.reviews ?? 0} reviews
            </p>
          </div>
          <p className='mt-4 text-sm font-medium text-gray-900'>
            {minPrice === maxPrice
              ? CommonUtils.asCurrency({ amount: minPrice })
              : `${CommonUtils.asCurrency({
                  amount: minPrice,
                })} - ${CommonUtils.asCurrency({ amount: maxPrice })}`}
          </p>

          {/* Selected Variant Price Display */}
          {selectedVariant && selectedVariant.price != null && (
            <p className='mt-1 text-base text-indigo-600 font-bold'>
              {CommonUtils.asCurrency({
                amount: Number(selectedVariant.price),
              })}
            </p>
          )}
        </div>
      </div>
      <div className='mt-auto'>
        {/* Sizes */}
        {allSizesWithAvailability.length > 0 && (
          <div className='mt-2 flex flex-wrap justify-center gap-2'>
            {allSizesWithAvailability.map((size) => (
              <button
                key={size.id}
                className={cn(
                  'px-2 py-1 rounded border text-xs z-2',
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
          <div className='my-2 flex flex-wrap justify-center gap-2'>
            {allColorsWithAvailability.map((color) => (
              <button
                key={color.id}
                className={cn(
                  'w-6 h-6 rounded-full border-2 z-2 size-6',
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
                onClick={() => color.isAvailable && setSelectedColor(color)}
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
        <AddToCartBtn
          product={product}
          selectedVariantId={selectedVariant?.id}
        />
      </div>
    </div>
  );
};

export default ProductCard;

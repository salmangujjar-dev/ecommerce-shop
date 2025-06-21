import Image from 'next/image';

import type { Decimal } from '@prisma/client/runtime/library';

interface Product {
  id: string;
  name: string;
  price: Decimal | number;
  category: {
    name: string;
  };
  images: Array<{
    src: string;
    alt: string;
    primary: boolean;
  }>;
}

interface LowStockAlertProps {
  products: Product[];
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  if (products.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>All products are in stock</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {products.slice(0, 5).map((product) => {
        const primaryImage =
          product.images.find((img) => img.primary) || product.images[0];
        const price =
          typeof product.price === 'number'
            ? product.price
            : Number(product.price);

        return (
          <div
            key={product.id}
            className='flex items-center space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50'
          >
            <div className='flex-shrink-0'>
              {primaryImage ? (
                <Image
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  width={48}
                  height={48}
                  className='h-12 w-12 rounded-md object-cover'
                />
              ) : (
                <div className='h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center'>
                  <span className='text-xs text-gray-500'>No image</span>
                </div>
              )}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 truncate'>
                {product.name}
              </p>
              <p className='text-sm text-gray-500'>{product.category.name}</p>
              <p className='text-sm font-medium text-gray-900'>
                ${price.toFixed(2)}
              </p>
            </div>
            <div className='flex-shrink-0'>
              <span className='inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800'>
                Low Stock
              </span>
            </div>
          </div>
        );
      })}

      {products.length > 5 && (
        <div className='text-center pt-2'>
          <p className='text-sm text-gray-500'>
            +{products.length - 5} more products with low stock
          </p>
        </div>
      )}
    </div>
  );
}

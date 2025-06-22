'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';

import {
  Edit,
  Trash2,
  ArrowLeft,
  ImageIcon,
  Tag,
  Layers,
  Package,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import { trpc } from '~trpc/client';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: product,
    isLoading,
    error,
  } = trpc.admin.getProductById.useQuery(
    { id: productId },
    { enabled: !!productId }
  );

  const deleteProductMutation = trpc.admin.deleteProduct.useMutation({
    onSuccess: () => {
      toast.success('Product deleted successfully');
      router.push('/admin/products');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete product');
      setIsDeleting(false);
    },
  });

  const handleDelete = () => {
    if (
      confirm(
        'Are you sure you want to delete this product? This action cannot be undone.'
      )
    ) {
      setIsDeleting(true);
      deleteProductMutation.mutate({ id: productId });
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-gray-600'>Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-red-600'>Failed to load product details</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin/products'
            className='text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
              <Package className='h-6 w-6 text-indigo-600' />
              {product.name}
            </h1>
            <p className='text-gray-600 text-sm'>Product ID: {product.id}</p>
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button href={`/admin/products/${product.id}/edit`} color='blue'>
            <Edit className='h-4 w-4 mr-2' /> Edit
          </Button>
          <Button onClick={handleDelete} color='red' disabled={isDeleting}>
            <Trash2 className='h-4 w-4 mr-2' /> Delete
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Product Details */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Images */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-4 flex items-center gap-2'>
              <ImageIcon className='h-5 w-5 text-gray-600' /> Images
            </h2>
            <div className='flex flex-wrap gap-4'>
              {product.images && product.images.length > 0 ? (
                product.images.map(
                  (img: {
                    id: string;
                    src: string;
                    alt: string;
                    primary: boolean;
                  }) => (
                    <Image
                      width={0}
                      height={0}
                      sizes='100vw'
                      key={img.id}
                      src={img.src}
                      alt={img.alt}
                      className={`h-24 w-24 object-cover rounded border ${
                        img.primary ? 'border-indigo-500' : 'border-gray-200'
                      }`}
                    />
                  )
                )
              ) : (
                <div className='text-gray-400'>No images</div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className='bg-white rounded-lg shadow p-6 space-y-3'>
            <div className='flex gap-6 flex-wrap'>
              <div>
                <span className='text-gray-500'>Category:</span>
                <span className='ml-2 font-medium text-gray-900'>
                  {product.category?.name || '-'}
                </span>
              </div>
              <div>
                <span className='text-gray-500'>Gender:</span>
                <span className='ml-2 font-medium text-gray-900'>
                  {product.gender?.name || '-'}
                </span>
              </div>
              <div>
                <span className='text-gray-500'>Price:</span>
                <span className='ml-2 font-medium text-gray-900'>
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>
              <div>
                <span className='text-gray-500'>Slug:</span>
                <span className='ml-2 font-mono text-xs text-gray-700'>
                  {product.slug}
                </span>
              </div>
            </div>
            <div>
              <span className='text-gray-500'>Description:</span>
              <p className='ml-2 mt-1 text-gray-900 text-sm'>
                {product.description}
              </p>
            </div>
            {product.details && product.details.length > 0 && (
              <div>
                <span className='text-gray-500'>Details:</span>
                <ul className='ml-4 mt-1 list-disc text-gray-900 text-sm'>
                  {product.details.map((d: string, i: number) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Variants */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-4 flex items-center gap-2'>
              <Layers className='h-5 w-5 text-gray-600' /> Variants
            </h2>
            {product.variants && product.variants.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                        Color
                      </th>
                      <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                        Size
                      </th>
                      <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                        Price
                      </th>
                      <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                        In Stock
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {product.variants.map(
                      (variant: {
                        id: string;
                        color?: { name: string };
                        size?: { name: string };
                        price?: number | null;
                        inStock?: boolean;
                      }) => (
                        <tr key={variant.id}>
                          <td className='px-4 py-2'>
                            {variant.color?.name || '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {variant.size?.name || '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {variant.price
                              ? `$${Number(variant.price).toFixed(2)}`
                              : '-'}
                          </td>
                          <td className='px-4 py-2'>
                            {variant.inStock ? 'Yes' : 'No'}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='text-gray-400'>No variants</div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Tags */}
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center space-x-2 mb-4'>
              <Tag className='h-5 w-5 text-gray-600' />
              <h2 className='text-lg font-medium text-gray-900'>Meta</h2>
            </div>
            <div className='space-y-2'>
              <p className='text-sm'>
                <span className='font-medium'>Created:</span>{' '}
                {new Date(product.createdAt).toLocaleString()}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Updated:</span>{' '}
                {new Date(product.updatedAt).toLocaleString()}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>ID:</span> {product.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

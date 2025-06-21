'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { useState, useEffect } from 'react';

import { ArrowLeft, Save } from 'lucide-react';

import { trpc } from '~trpc/client';

export default function EditVariantPage() {
  const router = useRouter();
  const params = useParams();
  const variantId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    colorId: '',
    sizeId: '',
    price: '',
    inStock: true,
  });

  const { data: variant, isLoading } = trpc.admin.getVariantById.useQuery({
    id: variantId,
  });
  const { data: colorsData } = trpc.admin.getAllColors.useQuery({
    page: 1,
    limit: 100,
  });
  const { data: sizesData } = trpc.admin.getAllSizes.useQuery({
    page: 1,
    limit: 100,
  });

  const colors = colorsData?.colors || [];
  const sizes = sizesData?.sizes || [];

  const updateVariantMutation = trpc.admin.updateVariant.useMutation({
    onSuccess: () => {
      router.push('/admin/variants');
    },
  });

  // Load variant data when available
  useEffect(() => {
    if (variant) {
      setFormData({
        colorId: variant.colorId,
        sizeId: variant.sizeId,
        price: variant.price ? variant.price.toString() : '',
        inStock: variant.inStock,
      });
    }
  }, [variant]);

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateVariantMutation.mutateAsync({
        id: variantId,
        colorId: formData.colorId,
        sizeId: formData.sizeId,
        price: formData.price ? parseFloat(formData.price) : undefined,
        inStock: formData.inStock,
      });
    } catch (error) {
      console.error('Error updating variant:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Loading variant...</div>
      </div>
    );
  }

  if (!variant) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Variant not found</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin/variants'
            className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Variants
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Edit Variant</h1>
            <p className='text-gray-600'>Update variant information</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='max-w-2xl space-y-6'>
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='space-y-6'>
            {/* Basic Information */}
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Variant Information
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='sm:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Product
                  </label>
                  <input
                    type='text'
                    value={variant.product.name}
                    disabled
                    className='mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Color *
                  </label>
                  <select
                    required
                    value={formData.colorId}
                    onChange={(e) =>
                      handleInputChange('colorId', e.target.value)
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  >
                    <option value=''>Select a color</option>
                    {colors.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Size *
                  </label>
                  <select
                    required
                    value={formData.sizeId}
                    onChange={(e) =>
                      handleInputChange('sizeId', e.target.value)
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  >
                    <option value=''>Select a size</option>
                    {sizes.map((size) => (
                      <option key={size.id} value={size.id}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Price (Optional)
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <span className='text-gray-500 sm:text-sm'>$</span>
                    </div>
                    <input
                      type='number'
                      step='0.01'
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange('price', e.target.value)
                      }
                      placeholder='0.00'
                      className='block w-full pl-7 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Stock Status
                  </label>
                  <select
                    value={formData.inStock ? 'true' : 'false'}
                    onChange={(e) =>
                      handleInputChange('inStock', e.target.value === 'true')
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  >
                    <option value='true'>In Stock</option>
                    <option value='false'>Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Current Variant Info */}
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Current Variant
              </h2>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
                  <div>
                    <div className='text-sm font-medium text-gray-500'>
                      Color
                    </div>
                    <div className='flex items-center mt-1'>
                      <div
                        className='h-4 w-4 rounded-full border border-gray-200 mr-2'
                        style={{ backgroundColor: variant.color.bgColor }}
                      />
                      <span className='text-sm text-gray-900'>
                        {variant.color.name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className='text-sm font-medium text-gray-500'>
                      Size
                    </div>
                    <div className='text-sm text-gray-900 mt-1'>
                      {variant.size.name}
                    </div>
                  </div>
                  <div>
                    <div className='text-sm font-medium text-gray-500'>
                      Price
                    </div>
                    <div className='text-sm text-gray-900 mt-1'>
                      {variant.price ? `$${variant.price.toFixed(2)}` : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end space-x-3'>
          <Link
            href='/admin/variants'
            className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Cancel
          </Link>
          <button
            type='submit'
            disabled={isSubmitting}
            className='inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Save className='mr-2 h-4 w-4' />
            {isSubmitting ? 'Updating...' : 'Update Variant'}
          </button>
        </div>
      </form>
    </div>
  );
}

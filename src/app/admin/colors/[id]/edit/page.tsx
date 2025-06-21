'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { useState, useEffect } from 'react';

import { ArrowLeft, Save } from 'lucide-react';

import { trpc } from '~trpc/client';

export default function EditColorPage() {
  const router = useRouter();
  const params = useParams();
  const colorId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    bgColor: '#000000',
    selectedColor: '#000000',
  });

  const { data: color, isLoading } = trpc.admin.getColorById.useQuery({
    id: colorId,
  });

  const updateColorMutation = trpc.admin.updateColor.useMutation({
    onSuccess: () => {
      router.push('/admin/colors');
    },
  });

  // Load color data when available
  useEffect(() => {
    if (color) {
      setFormData({
        name: color.name,
        slug: color.slug,
        bgColor: color.bgColor,
        selectedColor: color.selectedColor,
      });
    }
  }, [color]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData((prev) => ({ ...prev, name, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateColorMutation.mutateAsync({
        id: colorId,
        name: formData.name,
        slug: formData.slug,
        bgColor: formData.bgColor,
        selectedColor: formData.selectedColor,
      });
    } catch (error) {
      console.error('Error updating color:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Loading color...</div>
      </div>
    );
  }

  if (!color) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Color not found</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin/colors'
            className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Colors
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Edit Color</h1>
            <p className='text-gray-600'>Update color information</p>
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
                Color Information
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Color Name *
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Slug *
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Color Values
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Background Color *
                  </label>
                  <div className='flex items-center space-x-3'>
                    <input
                      type='color'
                      required
                      value={formData.bgColor}
                      onChange={(e) =>
                        handleInputChange('bgColor', e.target.value)
                      }
                      className='h-10 w-20 rounded border border-gray-300'
                    />
                    <input
                      type='text'
                      value={formData.bgColor}
                      onChange={(e) =>
                        handleInputChange('bgColor', e.target.value)
                      }
                      className='flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                      placeholder='#000000'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Selected Color *
                  </label>
                  <div className='flex items-center space-x-3'>
                    <input
                      type='color'
                      required
                      value={formData.selectedColor}
                      onChange={(e) =>
                        handleInputChange('selectedColor', e.target.value)
                      }
                      className='h-10 w-20 rounded border border-gray-300'
                    />
                    <input
                      type='text'
                      value={formData.selectedColor}
                      onChange={(e) =>
                        handleInputChange('selectedColor', e.target.value)
                      }
                      className='flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                      placeholder='#000000'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Preview */}
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Color Preview
              </h2>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <div
                    className='h-8 w-8 rounded-full border border-gray-200 shadow-sm'
                    style={{ backgroundColor: formData.bgColor }}
                  />
                  <span className='text-sm text-gray-700'>Background</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div
                    className='h-8 w-8 rounded-full border border-gray-200 shadow-sm'
                    style={{ backgroundColor: formData.selectedColor }}
                  />
                  <span className='text-sm text-gray-700'>Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end space-x-3'>
          <Link
            href='/admin/colors'
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
            {isSubmitting ? 'Updating...' : 'Update Color'}
          </button>
        </div>
      </form>
    </div>
  );
}

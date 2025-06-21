'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { useState, useEffect } from 'react';

import { ArrowLeft, Save } from 'lucide-react';

import { trpc } from '~trpc/client';

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: '',
  });

  const { data: category, isLoading } = trpc.admin.getCategoryById.useQuery({
    id: categoryId,
  });
  const { data: categories } = trpc.admin.getAllCategories.useQuery({
    page: 1,
    limit: 100,
  });

  const updateCategoryMutation = trpc.admin.updateCategory.useMutation({
    onSuccess: () => {
      router.push('/admin/categories');
    },
  });

  // Load category data when available
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        parentId: category.parentId || '',
      });
    }
  }, [category]);

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
      await updateCategoryMutation.mutateAsync({
        id: categoryId,
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        parentId: formData.parentId || undefined,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Loading category...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Category not found</div>
      </div>
    );
  }

  const parentCategories =
    categories?.categories.filter(
      (cat) => !cat.parent && cat.id !== categoryId
    ) || [];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin/categories'
            className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Categories
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Edit Category</h1>
            <p className='text-gray-600'>Update category information</p>
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
                Category Information
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Category Name *
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
                <div className='sm:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange('description', e.target.value)
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Parent Category
                  </label>
                  <select
                    value={formData.parentId}
                    onChange={(e) =>
                      handleInputChange('parentId', e.target.value)
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  >
                    <option value=''>No parent (top-level category)</option>
                    {parentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end space-x-3'>
          <Link
            href='/admin/categories'
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
            {isSubmitting ? 'Updating...' : 'Update Category'}
          </button>
        </div>
      </form>
    </div>
  );
}

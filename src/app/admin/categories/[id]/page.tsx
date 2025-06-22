'use client';

import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';

import { Edit, Trash2, ArrowLeft, Folder, Tag } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import { trpc } from '~trpc/client';

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: category,
    isLoading,
    error,
  } = trpc.admin.getCategoryById.useQuery(
    { id: categoryId },
    { enabled: !!categoryId }
  );

  const deleteCategoryMutation = trpc.admin.deleteCategory.useMutation({
    onSuccess: () => {
      toast.success('Category deleted successfully');
      router.push('/admin/categories');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete category');
      setIsDeleting(false);
    },
  });

  const handleDelete = () => {
    if (
      confirm(
        'Are you sure you want to delete this category? This action cannot be undone.'
      )
    ) {
      setIsDeleting(true);
      deleteCategoryMutation.mutate({ id: categoryId });
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-gray-600'>Loading category details...</div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-red-600'>Failed to load category details</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin/categories'
            className='text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
              <Folder className='h-6 w-6 text-indigo-600' />
              {category.name}
            </h1>
            <p className='text-gray-600 text-sm'>Category ID: {category.id}</p>
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button href={`/admin/categories/${category.id}/edit`} color='blue'>
            <Edit className='h-4 w-4 mr-2' /> Edit
          </Button>
          <Button onClick={handleDelete} color='red' disabled={isDeleting}>
            <Trash2 className='h-4 w-4 mr-2' /> Delete
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Category Details */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Info */}
          <div className='bg-white rounded-lg shadow p-6 space-y-3'>
            <div className='flex gap-6 flex-wrap'>
              <div>
                <span className='text-gray-500'>Slug:</span>
                <span className='ml-2 font-mono text-xs text-gray-700'>
                  {category.slug}
                </span>
              </div>
              <div>
                <span className='text-gray-500'>Parent:</span>
                <span className='ml-2 font-medium text-gray-900'>
                  {category.parent?.name || '-'}
                </span>
              </div>
              <div>
                <span className='text-gray-500'>Description:</span>
                <span className='ml-2 text-gray-900'>
                  {category.description || '-'}
                </span>
              </div>
            </div>
            {category.subcategories && category.subcategories.length > 0 && (
              <div>
                <span className='text-gray-500'>Subcategories:</span>
                <ul className='ml-4 mt-1 list-disc text-gray-900 text-sm'>
                  {category.subcategories.map(
                    (sub: { id: string; name: string }) => (
                      <li key={sub.id}>{sub.name}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Meta */}
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center space-x-2 mb-4'>
              <Tag className='h-5 w-5 text-gray-600' />
              <h2 className='text-lg font-medium text-gray-900'>Meta</h2>
            </div>
            <div className='space-y-2'>
              <p className='text-sm'>
                <span className='font-medium'>Created:</span>{' '}
                {new Date(category.createdAt).toLocaleString()}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Updated:</span>{' '}
                {new Date(category.updatedAt).toLocaleString()}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>ID:</span> {category.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

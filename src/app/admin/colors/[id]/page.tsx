'use client';

import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';

import { Edit, Trash2, ArrowLeft, Tag, Droplet } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import { trpc } from '~trpc/client';

export default function ColorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const colorId = params.id as string;
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: color,
    isLoading,
    error,
  } = trpc.admin.getColorById.useQuery({ id: colorId }, { enabled: !!colorId });

  const deleteColorMutation = trpc.admin.deleteColor.useMutation({
    onSuccess: () => {
      toast.success('Color deleted successfully');
      router.push('/admin/colors');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete color');
      setIsDeleting(false);
    },
  });

  const handleDelete = () => {
    if (
      confirm(
        'Are you sure you want to delete this color? This action cannot be undone.'
      )
    ) {
      setIsDeleting(true);
      deleteColorMutation.mutate({ id: colorId });
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-gray-600'>Loading color details...</div>
      </div>
    );
  }

  if (error || !color) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-red-600'>Failed to load color details</div>
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
            className='text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
              <Droplet className='h-6 w-6 text-indigo-600' />
              {color.name}
            </h1>
            <p className='text-gray-600 text-sm'>Color ID: {color.id}</p>
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button href={`/admin/colors/${color.id}/edit`} color='blue'>
            <Edit className='h-4 w-4 mr-2' /> Edit
          </Button>
          <Button onClick={handleDelete} color='red' disabled={isDeleting}>
            <Trash2 className='h-4 w-4 mr-2' /> Delete
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Color Details */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Info */}
          <div className='bg-white rounded-lg shadow p-6 space-y-3'>
            <div className='flex gap-6 flex-wrap items-center'>
              <div>
                <span className='text-gray-500'>Slug:</span>
                <span className='ml-2 font-mono text-xs text-gray-700'>
                  {color.slug}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-gray-500'>Swatch:</span>
                <span
                  className='inline-block h-6 w-6 rounded border border-gray-300'
                  style={{ backgroundColor: color.bgColor }}
                  title={color.name}
                />
                <span className='ml-2 font-mono text-xs text-gray-700'>
                  {color.bgColor}
                </span>
              </div>
              <div>
                <span className='text-gray-500'>Selected Color:</span>
                <span className='ml-2 font-mono text-xs text-gray-700'>
                  {color.selectedColor}
                </span>
              </div>
            </div>
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
                {new Date(color.createdAt).toLocaleString()}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Updated:</span>{' '}
                {new Date(color.updatedAt).toLocaleString()}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>ID:</span> {color.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

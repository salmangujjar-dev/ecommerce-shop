'use client';

import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';

import { Edit, Trash2, ArrowLeft, Tag, Ruler } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import { trpc } from '~trpc/client';

export default function SizeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sizeId = params.id as string;
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: size,
    isLoading,
    error,
  } = trpc.admin.getSizeById.useQuery({ id: sizeId }, { enabled: !!sizeId });

  const deleteSizeMutation = trpc.admin.deleteSize.useMutation({
    onSuccess: () => {
      toast.success('Size deleted successfully');
      router.push('/admin/sizes');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete size');
      setIsDeleting(false);
    },
  });

  const handleDelete = () => {
    if (
      confirm(
        'Are you sure you want to delete this size? This action cannot be undone.'
      )
    ) {
      setIsDeleting(true);
      deleteSizeMutation.mutate({ id: sizeId });
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-gray-600'>Loading size details...</div>
      </div>
    );
  }

  if (error || !size) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-red-600'>Failed to load size details</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin/sizes'
            className='text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
              <Ruler className='h-6 w-6 text-indigo-600' />
              {size.name}
            </h1>
            <p className='text-gray-600 text-sm'>Size ID: {size.id}</p>
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button href={`/admin/sizes/${size.id}/edit`} color='blue'>
            <Edit className='h-4 w-4 mr-2' /> Edit
          </Button>
          <Button onClick={handleDelete} color='red' disabled={isDeleting}>
            <Trash2 className='h-4 w-4 mr-2' /> Delete
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Size Details */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Info */}
          <div className='bg-white rounded-lg shadow p-6 space-y-3'>
            <div className='flex gap-6 flex-wrap'>
              <div>
                <span className='text-gray-500'>Product:</span>
                <span className='ml-2 font-medium text-gray-900'>
                  {size.product?.name || '-'}
                </span>
              </div>
              <div>
                <span className='text-gray-500'>In Stock:</span>
                <span className='ml-2 font-medium text-gray-900'>
                  {size.inStock ? 'Yes' : 'No'}
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
                {new Date(size.createdAt).toLocaleString()}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Updated:</span>{' '}
                {new Date(size.updatedAt).toLocaleString()}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>ID:</span> {size.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

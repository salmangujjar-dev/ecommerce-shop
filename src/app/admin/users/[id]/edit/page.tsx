'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { useState, useEffect } from 'react';

import { ArrowLeft, Save } from 'lucide-react';

import { trpc } from '~trpc/client';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    isActive: true,
  });

  const { data: user, isLoading } = trpc.admin.getUserById.useQuery({
    id: userId,
  });

  const updateUserMutation = trpc.admin.updateUser.useMutation({
    onSuccess: () => {
      router.push('/admin/users');
    },
  });

  // Load user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        isActive: user.isActive,
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUserMutation.mutateAsync({
        id: userId,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        isActive: formData.isActive,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Loading user...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>User not found</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin/users'
            className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Users
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Edit User</h1>
            <p className='text-gray-600'>Update user information</p>
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
                User Information
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Full Name *
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Username *
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange('username', e.target.value)
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email *
                  </label>
                  <input
                    type='email'
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Account Status
                  </label>
                  <select
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) =>
                      handleInputChange('isActive', e.target.value === 'true')
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  >
                    <option value='true'>Active</option>
                    <option value='false'>Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* User Stats */}
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                User Statistics
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <div className='text-sm font-medium text-gray-500'>
                    Total Orders
                  </div>
                  <div className='text-2xl font-bold text-gray-900'>
                    {user._count.orders}
                  </div>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <div className='text-sm font-medium text-gray-500'>
                    Total Reviews
                  </div>
                  <div className='text-2xl font-bold text-gray-900'>
                    {user._count.reviews}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end space-x-3'>
          <Link
            href='/admin/users'
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
            {isSubmitting ? 'Updating...' : 'Update User'}
          </button>
        </div>
      </form>
    </div>
  );
}

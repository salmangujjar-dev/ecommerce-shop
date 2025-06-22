'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  Edit,
  User,
  Mail,
  Calendar,
  Package,
  Star,
} from 'lucide-react';

import { trpc } from '~trpc/client';

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;

  const { data: user, isLoading } = trpc.admin.getUserById.useQuery({
    id: userId,
  });

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

  const createdAt =
    typeof user.createdAt === 'string'
      ? new Date(user.createdAt)
      : user.createdAt;
  const updatedAt =
    typeof user.updatedAt === 'string'
      ? new Date(user.updatedAt)
      : user.updatedAt;

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
            <h1 className='text-2xl font-bold text-gray-900'>User Details</h1>
            <p className='text-gray-600'>View user information and activity</p>
          </div>
        </div>
        <Link
          href={`/admin/users/${userId}/edit`}
          className='inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          <Edit className='mr-2 h-4 w-4' />
          Edit User
        </Link>
      </div>

      {/* User Information */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Main Info */}
        <div className='lg:col-span-2 space-y-6'>
          <div className='rounded-lg bg-white p-6 shadow'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Basic Information
            </h2>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <div className='flex-shrink-0 h-12 w-12'>
                  <div className='h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center'>
                    <User className='h-6 w-6 text-indigo-600' />
                  </div>
                </div>
                <div className='ml-4'>
                  <div className='text-xl font-medium text-gray-900'>
                    {user.name}
                  </div>
                  <div className='text-sm text-gray-500'>@{user.username}</div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    Email
                  </label>
                  <div className='mt-1 flex items-center'>
                    <Mail className='h-4 w-4 text-gray-400 mr-2' />
                    <span className='text-sm text-gray-900'>{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    Account Status
                  </label>
                  <div className='mt-1'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    Admin Access
                  </label>
                  <div className='mt-1'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isAdmin
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    Member Since
                  </label>
                  <div className='mt-1 flex items-center'>
                    <Calendar className='h-4 w-4 text-gray-400 mr-2' />
                    <span className='text-sm text-gray-900'>
                      {formatDistanceToNow(createdAt, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className='rounded-lg bg-white p-6 shadow'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Activity Statistics
            </h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='bg-blue-50 p-4 rounded-lg'>
                <div className='flex items-center'>
                  <Package className='h-8 w-8 text-blue-600' />
                  <div className='ml-3'>
                    <div className='text-sm font-medium text-blue-600'>
                      Total Orders
                    </div>
                    <div className='text-2xl font-bold text-blue-900'>
                      {user._count.orders}
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-yellow-50 p-4 rounded-lg'>
                <div className='flex items-center'>
                  <Star className='h-8 w-8 text-yellow-600' />
                  <div className='ml-3'>
                    <div className='text-sm font-medium text-yellow-600'>
                      Total Reviews
                    </div>
                    <div className='text-2xl font-bold text-yellow-900'>
                      {user._count.reviews}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Account Details */}
          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Account Details
            </h3>
            <div className='space-y-3'>
              <div>
                <label className='block text-sm font-medium text-gray-500'>
                  User ID
                </label>
                <div className='mt-1 text-sm text-gray-900 font-mono'>
                  {user.id}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-500'>
                  Last Updated
                </label>
                <div className='mt-1 text-sm text-gray-900'>
                  {formatDistanceToNow(updatedAt, { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Quick Actions
            </h3>
            <div className='space-y-3'>
              <Link
                href={`/admin/users/${userId}/edit`}
                className='w-full inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit User
              </Link>

              <button
                onClick={() => {
                  // TODO: Implement view orders functionality
                  alert('View orders functionality to be implemented');
                }}
                className='w-full inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                <Package className='mr-2 h-4 w-4' />
                View Orders
              </button>

              <button
                onClick={() => {
                  // TODO: Implement view reviews functionality
                  alert('View reviews functionality to be implemented');
                }}
                className='w-full inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                <Star className='mr-2 h-4 w-4' />
                View Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

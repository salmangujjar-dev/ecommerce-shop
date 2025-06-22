'use client';

import { FC } from 'react';

import { Calendar, ShoppingCart, User } from 'lucide-react';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import { useSession } from '@lib/session/provider';

const Dashboard: FC = () => {
  const { isAuthenticated, user } = useSession();

  if (!isAuthenticated) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <h2 className='text-2xl font-bold mb-4'>
          You must be logged in to view your dashboard.
        </h2>
        <Link href='/login'>
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-2xl w-full mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-2'>
        Welcome, {user?.name || 'User'}!
      </h1>
      <p className='text-gray-600 mb-6'>This is your personal dashboard.</p>
      <div className='bg-white rounded-lg shadow p-6 mb-8'>
        <div className='flex items-center mb-4'>
          <User className='h-6 w-6 text-indigo-600 mr-2' />
          <span className='font-medium text-gray-900'>{user?.name}</span>
        </div>
        <div className='flex items-center mb-4'>
          <span className='font-medium text-gray-700 mr-2'>Email:</span>
          <span className='text-gray-900'>{user?.email}</span>
        </div>
        <div className='flex items-center'>
          <Calendar className='h-5 w-5 text-gray-400 mr-2' />
          <span className='text-gray-700'>
            Joined:{' '}
            {user?.createdAt
              ? (() => {
                  const date =
                    typeof user.createdAt === 'string'
                      ? new Date(user.createdAt)
                      : user.createdAt;
                  return date instanceof Date && !isNaN(date.getTime())
                    ? date.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Unknown';
                })()
              : 'Unknown'}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Link href='/orders' className='block'>
          <div className='flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition'>
            <ShoppingCart className='h-6 w-6 text-indigo-600 mr-3' />
            <span className='font-medium text-indigo-900'>My Orders</span>
          </div>
        </Link>
        <Link href='/settings' className='block'>
          <div className='flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition'>
            <User className='h-6 w-6 text-gray-600 mr-3' />
            <span className='font-medium text-gray-900'>Profile Settings</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

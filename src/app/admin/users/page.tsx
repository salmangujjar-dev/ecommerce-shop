'use client';

import Link from 'next/link';

import { useState } from 'react';

import { formatDistanceToNow } from 'date-fns';
import { Search, Edit, Eye, User, Mail, Calendar } from 'lucide-react';

import { trpc } from '~trpc/client';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    orders: number;
    reviews: number;
  };
}

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const {
    data: usersData,
    isLoading,
    refetch,
  } = trpc.admin.getAllUsers.useQuery({
    page,
    limit: 10,
    search: search || undefined,
  });

  const updateUserStatusMutation = trpc.admin.updateUserStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleStatusUpdate = (userId: string, isActive: boolean) => {
    updateUserStatusMutation.mutate({
      id: userId,
      isActive,
    });
  };

  const users = usersData?.users || [];
  const totalPages = usersData?.pages || 0;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Users</h1>
          <p className='text-gray-600'>Manage user accounts and permissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className='rounded-lg bg-white p-6 shadow'>
        <div className='flex gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search users...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <button
            onClick={() => setSearch('')}
            className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className='rounded-lg bg-white shadow'>
        {isLoading ? (
          <div className='p-6 text-center'>
            <div className='text-gray-600'>Loading users...</div>
          </div>
        ) : users.length === 0 ? (
          <div className='p-6 text-center'>
            <div className='text-gray-600'>No users found</div>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Contact
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Activity
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Joined
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {users.map((user: User) => {
                  const createdAt =
                    typeof user.createdAt === 'string'
                      ? new Date(user.createdAt)
                      : user.createdAt;

                  return (
                    <tr key={user.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 h-10 w-10'>
                            <div className='h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center'>
                              <User className='h-5 w-5 text-indigo-600' />
                            </div>
                          </div>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              {user.name}
                            </div>
                            <div className='text-sm text-gray-500'>
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <Mail className='h-4 w-4 text-gray-400 mr-2' />
                          <div className='text-sm text-gray-900'>
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <select
                          value={user.isActive ? 'active' : 'inactive'}
                          onChange={(e) =>
                            handleStatusUpdate(
                              user.id,
                              e.target.value === 'active'
                            )
                          }
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium border-0 ${
                            user.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value='active'>Active</option>
                          <option value='inactive'>Inactive</option>
                        </select>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex space-x-2'>
                          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                            {user._count.orders} orders
                          </span>
                          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                            {user._count.reviews} reviews
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <div className='flex items-center'>
                          <Calendar className='h-4 w-4 text-gray-400 mr-1' />
                          {formatDistanceToNow(createdAt, { addSuffix: true })}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div className='flex space-x-2'>
                          <Link
                            href={`/admin/users/${user.id}`}
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            <Eye className='h-4 w-4' />
                          </Link>
                          <Link
                            href={`/admin/users/${user.id}/edit`}
                            className='text-blue-600 hover:text-blue-900'
                          >
                            <Edit className='h-4 w-4' />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
            <div className='flex-1 flex justify-between sm:hidden'>
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Next
              </button>
            </div>
            <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
              <div>
                <p className='text-sm text-gray-700'>
                  Showing page <span className='font-medium'>{page}</span> of{' '}
                  <span className='font-medium'>{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

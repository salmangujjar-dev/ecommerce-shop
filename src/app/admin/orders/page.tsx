'use client';

import Link from 'next/link';

import { useState } from 'react';

import { formatDistanceToNow } from 'date-fns';
import { Edit, Eye, Package, Calendar, DollarSign } from 'lucide-react';

import { trpc } from '~trpc/client';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string | Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
  payment: {
    id: string;
    status: string;
  } | null;
  products: Array<{
    id: string;
    name: string;
    images: Array<{
      src: string;
      alt: string;
    }>;
  }>;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  IN_PROCESS: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELED: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const {
    data: ordersData,
    isLoading,
    refetch,
  } = trpc.admin.getAllOrders.useQuery({
    page,
    limit: 10,
    status:
      (statusFilter as
        | 'PENDING'
        | 'CONFIRMED'
        | 'CANCELED'
        | 'IN_PROCESS'
        | 'DELIVERED') || undefined,
  });

  const updateOrderStatusMutation = trpc.admin.updateOrderStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatusMutation.mutate({
      id: orderId,
      status: newStatus as
        | 'PENDING'
        | 'CONFIRMED'
        | 'CANCELED'
        | 'IN_PROCESS'
        | 'DELIVERED',
    });
  };

  const orders = ordersData?.orders || [];
  const totalPages = ordersData?.pages || 0;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Orders</h1>
          <p className='text-gray-600'>
            Manage customer orders and fulfillment
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className='rounded-lg bg-white p-6 shadow'>
        <div className='flex gap-4'>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          >
            <option value=''>All Statuses</option>
            <option value='PENDING'>Pending</option>
            <option value='CONFIRMED'>Confirmed</option>
            <option value='IN_PROCESS'>In Process</option>
            <option value='DELIVERED'>Delivered</option>
            <option value='CANCELED'>Canceled</option>
          </select>
          <button
            onClick={() => setStatusFilter('')}
            className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className='rounded-lg bg-white shadow'>
        {isLoading ? (
          <div className='p-6 text-center'>
            <div className='text-gray-600'>Loading orders...</div>
          </div>
        ) : orders.length === 0 ? (
          <div className='p-6 text-center'>
            <div className='text-gray-600'>No orders found</div>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Order
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Customer
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Products
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Total
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Date
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {orders.map((order: Order) => {
                  const createdAt =
                    typeof order.createdAt === 'string'
                      ? new Date(order.createdAt)
                      : order.createdAt;

                  return (
                    <tr key={order.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 h-10 w-10'>
                            <div className='h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center'>
                              <Package className='h-5 w-5 text-indigo-600' />
                            </div>
                          </div>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              #{order.id.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          {order.user.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {order.user.email}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex -space-x-2'>
                          {order.products.slice(0, 3).map((product) => (
                            <div
                              key={product.id}
                              className='h-8 w-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center'
                              title={product.name}
                            >
                              <span className='text-xs font-medium text-gray-600'>
                                {product.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          ))}
                          {order.products.length > 3 && (
                            <div className='h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center'>
                              <span className='text-xs font-medium text-gray-600'>
                                +{order.products.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        <div className='flex items-center'>
                          <DollarSign className='h-4 w-4 text-gray-400 mr-1' />
                          {order.total.toFixed(2)}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusUpdate(order.id, e.target.value)
                          }
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium border-0 ${
                            statusColors[
                              order.status as keyof typeof statusColors
                            ] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value='PENDING'>Pending</option>
                          <option value='CONFIRMED'>Confirmed</option>
                          <option value='IN_PROCESS'>In Process</option>
                          <option value='DELIVERED'>Delivered</option>
                          <option value='CANCELED'>Canceled</option>
                        </select>
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
                            href={`/admin/orders/${order.id}`}
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            <Eye className='h-4 w-4' />
                          </Link>
                          <Link
                            href={`/admin/orders/${order.id}/edit`}
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

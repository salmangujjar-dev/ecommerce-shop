'use client';

import { FC } from 'react';

import { formatDistanceToNow } from 'date-fns';
import { Package, Calendar, Eye } from 'lucide-react';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import { useSession } from '@lib/session/provider';

import { trpc } from '~trpc/client';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  IN_PROCESS: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELED: 'bg-red-100 text-red-800',
};

// Minimal type for order used in this component
interface Order {
  id: string;
  createdAt: string | Date;
  total: number;
  status: string;
}

const OrdersPage: FC = () => {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <h2 className='text-2xl font-bold mb-4'>
          You must be logged in to view your orders.
        </h2>
        <Link href='/login'>
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  // Now using the real trpc.orders.getMyOrders.useQuery
  const { data, isLoading, error } = trpc.orders.getMyOrders.useQuery();
  const orders = data?.orders || [];

  return (
    <div className='max-w-3xl w-full mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-6'>My Orders</h1>
      {isLoading ? (
        <div className='text-gray-600'>Loading your orders...</div>
      ) : error ? (
        <div className='text-red-600'>Failed to load orders.</div>
      ) : orders.length === 0 ? (
        <div className='text-gray-600'>You have no orders yet.</div>
      ) : (
        <div className='space-y-4'>
          {orders.map((order: Order) => {
            const createdAt =
              typeof order.createdAt === 'string'
                ? new Date(order.createdAt)
                : order.createdAt;
            return (
              <div
                key={order.id}
                className='flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50'
              >
                <div className='flex items-center'>
                  <div className='h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4'>
                    <Package className='h-5 w-5 text-indigo-600' />
                  </div>
                  <div>
                    <div className='text-sm font-medium text-gray-900'>
                      Order #{order.id.slice(-8)}
                    </div>
                    <div className='text-xs text-gray-500 flex items-center'>
                      <Calendar className='h-4 w-4 text-gray-400 mr-1' />
                      {formatDistanceToNow(createdAt, { addSuffix: true })}
                    </div>
                    <div className='text-xs font-medium text-gray-700 mt-1'>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          statusColors[order.status] ||
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='text-lg font-bold text-gray-900'>
                    ${order.total.toFixed(2)}
                  </div>
                  <Link
                    href={`/orders/${order.id}`}
                    className='text-indigo-600 hover:text-indigo-900'
                    title='View Details'
                  >
                    <Eye className='h-5 w-5' />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

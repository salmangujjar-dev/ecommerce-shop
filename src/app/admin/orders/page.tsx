'use client';

import Link from 'next/link';

import { useState } from 'react';

import type { Decimal, JsonValue } from '@prisma/client/runtime/library';
import { formatDistanceToNow } from 'date-fns';
import {
  Eye,
  Package,
  Calendar,
  DollarSign,
  Search,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@ui/button';

import { trpc } from '~trpc/client';

interface OrderItem {
  id: string;
  productId: string | null;
  variantId: string | null;
  quantity: number;
  price: Decimal | number;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    images: Array<{
      id: string;
      src: string;
      alt: string;
      primary: boolean;
    }>;
  } | null;
  variant?: {
    id: string;
    price: Decimal | number | null;
    color: {
      id: string;
      name: string;
      bgColor: string;
      selectedColor: string;
    };
    size: {
      id: string;
      name: string;
    };
    product: {
      id: string;
      name: string;
      slug: string;
      images: Array<{
        id: string;
        src: string;
        alt: string;
        primary: boolean;
      }>;
    };
  } | null;
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string | Date;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  payment: {
    id: string;
    status: string;
  } | null;
  items: OrderItem[];
  shippingAddress: JsonValue | null;
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
  const [searchQuery, setSearchQuery] = useState('');

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
    search: searchQuery || undefined,
  });

  const updateOrderStatusMutation = trpc.admin.updateOrderStatus.useMutation({
    onSuccess: () => {
      refetch();
      toast.success('Order status updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update order status');
    },
  });

  const deleteOrderMutation = trpc.admin.deleteOrder.useMutation({
    onSuccess: () => {
      refetch();
      toast.success('Order deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete order');
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

  const handleDeleteOrder = (orderId: string) => {
    if (
      confirm(
        'Are you sure you want to delete this order? This action cannot be undone.'
      )
    ) {
      deleteOrderMutation.mutate({ id: orderId });
    }
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
        <div className='flex gap-4 flex-wrap'>
          <div className='flex-1 min-w-64'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <input
                type='text'
                placeholder='Search by customer name, email, or order ID...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              />
            </div>
          </div>
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
          <Button
            onClick={() => {
              setStatusFilter('');
              setSearchQuery('');
            }}
            plain
          >
            Clear Filters
          </Button>
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
                    Items
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
                          {order.user?.name ||
                            (order.shippingAddress &&
                            typeof order.shippingAddress === 'object' &&
                            order.shippingAddress !== null &&
                            'guestInfo' in order.shippingAddress &&
                            typeof (
                              order.shippingAddress as Record<string, unknown>
                            ).guestInfo === 'object' &&
                            (order.shippingAddress as Record<string, unknown>)
                              .guestInfo !== null &&
                            'name' in
                              ((
                                order.shippingAddress as Record<string, unknown>
                              ).guestInfo as Record<string, unknown>)
                              ? ((
                                  (
                                    order.shippingAddress as Record<
                                      string,
                                      unknown
                                    >
                                  ).guestInfo as Record<string, unknown>
                                ).name as string)
                              : order.shippingAddress &&
                                typeof order.shippingAddress === 'object' &&
                                order.shippingAddress !== null &&
                                'shippingAddress' in order.shippingAddress &&
                                typeof (
                                  order.shippingAddress as Record<
                                    string,
                                    unknown
                                  >
                                ).shippingAddress === 'object' &&
                                (
                                  order.shippingAddress as Record<
                                    string,
                                    unknown
                                  >
                                ).shippingAddress !== null &&
                                'firstName' in
                                  ((
                                    order.shippingAddress as Record<
                                      string,
                                      unknown
                                    >
                                  ).shippingAddress as Record<string, unknown>)
                              ? `${
                                  (
                                    (
                                      order.shippingAddress as Record<
                                        string,
                                        unknown
                                      >
                                    ).shippingAddress as Record<string, unknown>
                                  ).firstName
                                } ${
                                  (
                                    (
                                      order.shippingAddress as Record<
                                        string,
                                        unknown
                                      >
                                    ).shippingAddress as Record<string, unknown>
                                  ).lastName || ''
                                }`.trim()
                              : 'Guest User')}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {order.user?.email ||
                            (order.shippingAddress &&
                            typeof order.shippingAddress === 'object' &&
                            order.shippingAddress !== null &&
                            'guestInfo' in order.shippingAddress &&
                            typeof (
                              order.shippingAddress as Record<string, unknown>
                            ).guestInfo === 'object' &&
                            (order.shippingAddress as Record<string, unknown>)
                              .guestInfo !== null &&
                            'email' in
                              ((
                                order.shippingAddress as Record<string, unknown>
                              ).guestInfo as Record<string, unknown>)
                              ? ((
                                  (
                                    order.shippingAddress as Record<
                                      string,
                                      unknown
                                    >
                                  ).guestInfo as Record<string, unknown>
                                ).email as string)
                              : 'No email')}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex items-center'>
                          <span className='text-sm font-medium'>
                            {order.items.length} item
                            {order.items.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className='text-xs text-gray-500 mt-1'>
                          {order.items.slice(0, 2).map((item, index) => {
                            const product =
                              item.variant?.product || item.product;
                            const productName =
                              product?.name || 'Unknown Product';
                            const variantInfo = item.variant
                              ? ` (${item.variant.color.name}/${item.variant.size.name})`
                              : '';
                            return (
                              <div key={item.id}>
                                {productName}
                                {variantInfo}
                                {index < Math.min(2, order.items.length - 1) &&
                                  ', '}
                              </div>
                            );
                          })}
                          {order.items.length > 2 && (
                            <div className='text-gray-400'>
                              +{order.items.length - 2} more
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
                          disabled={updateOrderStatusMutation.isPending}
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
                            title='View Details'
                          >
                            <Eye className='h-4 w-4' />
                          </Link>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            disabled={deleteOrderMutation.isPending}
                            className='text-red-600 hover:text-red-900'
                            title='Delete Order'
                          >
                            <Trash2 className='h-4 w-4' />
                          </button>
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
              <Button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                plain
              >
                Previous
              </Button>
              <Button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                plain
              >
                Next
              </Button>
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
                  <Button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    plain
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    plain
                  >
                    Next
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

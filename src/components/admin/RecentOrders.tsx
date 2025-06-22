import type { Decimal } from '@prisma/client/runtime/library';
import { formatDistanceToNow } from 'date-fns';

interface Order {
  id: string;
  total: Decimal | number;
  status: string;
  createdAt: string | Date;
  user: {
    name: string;
    email: string;
  } | null;
}

interface RecentOrdersProps {
  orders: Order[];
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  IN_PROCESS: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELED: 'bg-red-100 text-red-800',
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  if (orders.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>No recent orders</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {orders.map((order) => {
        const total =
          typeof order.total === 'number' ? order.total : Number(order.total);
        const createdAt =
          typeof order.createdAt === 'string'
            ? new Date(order.createdAt)
            : order.createdAt;

        return (
          <div
            key={order.id}
            className='flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50'
          >
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900'>
                  {order.user?.name || 'Guest User'}
                </p>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    statusColors[order.status as keyof typeof statusColors] ||
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className='text-sm text-gray-500'>
                {order.user?.email || 'No email'}
              </p>
              <p className='text-xs text-gray-400'>
                {formatDistanceToNow(createdAt, {
                  addSuffix: true,
                })}
              </p>
            </div>
            <div className='ml-4 text-right'>
              <p className='text-sm font-medium text-gray-900'>
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

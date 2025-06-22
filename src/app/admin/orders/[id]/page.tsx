'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';

import type { Decimal } from '@prisma/client/runtime/library';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  Package,
  User,
  CreditCard,
  Calendar,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

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
  description?: string | null;
  shippingAddress?: {
    guestInfo?: {
      name: string;
      email: string;
      phone?: string;
    };
    shippingAddress: {
      firstName: string;
      lastName?: string;
      address: string;
      apartment?: string;
      city: string;
      country: string;
      region: string;
      postalCode?: string;
    };
    paymentInfo: {
      paymentType: 'card' | 'cod';
      cardNumber?: string;
      nameOnCard?: string;
      expirationDate?: string;
      cvc?: string;
    };
  } | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  payment: {
    id: string;
    status: string;
    method: string;
    amount: Decimal | number;
    transactionId?: string | null;
  } | null;
  items: OrderItem[];
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  IN_PROCESS: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELED: 'bg-red-100 text-red-800',
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: order,
    isLoading,
    error,
  } = trpc.admin.getOrderById.useQuery(
    { id: orderId },
    {
      enabled: !!orderId,
    }
  );

  const updateOrderStatusMutation = trpc.admin.updateOrderStatus.useMutation({
    onSuccess: () => {
      toast.success('Order status updated successfully');
      setIsUpdating(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update order status');
      setIsUpdating(false);
    },
  });

  const deleteOrderMutation = trpc.admin.deleteOrder.useMutation({
    onSuccess: () => {
      toast.success('Order deleted successfully');
      router.push('/admin/orders');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete order');
    },
  });

  const handleStatusUpdate = (newStatus: string) => {
    setIsUpdating(true);
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

  const handleDeleteOrder = () => {
    if (
      confirm(
        'Are you sure you want to delete this order? This action cannot be undone.'
      )
    ) {
      deleteOrderMutation.mutate({ id: orderId });
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-gray-600'>Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-red-600'>Failed to load order details</div>
      </div>
    );
  }

  const orderData = order as Order;
  const createdAt =
    typeof orderData.createdAt === 'string'
      ? new Date(orderData.createdAt)
      : orderData.createdAt;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin/orders'
            className='text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Order #{orderData.id.slice(-8)}
            </h1>
            <p className='text-gray-600'>
              Created {formatDistanceToNow(createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className='flex space-x-2'>
          <select
            value={orderData.status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            disabled={isUpdating}
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium border-0 ${
              statusColors[orderData.status as keyof typeof statusColors] ||
              'bg-gray-100 text-gray-800'
            }`}
          >
            <option value='PENDING'>Pending</option>
            <option value='CONFIRMED'>Confirmed</option>
            <option value='IN_PROCESS'>In Process</option>
            <option value='DELIVERED'>Delivered</option>
            <option value='CANCELED'>Canceled</option>
          </select>
          <Button
            onClick={handleDeleteOrder}
            disabled={deleteOrderMutation.isPending}
            color='red'
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Delete Order
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Order Details */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Order Items */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Order Items
            </h2>
            <div className='space-y-4'>
              {orderData.items.map((item) => {
                const price =
                  typeof item.price === 'number'
                    ? item.price
                    : Number(item.price);

                // Get product information
                const product = item.variant?.product || item.product;
                const productName = product?.name || 'Unknown Product';
                const productImage =
                  product?.images.find((img) => img.primary) ||
                  product?.images[0];

                // Get variant information
                const variantInfo = item.variant
                  ? `${item.variant.color.name} / ${item.variant.size.name}`
                  : 'Standard';

                return (
                  <div
                    key={item.id}
                    className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center space-x-3'>
                        <div className='h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden'>
                          {productImage ? (
                            <Image
                              width={0}
                              height={0}
                              sizes='100vw'
                              src={productImage.src}
                              alt={productImage.alt}
                              className='h-full w-full object-cover'
                            />
                          ) : (
                            <Package className='h-6 w-6 text-gray-600' />
                          )}
                        </div>
                        <div className='flex-1'>
                          <p className='font-medium text-gray-900'>
                            {productName}
                          </p>
                          <p className='text-sm text-gray-500'>
                            {variantInfo} • Quantity: {item.quantity}
                          </p>
                          {item.variant && (
                            <p className='text-xs text-gray-400'>
                              Variant ID: {item.variantId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-gray-900'>
                        ${price.toFixed(2)}
                      </p>
                      <p className='text-sm text-gray-500'>
                        ${(price * item.quantity).toFixed(2)} total
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Order Summary
            </h2>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Subtotal:</span>
                <span className='font-medium'>
                  ${orderData.total.toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Shipping:</span>
                <span className='font-medium'>$0.00</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Tax:</span>
                <span className='font-medium'>$0.00</span>
              </div>
              <div className='border-t pt-3 flex justify-between'>
                <span className='text-lg font-medium text-gray-900'>
                  Total:
                </span>
                <span className='text-lg font-medium text-gray-900'>
                  ${orderData.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Customer Information */}
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center space-x-2 mb-4'>
              <User className='h-5 w-5 text-gray-600' />
              <h2 className='text-lg font-medium text-gray-900'>Customer</h2>
            </div>
            {orderData.user ? (
              <div className='space-y-2'>
                <p className='text-sm'>
                  <span className='font-medium'>Name:</span>{' '}
                  {orderData.user.name}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Email:</span>{' '}
                  {orderData.user.email}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>ID:</span> {orderData.user.id}
                </p>
                <p className='text-sm text-gray-500 italic'>Registered user</p>
              </div>
            ) : orderData.shippingAddress?.guestInfo ? (
              <div className='space-y-2'>
                <p className='text-sm'>
                  <span className='font-medium'>Name:</span>{' '}
                  {orderData.shippingAddress.guestInfo.name}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Email:</span>{' '}
                  {orderData.shippingAddress.guestInfo.email}
                </p>
                {orderData.shippingAddress.guestInfo.phone && (
                  <p className='text-sm'>
                    <span className='font-medium'>Phone:</span>{' '}
                    {orderData.shippingAddress.guestInfo.phone}
                  </p>
                )}
                <p className='text-sm text-gray-500 italic'>Guest order</p>
              </div>
            ) : (
              <p className='text-sm text-gray-500'>Guest order (no details)</p>
            )}
          </div>

          {/* Shipping Information */}
          {orderData.shippingAddress && (
            <div className='bg-white rounded-lg shadow p-6'>
              <div className='flex items-center space-x-2 mb-4'>
                <Package className='h-5 w-5 text-gray-600' />
                <h2 className='text-lg font-medium text-gray-900'>
                  Shipping Address
                </h2>
              </div>
              <div className='space-y-2'>
                <p className='text-sm'>
                  <span className='font-medium'>Name:</span>{' '}
                  {orderData.shippingAddress.shippingAddress.firstName}
                  {orderData.shippingAddress.shippingAddress.lastName &&
                    ` ${orderData.shippingAddress.shippingAddress.lastName}`}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Address:</span>{' '}
                  {orderData.shippingAddress.shippingAddress.address}
                  {orderData.shippingAddress.shippingAddress.apartment &&
                    `, ${orderData.shippingAddress.shippingAddress.apartment}`}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>City:</span>{' '}
                  {orderData.shippingAddress.shippingAddress.city}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Region:</span>{' '}
                  {orderData.shippingAddress.shippingAddress.region}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Country:</span>{' '}
                  {orderData.shippingAddress.shippingAddress.country}
                </p>
                {orderData.shippingAddress.shippingAddress.postalCode && (
                  <p className='text-sm'>
                    <span className='font-medium'>Postal Code:</span>{' '}
                    {orderData.shippingAddress.shippingAddress.postalCode}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center space-x-2 mb-4'>
              <CreditCard className='h-5 w-5 text-gray-600' />
              <h2 className='text-lg font-medium text-gray-900'>Payment</h2>
            </div>
            {orderData.payment ? (
              <div className='space-y-2'>
                <p className='text-sm'>
                  <span className='font-medium'>Status:</span>{' '}
                  {orderData.payment.status}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Method:</span>{' '}
                  {orderData.payment.method}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Amount:</span> $
                  {typeof orderData.payment.amount === 'number'
                    ? orderData.payment.amount.toFixed(2)
                    : Number(orderData.payment.amount).toFixed(2)}
                </p>
                {orderData.payment.transactionId && (
                  <p className='text-sm'>
                    <span className='font-medium'>Transaction ID:</span>{' '}
                    {orderData.payment.transactionId}
                  </p>
                )}
              </div>
            ) : orderData.shippingAddress ? (
              <div className='space-y-2'>
                <p className='text-sm'>
                  <span className='font-medium'>Method:</span>{' '}
                  {orderData.shippingAddress.paymentInfo.paymentType === 'card'
                    ? 'Credit Card'
                    : 'Cash on Delivery'}
                </p>
                {orderData.shippingAddress.paymentInfo.paymentType ===
                  'card' && (
                  <>
                    {orderData.shippingAddress.paymentInfo.nameOnCard && (
                      <p className='text-sm'>
                        <span className='font-medium'>Name on Card:</span>{' '}
                        {orderData.shippingAddress.paymentInfo.nameOnCard}
                      </p>
                    )}
                    {orderData.shippingAddress.paymentInfo.cardNumber && (
                      <p className='text-sm'>
                        <span className='font-medium'>Card Number:</span> ****
                        **** ****{' '}
                        {orderData.shippingAddress.paymentInfo.cardNumber.slice(
                          -4
                        )}
                      </p>
                    )}
                    {orderData.shippingAddress.paymentInfo.expirationDate && (
                      <p className='text-sm'>
                        <span className='font-medium'>Expires:</span>{' '}
                        {orderData.shippingAddress.paymentInfo.expirationDate}
                      </p>
                    )}
                  </>
                )}
                <p className='text-sm text-gray-500 italic'>
                  Payment details from checkout
                </p>
              </div>
            ) : (
              <p className='text-sm text-gray-500'>No payment information</p>
            )}
          </div>

          {/* Order Information */}
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center space-x-2 mb-4'>
              <Calendar className='h-5 w-5 text-gray-600' />
              <h2 className='text-lg font-medium text-gray-900'>Order Info</h2>
            </div>
            <div className='space-y-2'>
              <p className='text-sm'>
                <span className='font-medium'>Order ID:</span> {orderData.id}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Status:</span> {orderData.status}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Created:</span>{' '}
                {formatDistanceToNow(createdAt, { addSuffix: true })}
              </p>
              {orderData.description && (
                <p className='text-sm'>
                  <span className='font-medium'>Description:</span>{' '}
                  {orderData.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { FC } from 'react';

import { formatDistanceToNow } from 'date-fns';
import jsPDF from 'jspdf';
import { Calendar, Package } from 'lucide-react';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import { useSession } from '@lib/session/provider';

import { trpc } from '~trpc/client';
import { orderRouter } from '~trpc/router/order';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  IN_PROCESS: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELED: 'bg-red-100 text-red-800',
};

interface ShippingAddress {
  firstName?: string;
  lastName?: string;
  address?: string;
  apartment?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
}

function isShippingAddressJson(
  val: unknown
): val is { shippingAddress?: ShippingAddress } {
  return (
    typeof val === 'object' &&
    val !== null &&
    'shippingAddress' in val &&
    typeof (val as { shippingAddress?: unknown }).shippingAddress === 'object'
  );
}

function normalizeOrderItems(
  items: NonNullable<
    Awaited<ReturnType<typeof orderRouter.getMyOrderById>>
  >['items']
) {
  return items.map((item) => {
    const obj = item;
    return {
      ...obj,
      price: typeof obj.price === 'number' ? obj.price : Number(obj.price),
    };
  });
}

const OrderDetailPage: FC = () => {
  const { isAuthenticated } = useSession();
  const params = useParams();
  const orderId = params.id as string;

  if (!isAuthenticated) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <h2 className='text-2xl font-bold mb-4'>
          You must be logged in to view order details.
        </h2>
        <Link href='/login'>
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const {
    data: order,
    isLoading,
    error,
  } = trpc.orders.getMyOrderById.useQuery(
    { id: orderId },
    { enabled: !!orderId }
  );

  if (isLoading) {
    return (
      <div className='text-gray-600 text-center py-10'>
        Loading order details...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className='text-red-600 text-center py-10'>
        Order not found or you do not have access to this order.
      </div>
    );
  }

  const createdAt =
    typeof order.createdAt === 'string'
      ? new Date(order.createdAt)
      : order.createdAt;

  const normalizedItems = normalizeOrderItems(order.items);

  // Download invoice as PDF
  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Order Invoice', 14, 18);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 14, 30);
    doc.text(`Date: ${createdAt.toLocaleString()}`, 14, 38);
    doc.text(`Status: ${order.status}`, 14, 46);
    doc.text(`Total: $${order.total.toFixed(2)}`, 14, 54);
    doc.text('Shipping Address:', 14, 66);
    let addr: ShippingAddress | undefined = undefined;
    if (isShippingAddressJson(order.shippingAddress)) {
      addr = order.shippingAddress.shippingAddress;
    }
    if (addr) {
      doc.text(`${addr.firstName || ''} ${addr.lastName || ''}`, 14, 74);
      doc.text(
        `${addr.address || ''}${
          addr.apartment ? ', Apt ' + addr.apartment : ''
        }`,
        14,
        82
      );
      doc.text(
        `${addr.city || ''}, ${addr.region || ''} ${addr.postalCode || ''}`,
        14,
        90
      );
      doc.text(`${addr.country || ''}`, 14, 98);
    }
    doc.text('Items:', 14, 110);
    let y = 118;
    normalizedItems.forEach((item, idx: number) => {
      const product = item.variant?.product || item.product;
      doc.text(
        `${idx + 1}. ${product?.name || 'Deleted Product'} | Qty: ${
          item.quantity
        } | Price: $${item.price.toFixed(2)}`,
        14,
        y
      );
      y += 8;
    });
    doc.save(`invoice-${order.id}.pdf`);
  };

  // Safely extract shipping address for display
  let shippingAddr: ShippingAddress | undefined = undefined;
  if (isShippingAddressJson(order.shippingAddress)) {
    shippingAddr = order.shippingAddress.shippingAddress;
  }

  return (
    <div className='max-w-2xl w-full mx-auto py-10 px-4'>
      <div className='mb-6 flex items-center justify-between'>
        <Link href='/orders' className='text-indigo-600 hover:underline'>
          &larr; Back to My Orders
        </Link>
        <Button onClick={handleDownloadInvoice} outline>
          Download Invoice
        </Button>
      </div>
      <h1 className='text-2xl font-bold mb-2'>Order #{order.id.slice(-8)}</h1>
      <div className='flex items-center text-gray-600 mb-2'>
        <Calendar className='h-4 w-4 mr-1' />
        {formatDistanceToNow(createdAt, { addSuffix: true })}
      </div>
      <div className='mb-4'>
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
            statusColors[order.status] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {order.status}
        </span>
      </div>
      <div className='mb-6'>
        <div className='font-medium text-gray-900'>
          Total: <span className='text-lg'>${order.total.toFixed(2)}</span>
        </div>
      </div>
      <div className='mb-8'>
        <h2 className='text-lg font-semibold mb-2'>Shipping Address</h2>
        <div className='text-gray-700'>
          {shippingAddr ? (
            <>
              {shippingAddr.firstName} {shippingAddr.lastName}
              <br />
              {shippingAddr.address}
              {shippingAddr.apartment && (
                <span>, Apt {shippingAddr.apartment}</span>
              )}
              <br />
              {shippingAddr.city}, {shippingAddr.region}{' '}
              {shippingAddr.postalCode}
              <br />
              {shippingAddr.country}
            </>
          ) : (
            <span>Not available</span>
          )}
        </div>
      </div>
      <div>
        <h2 className='text-lg font-semibold mb-2'>Items</h2>
        <div className='space-y-4'>
          {normalizedItems.map((item) => {
            const product = item.variant?.product || item.product;
            const image =
              product?.images?.find((img) => img.primary) ||
              product?.images?.[0];
            return product ? (
              <div
                key={item.id}
                className='flex items-center border rounded-lg p-3 bg-white'
              >
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt || product.name || 'Product'}
                    width={48}
                    height={48}
                    className='rounded-lg object-cover mr-4'
                  />
                ) : (
                  <div className='h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center mr-4'>
                    <Package className='h-6 w-6 text-gray-400' />
                  </div>
                )}
                <div className='flex-1'>
                  <div className='font-medium text-gray-900'>
                    {product.name || 'Product'}
                  </div>
                  <div className='text-xs text-gray-500'>
                    Qty: {item.quantity}
                  </div>
                  <div className='text-xs text-gray-500'>
                    Price: ${item.price.toFixed(2)}
                  </div>
                  {item.variant &&
                    (item.variant.color || item.variant.size) && (
                      <div className='text-xs text-gray-400'>
                        {item.variant.color?.name && (
                          <>Color: {item.variant.color.name} </>
                        )}
                        {item.variant.size?.name && (
                          <>Size: {item.variant.size.name}</>
                        )}
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div
                key={item.id}
                className='flex items-center border rounded-lg p-3 bg-gray-50'
              >
                <div className='h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center mr-4'>
                  <Package className='h-6 w-6 text-gray-400' />
                </div>
                <div className='flex-1'>
                  <div className='font-medium text-gray-900'>
                    Deleted Product
                  </div>
                  <div className='text-xs text-gray-500'>
                    Qty: {item.quantity}
                  </div>
                  <div className='text-xs text-gray-500'>
                    Price: ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

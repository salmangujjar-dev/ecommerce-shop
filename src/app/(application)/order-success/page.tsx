'use client';

import { useSearchParams } from 'next/navigation';

import { CheckCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@ui/button';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      toast.success('Order ID copied to clipboard!');
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='text-center'>
          <div className='flex justify-center mb-6'>
            <div className='h-16 w-16 bg-green-100 rounded-full flex items-center justify-center'>
              <CheckCircle className='h-8 w-8 text-green-600' />
            </div>
          </div>

          <h1 className='text-3xl font-bold text-gray-900 mb-4'>
            Order Placed Successfully!
          </h1>

          {orderId && (
            <div className='bg-white rounded-lg shadow p-6 mb-6'>
              <h2 className='text-lg font-medium text-gray-900 mb-3'>
                Order Confirmation
              </h2>
              <div className='flex items-center justify-center gap-3'>
                <p className='text-sm text-gray-600'>Order ID:</p>
                <code className='bg-gray-100 px-3 py-1 rounded text-sm font-mono text-gray-800'>
                  {orderId}
                </code>
                <button
                  onClick={copyOrderId}
                  className='text-gray-500 hover:text-gray-700 transition-colors'
                  title='Copy Order ID'
                >
                  <Copy className='h-4 w-4' />
                </button>
              </div>
              <p className='text-xs text-gray-500 mt-2'>
                Please save this order ID for your records
              </p>
            </div>
          )}

          <p className='text-lg text-gray-600 mb-8'>
            Thank you for your order. We've received your order and will begin
            processing it right away.
          </p>

          <div className='bg-white rounded-lg shadow p-6 mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              What happens next?
            </h2>
            <div className='space-y-3 text-left'>
              <div className='flex items-start'>
                <div className='h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                  <span className='text-xs font-medium text-blue-600'>1</span>
                </div>
                <p className='text-sm text-gray-600'>
                  You'll receive an order confirmation email shortly
                </p>
              </div>
              <div className='flex items-start'>
                <div className='h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                  <span className='text-xs font-medium text-blue-600'>2</span>
                </div>
                <p className='text-sm text-gray-600'>
                  We'll process your order and prepare it for shipping
                </p>
              </div>
              <div className='flex items-start'>
                <div className='h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                  <span className='text-xs font-medium text-blue-600'>3</span>
                </div>
                <p className='text-sm text-gray-600'>
                  You'll receive shipping updates via email
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button href='/shop' color='blue'>
              Continue Shopping
            </Button>
            <Button href='/' plain>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

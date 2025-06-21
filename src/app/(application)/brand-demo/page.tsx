import type { Metadata } from 'next';

import Logo from '@ui/logo';

export const metadata: Metadata = {
  title: 'Brand Demo | BuildAStore',
  description: 'BuildAStore brand showcase and logo',
};

const BrandDemoPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            BuildAStore Logo
          </h1>
          <p className='text-xl text-gray-600'>
            This is the official logo for the BuildAStore platform.
          </p>
        </div>

        <div className='bg-white rounded-lg shadow-sm p-8 mb-8 max-w-2xl mx-auto'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
            Primary Logo
          </h2>

          <div className='flex justify-center bg-gray-900 p-10 rounded-lg'>
            <Logo size='lg' />
          </div>
          <p className='text-sm text-gray-500 mt-4 text-center'>
            The logo is designed for use on dark backgrounds. For light
            backgrounds, a modified version may be needed.
          </p>
        </div>

        {/* Logo Sizes */}
        <div className='bg-white rounded-lg shadow-sm p-8 mb-8 max-w-2xl mx-auto'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
            Logo Sizes
          </h2>

          <div className='space-y-6'>
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <span className='text-sm font-medium text-gray-700'>
                Small (Header)
              </span>
              <Logo size='sm' />
            </div>

            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <span className='text-sm font-medium text-gray-700'>
                Medium (Footer)
              </span>
              <Logo size='md' />
            </div>

            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <span className='text-sm font-medium text-gray-700'>
                Large (Showcase)
              </span>
              <Logo size='lg' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDemoPage;

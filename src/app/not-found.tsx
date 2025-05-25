import { ArrowLeftIcon, X } from 'lucide-react';

import { Link } from '@ui/link';

const NotFound = () => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <div className='flex items-center gap-x-2 animate-bounce'>
        <h1 className='text-4xl font-bold'>Page Not Found</h1>
        <X className='w-10 h-10 text-red-500' strokeWidth={2} />
      </div>
      <p className='text-lg'>
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href='/'
        className='mt-4 flex items-center gap-x-3 text-blue-500 hover:text-blue-700'
      >
        <ArrowLeftIcon /> Go back to the home page
      </Link>
    </div>
  );
};

export default NotFound;

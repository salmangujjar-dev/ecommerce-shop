import Image from 'next/image';

import { Link } from '@ui/link';

const Hero = () => {
  return (
    <div className='relative bg-gray-900'>
      {/* Decorative image and overlay */}
      <div aria-hidden='true' className='absolute inset-0 overflow-hidden'>
        <Image
          width={0}
          height={0}
          sizes='100vw'
          alt=''
          src='https://images.unsplash.com/photo-1608739872077-21ddc15dc152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
          className='size-full object-cover'
        />
      </div>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gray-900 opacity-50'
      />

      <div className='relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0'>
        <h1 className='text-4xl font-bold tracking-tight text-white lg:text-6xl'>
          New arrivals are here
        </h1>
        <p className='mt-4 text-xl text-white'>
          The new arrivals have, well, newly arrived. Check out the latest
          options from our summer small-batch release while they're still in
          stock.
        </p>
        <Link
          href='/shop'
          className='mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100'
        >
          Shop New Arrivals
        </Link>
      </div>
    </div>
  );
};

export default Hero;

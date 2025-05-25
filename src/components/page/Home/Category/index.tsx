import Image from 'next/image';

import { FC } from 'react';

import { Link } from '@ui/link';

import { CATEGORIES } from './constant';

const Category: FC = () => {
  return (
    <section
      aria-labelledby='category-heading'
      className='pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8'
    >
      <div className='px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0'>
        <h2
          id='category-heading'
          className='text-2xl font-bold tracking-tight text-gray-900'
        >
          Shop by Category
        </h2>
        <Link
          href='#'
          className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
        >
          Browse all categories
          <span aria-hidden='true'> &rarr;</span>
        </Link>
      </div>

      <div className='mt-4 flow-root'>
        <div className='-my-2'>
          <div className='relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible'>
            <div className='absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0'>
              {CATEGORIES.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className='relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto'
                >
                  <span aria-hidden='true' className='absolute inset-0'>
                    <Image
                      alt=''
                      src={category.imageSrc}
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='size-full object-cover'
                    />
                  </span>
                  <span
                    aria-hidden='true'
                    className='absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-gray-800 opacity-50'
                  />
                  <span className='relative mt-auto text-center text-xl font-bold text-white'>
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 px-4 sm:hidden'>
        <Link
          href='#'
          className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'
        >
          Browse all categories
          <span aria-hidden='true'> &rarr;</span>
        </Link>
      </div>
    </section>
  );
};

export default Category;

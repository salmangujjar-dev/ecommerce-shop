import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { FunnelIcon, ChevronDownIcon } from 'lucide-react';

import {
  type FILTERS,
  type SORT_OPTIONS,
} from '@app/(application)/shop/[gender-category]/constant';

import { Button } from '@ui/button';
import { Link } from '@ui/link';

import { cn } from '@utils/cn';

interface FiltersProps {
  filters: typeof FILTERS;
  sortOptions: typeof SORT_OPTIONS;
  currentSort?: string;
}

const Filters = ({ filters, sortOptions, currentSort }: FiltersProps) => {
  const handleClearAll = async () => {
    // const headerList = await headers();
    // const pathname = headerList.get('x-current-pathname');

    // if (pathname) {
    //   redirect(pathname);
    // }
    console.log('wow');
  };

  return (
    <Disclosure
      as='section'
      aria-labelledby='filter-heading'
      className='grid items-center border-t border-b border-gray-200'
    >
      <h2 id='filter-heading' className='sr-only'>
        Filters
      </h2>
      <div className='relative col-start-1 row-start-1 py-4'>
        <div className='mx-auto flex max-w-7xl items-center justify-between divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8'>
          <div className='flex items-center'>
            <DisclosureButton className='group flex cursor-pointer items-center font-medium text-gray-700'>
              <FunnelIcon
                aria-hidden='true'
                className='mr-2 size-5 flex-none text-gray-400 group-hover:text-gray-500 group-hover:fill-gray-500'
              />
              2 Filters
            </DisclosureButton>
            <div className='pl-6'>
              <Button
                type='button'
                color='transparent'
                className='text-gray-500'
                onClick={handleClearAll}
              >
                Clear all
              </Button>
            </div>
          </div>
          <div className='pl-6'>
            <Menu as='div' className='relative inline-block text-left'>
              <MenuButton className='group cursor-pointer inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                Sort
                <ChevronDownIcon
                  className='-mr-1 ml-1 size-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                  aria-hidden='true'
                />
              </MenuButton>
              <MenuItems
                transition
                modal={false}
                className='cursor-pointer absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
              >
                <div className='py-1'>
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value}>
                      <Link
                        href={`?sort=${option.value}`}
                        className={cn(
                          'block px-4 py-2 text-sm',
                          currentSort === option.value
                            ? 'font-medium text-gray-900'
                            : 'text-gray-500'
                        )}
                      >
                        {option.label}
                      </Link>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <DisclosurePanel className='border-t border-gray-200 py-10'>
        <div className='mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8'>
          <div className='grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6'>
            <fieldset>
              <legend className='block font-medium'>Price</legend>
              <div className='space-y-6 pt-6 sm:space-y-4 sm:pt-4'>
                {filters.price.map((option, optionIdx) => (
                  <div key={option.value} className='flex gap-3'>
                    <div className='flex h-5 shrink-0 items-center'>
                      <div className='group grid size-4 grid-cols-1'>
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          id={`price-${optionIdx}`}
                          name='price[]'
                          type='checkbox'
                          className='col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto'
                        />
                        <svg
                          fill='none'
                          viewBox='0 0 14 14'
                          className='pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25'
                        >
                          <path
                            d='M3 8L6 11L11 3.5'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-checked:opacity-100'
                          />
                          <path
                            d='M3 7H11'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-indeterminate:opacity-100'
                          />
                        </svg>
                      </div>
                    </div>
                    <label
                      htmlFor={`price-${optionIdx}`}
                      className='text-base text-gray-600 sm:text-sm'
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className='block font-medium'>Color</legend>
              <div className='space-y-6 pt-6 sm:space-y-4 sm:pt-4'>
                {filters.color.map((option, optionIdx) => (
                  <div key={option.value} className='flex gap-3'>
                    <div className='flex h-5 shrink-0 items-center'>
                      <div className='group grid size-4 grid-cols-1'>
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          id={`color-${optionIdx}`}
                          name='color[]'
                          type='checkbox'
                          className='col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto'
                        />
                        <svg
                          fill='none'
                          viewBox='0 0 14 14'
                          className='pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25'
                        >
                          <path
                            d='M3 8L6 11L11 3.5'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-checked:opacity-100'
                          />
                          <path
                            d='M3 7H11'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-indeterminate:opacity-100'
                          />
                        </svg>
                      </div>
                    </div>
                    <label
                      htmlFor={`color-${optionIdx}`}
                      className='text-base text-gray-600 sm:text-sm'
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <div className='grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6'>
            <fieldset>
              <legend className='block font-medium'>Size</legend>
              <div className='space-y-6 pt-6 sm:space-y-4 sm:pt-4'>
                {filters.size.map((option, optionIdx) => (
                  <div key={option.value} className='flex gap-3'>
                    <div className='flex h-5 shrink-0 items-center'>
                      <div className='group grid size-4 grid-cols-1'>
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          id={`size-${optionIdx}`}
                          name='size[]'
                          type='checkbox'
                          className='col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto'
                        />
                        <svg
                          fill='none'
                          viewBox='0 0 14 14'
                          className='pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25'
                        >
                          <path
                            d='M3 8L6 11L11 3.5'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-checked:opacity-100'
                          />
                          <path
                            d='M3 7H11'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-indeterminate:opacity-100'
                          />
                        </svg>
                      </div>
                    </div>
                    <label
                      htmlFor={`size-${optionIdx}`}
                      className='text-base text-gray-600 sm:text-sm'
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className='block font-medium'>Category</legend>
              <div className='space-y-6 pt-6 sm:space-y-4 sm:pt-4'>
                {filters.category.map((option, optionIdx) => (
                  <div key={option.value} className='flex gap-3'>
                    <div className='flex h-5 shrink-0 items-center'>
                      <div className='group grid size-4 grid-cols-1'>
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          id={`category-${optionIdx}`}
                          name='category[]'
                          type='checkbox'
                          className='col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto'
                        />
                        <svg
                          fill='none'
                          viewBox='0 0 14 14'
                          className='pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25'
                        >
                          <path
                            d='M3 8L6 11L11 3.5'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-checked:opacity-100'
                          />
                          <path
                            d='M3 7H11'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-indeterminate:opacity-100'
                          />
                        </svg>
                      </div>
                    </div>
                    <label
                      htmlFor={`category-${optionIdx}`}
                      className='text-base text-gray-600 sm:text-sm'
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Filters;

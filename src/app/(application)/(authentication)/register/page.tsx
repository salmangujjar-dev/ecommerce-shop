import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@ui/button';

import { GoogleIcon } from '@assets/svgs';

const Register = () => {
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <Image
            width={0}
            height={0}
            sizes='100vw'
            alt='Your Company'
            src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
            className='mx-auto h-10 w-auto'
          />
          <h2 className='mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
            Register your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12'>
            <form action='#' method='POST' className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Full Name
                </label>
                <div className='mt-2'>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    required
                    autoComplete='name'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    autoComplete='email'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Password
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    required
                    autoComplete='current-password'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex gap-3'>
                  <div className='flex h-6 shrink-0 items-center'>
                    <div className='group grid size-4 grid-cols-1'>
                      <input
                        id='remember-me'
                        name='remember-me'
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
                    htmlFor='remember-me'
                    className='block text-sm/6 text-gray-900'
                  >
                    Remember me
                  </label>
                </div>

                <div className='text-sm/6'>
                  <Link
                    href='/forgot-password'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Register
                </Button>
              </div>
            </form>

            <div>
              <div className='relative mt-10'>
                <div
                  aria-hidden='true'
                  className='absolute inset-0 flex items-center'
                >
                  <div className='w-full border-t border-gray-200' />
                </div>
                <div className='relative flex justify-center text-sm/6 font-medium'>
                  <span className='bg-white px-6 text-gray-900'>
                    Or continue with
                  </span>
                </div>
              </div>

              <Link
                href='#'
                className='flex mt-2 w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent'
              >
                <GoogleIcon className='h-5 w-5' />
                <span className='text-sm/6 font-semibold'>Google</span>
              </Link>
            </div>
          </div>

          <p className='mt-10 text-center text-sm/6 text-gray-500'>
            Already have an account?{' '}
            <Link
              href='/register'
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

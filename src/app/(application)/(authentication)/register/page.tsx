'use client';

import Image from 'next/image';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCError } from '@trpc/server';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@ui/button';
import { Checkbox } from '@ui/checkbox';
import Spinner from '@ui/Spinner';

import { APP_NAME } from '@globals/constant';

import { GoogleIcon } from '@assets/svgs';

import { registerAction } from '../action';
import { registerSchema } from '../validation';

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = handleSubmit(
    async (data: z.infer<typeof registerSchema>) => {
      try {
        await registerAction(data);
      } catch (error) {
        const errorMessage =
          error instanceof TRPCError ? error.message : 'Something went wrong';
        toast.error(errorMessage);
        setError('root.server', {
          type: 'server',
          message: errorMessage,
        });
      }
    }
  );

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <Image
            width={0}
            height={0}
            sizes='100vw'
            alt={APP_NAME}
            src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
            className='mx-auto h-10 w-auto'
          />
          <h2 className='mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
            Register your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12'>
            <form onSubmit={onSubmit} className='space-y-6'>
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
                    type='text'
                    required
                    autoComplete='name'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    {...register('name')}
                  />
                </div>
                {errors.name?.message && (
                  <p className='text-red-500 text-sm'>{errors.name.message}</p>
                )}
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
                    type='email'
                    required
                    autoComplete='email'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    {...register('email')}
                  />
                </div>
                {errors.email?.message && (
                  <p className='text-red-500 text-sm'>{errors.email.message}</p>
                )}
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
                    type='password'
                    required
                    autoComplete='current-password'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    {...register('password')}
                  />
                </div>
                {errors.password?.message && (
                  <p className='text-red-500 text-sm'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className='flex gap-3 items-start'>
                <Checkbox
                  id='terms'
                  color='blue'
                  className='select-none mt-1'
                  defaultChecked={false}
                  {...register('terms')}
                  onChange={(checked) => {
                    setValue('terms', checked);
                  }}
                />
                <div className='flex flex-col gap-y-1'>
                  <label
                    htmlFor='terms'
                    className='block text-sm/6 text-gray-900'
                  >
                    I accept the{' '}
                    <Link
                      href='/terms'
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                    >
                      Terms & Conditions
                    </Link>
                  </label>
                  {errors.terms?.message && (
                    <p className='text-red-500 text-sm'>
                      {errors.terms.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Button
                  type='submit'
                  className='w-full flex items-center'
                  disabled={isSubmitting || isSubmitSuccessful}
                >
                  {isSubmitting && <Spinner size='sm' color='border-white' />}
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
              href='/login'
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

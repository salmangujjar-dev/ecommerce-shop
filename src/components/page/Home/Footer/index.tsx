'use client';

import { FC, useRef, useState } from 'react';

import { Button } from '@ui/button';
import { Link } from '@ui/link';
import Logo from '@ui/logo';

import { trpc } from '~trpc/client';

import { APP_NAME } from '@globals/constant';

import { FOOTER_NAVIGATION } from './constant';

const Footer: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setMessage(data.message);
      if (data.success) {
        setEmail('');
        inputRef.current?.blur();
      }
    },
    onError: (err) => {
      setMessage(err.message || 'Something went wrong.');
    },
    onSettled: () => setLoading(false),
  });

  return (
    <footer
      aria-labelledby='footer-heading'
      className='bg-gray-900 relative mt-auto w-full'
    >
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='py-20 xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='grid grid-cols-2 gap-8 xl:col-span-2'>
            {/* <div>
              <h3 className='text-sm font-medium text-white'>Shop</h3>
              <ul role='list' className='mt-6 space-y-6'>
                {FOOTER_NAVIGATION.shop.map((item) => (
                  <li key={item.name} className='text-sm'>
                    <Link
                      href={item.href}
                      className='text-gray-300 hover:text-white'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
            <div>
              <h3 className='text-sm font-medium text-white'>Company</h3>
              <ul role='list' className='mt-6 space-y-6'>
                {FOOTER_NAVIGATION.company.map((item) => (
                  <li key={item.name} className='text-sm'>
                    <Link
                      href={item.href}
                      className='text-gray-300 hover:text-white'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
            {/* <div>
              <h3 className='text-sm font-medium text-white'>Account</h3>
              <ul role='list' className='mt-6 space-y-6'>
                {FOOTER_NAVIGATION.account.map((item) => (
                  <li key={item.name} className='text-sm'>
                    <Link
                      href={item.href}
                      className='text-gray-300 hover:text-white'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
            <div>
              <h3 className='text-sm font-medium text-white'>Connect</h3>
              <ul role='list' className='mt-6 space-y-6'>
                {FOOTER_NAVIGATION.connect.map((item) => (
                  <li key={item.name} className='text-sm'>
                    <Link
                      href={item.href}
                      className='text-gray-300 hover:text-white'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='mt-12 md:mt-16 xl:mt-0'>
            <div className='mb-6'>
              <Link href='/'>
                <Logo size='md' />
              </Link>
            </div>
            <h3 className='text-sm font-medium text-white'>
              Sign up for our newsletter
            </h3>
            <p className='mt-6 text-sm text-gray-300'>
              The latest deals and savings, sent to your inbox weekly.
            </p>
            <form
              className='mt-2 flex sm:max-w-md items-center'
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                setMessage(null);
                subscribe.mutate({ email });
              }}
            >
              <input
                id='email-address'
                type='email'
                required
                autoComplete='email'
                aria-label='Email address'
                className='block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-white'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || subscribe.status === 'pending'}
                ref={inputRef}
                placeholder='you@email.com'
              />
              <div className='ml-4 shrink-0'>
                <Button
                  type='submit'
                  color='blue'
                  disabled={loading || subscribe.status === 'pending'}
                >
                  {loading || subscribe.status === 'pending'
                    ? 'Signing up...'
                    : 'Sign up'}
                </Button>
              </div>
            </form>
            {message && (
              <div
                className={`mt-2 text-sm ${
                  message.includes('Thanks') ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>

        <div className='border-t border-gray-800 py-10'>
          <p className='text-sm text-gray-400 text-center'>
            Copyright &copy; {new Date().getFullYear()} {APP_NAME}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

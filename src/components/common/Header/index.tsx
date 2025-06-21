'use client';

import Image from 'next/image';

import { FC, Fragment, useState } from 'react';

import {
  PopoverGroup,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { Menu, Search, ShoppingBagIcon } from 'lucide-react';

import { logoutAction } from '@app/(application)/(authentication)/action';

import { Avatar } from '@ui/avatar';
import { Button } from '@ui/button';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDescription,
  DropdownDivider,
  DropdownShortcut,
} from '@ui/dropdown';
import { Link } from '@ui/link';
import Logo from '@ui/logo';

import useCartStore from '@store/cart';

import { useSession } from '@lib/session/provider';

import StringUtils from '@utils/string';

import { APP_DESCRIPTION, CURRENCIES, NAVIGATION } from '@globals/constant';

import MobileNavigation from './MobileNavigation';

const Header: FC = () => {
  const { isAuthenticated, user } = useSession();

  const cartStore = useCartStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='relative bg-white'>
      <p className='flex h-10 items-center justify-center text-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
        {APP_DESCRIPTION}
      </p>

      <MobileNavigation isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />

      <nav aria-label='Top' className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='border-b border-gray-200'>
          <div className='flex h-16 items-center'>
            <Button
              type='button'
              color='transparent'
              onClick={() => setMobileMenuOpen(true)}
              className='p-2 text-gray-400 lg:hidden'
            >
              <span className='absolute -inset-0.5' />
              <span className='sr-only'>Open menu</span>
              <Menu aria-hidden='true' className='size-6 text-gray-400' />
            </Button>

            {/* Logo */}
            <div className='ml-0 flex lg:ml-0'>
              <Link href='/'>
                <span className='sr-only'>BuildAStore</span>
                <Logo size='xs' isDark />
              </Link>
            </div>

            {/* Flyout menus */}
            <PopoverGroup className='hidden lg:ml-8 lg:block lg:self-stretch'>
              <div className='flex h-full space-x-8'>
                {NAVIGATION.categories.map((category) => (
                  <Popover key={category.name} className='flex z-1'>
                    {({ close }) => (
                      <>
                        <div className='relative flex'>
                          <PopoverButton className='relative cursor-pointer focus-visible:outline-none z-1 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600'>
                            {category.name}
                          </PopoverButton>
                        </div>

                        <PopoverPanel
                          transition
                          className='absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in'
                        >
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            aria-hidden='true'
                            className='absolute inset-0 top-1/2 bg-white shadow-sm'
                          />

                          <div className='relative bg-white'>
                            <div className='mx-auto max-w-7xl px-8'>
                              <div className='grid grid-cols-2 gap-x-8 gap-y-10 py-16'>
                                <div className='col-start-2 grid grid-cols-2 gap-x-8'>
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className='group relative text-base sm:text-sm'
                                    >
                                      <Image
                                        width={0}
                                        height={0}
                                        sizes='100vw'
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className='aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75'
                                      />
                                      <Link
                                        href={item.href}
                                        onClick={close}
                                        className='mt-6 block font-medium text-gray-900'
                                      >
                                        <span
                                          aria-hidden='true'
                                          className='absolute inset-0 z-10'
                                        />
                                        {item.name}
                                      </Link>
                                      <p aria-hidden='true' className='mt-1'>
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <div className='row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm'>
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <Link
                                        id={`${section.name}-heading`}
                                        className='font-medium text-gray-900'
                                        href={section.href}
                                        onClick={close}
                                      >
                                        {section.name}
                                      </Link>
                                      <ul
                                        role='list'
                                        aria-labelledby={`${section.name}-heading`}
                                        className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                      >
                                        {section.items.map((item) => (
                                          <li key={item.name} className='flex'>
                                            <Link
                                              href={item.href}
                                              onClick={close}
                                              className='hover:text-gray-800'
                                            >
                                              {item.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </Popover>
                ))}

                {NAVIGATION.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </PopoverGroup>

            <div className='ml-auto flex items-center'>
              {!isAuthenticated && (
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <Link
                    href='/login'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Sign in
                  </Link>
                  <span aria-hidden='true' className='h-6 w-px bg-gray-200' />
                  <Link
                    href='/register'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Create account
                  </Link>
                </div>
              )}

              <div className='hidden lg:ml-8 lg:flex'>
                <Dropdown>
                  <DropdownButton
                    color='transparent'
                    className='flex items-center'
                  >
                    <Image
                      width={0}
                      height={0}
                      sizes='100vw'
                      alt={CURRENCIES[0].label}
                      src={`https://flagcdn.com/w40/${CURRENCIES[0].code}.png`}
                      className='block h-auto w-5 shrink-0 outline outline-black'
                    />
                    <span className='ml-1 block text-sm font-medium'>
                      {CURRENCIES[0].label}
                    </span>
                  </DropdownButton>
                  <DropdownMenu>
                    {CURRENCIES.map((currency) => (
                      <DropdownItem key={currency.label}>
                        <Image
                          width={0}
                          height={0}
                          sizes='100vw'
                          alt={currency.label}
                          src={`https://flagcdn.com/w40/${currency.code}.png`}
                          className='block h-auto w-5 shrink-0'
                        />
                        <span className='ml-3 block text-sm font-medium'>
                          {currency.label}
                        </span>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>

              {/* Search */}
              <div className='flex lg:ml-6'>
                <Link
                  href='#'
                  className='p-2 text-gray-400 hover:text-gray-500'
                >
                  <span className='sr-only'>Search</span>
                  <Search aria-hidden='true' className='size-6' />
                </Link>
              </div>

              {/* Cart */}
              <div className='ml-4 flow-root lg:ml-6'>
                <Link
                  href='/checkout'
                  className='group -m-2 flex items-center p-2'
                >
                  <ShoppingBagIcon
                    aria-hidden='true'
                    className='size-6 shrink-0 text-gray-400 group-hover:text-gray-500'
                  />
                  <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                    {cartStore.items.length}
                  </span>
                  <span className='sr-only'>items in cart, view bag</span>
                </Link>
              </div>

              {/* User Avatar */}
              {isAuthenticated && (
                <Dropdown>
                  <DropdownButton as={Fragment} className='ml-4'>
                    <Avatar initials={StringUtils.getInitials(user?.name)} />
                  </DropdownButton>
                  <DropdownMenu modal={false} anchor='bottom end'>
                    <DropdownItem>
                      <DropdownLabel>Profile</DropdownLabel>
                      <DropdownDescription>
                        Manage your account settings
                      </DropdownDescription>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>
                      <DropdownLabel>Settings</DropdownLabel>
                      <DropdownShortcut keys={['⌘', 'S']} />
                    </DropdownItem>
                    <DropdownItem onClick={logoutAction}>
                      <DropdownLabel>Logout</DropdownLabel>
                      <DropdownShortcut keys={['⌘', 'Q']} />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

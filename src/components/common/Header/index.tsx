"use client";

import Image from "next/image";

import { Dispatch, FC, SetStateAction } from "react";

import { CURRENCIES, NAVIGATION } from "@globals/constant";
import {
  PopoverGroup,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  CircleHelp,
  Menu,
  Search,
  ShoppingBagIcon,
} from "lucide-react";

interface HeaderProps {
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ setMobileMenuOpen }) => {
  return (
    <header className="relative z-10">
      <nav aria-label="Top">
        {/* Top navigation */}
        <div className="bg-gray-900">
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Currency selector */}
            <form>
              <div className="-ml-2 inline-grid grid-cols-1">
                <select
                  id="desktop-currency"
                  name="currency"
                  aria-label="Currency"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-900 py-0.5 pr-7 pl-2 text-left text-base font-medium text-white focus:outline-2 focus:-outline-offset-1 focus:outline-white sm:text-sm/6"
                >
                  {CURRENCIES.map((currency) => (
                    <option key={currency}>{currency}</option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end fill-gray-300"
                />
              </div>
            </form>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                Sign in
              </a>
              <a
                href="#"
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>

        {/* Secondary navigation */}
        <div className="bg-white/10 backdrop-blur-md backdrop-filter">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt=""
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                      className="h-8 w-auto"
                    />
                  </a>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {NAVIGATION.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton className="group relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                              {category.name}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out group-data-open:bg-white"
                              />
                            </PopoverButton>
                          </div>

                          <PopoverPanel
                            transition
                            className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                          >
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow-sm"
                            />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative"
                                    >
                                      <Image
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75"
                                      />
                                      <a
                                        href={item.href}
                                        className="mt-4 block font-medium text-gray-900"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 z-10"
                                        />
                                        {item.name}
                                      </a>
                                      <p aria-hidden="true" className="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ))}

                      {NAVIGATION.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-white"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </PopoverGroup>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-ml-2 p-2 text-white"
                  >
                    <span className="sr-only">Open menu</span>
                    <Menu aria-hidden="true" className="size-6" />
                  </button>

                  {/* Search */}
                  <a href="#" className="ml-2 p-2 text-white">
                    <span className="sr-only">Search</span>
                    <Search aria-hidden="true" className="size-6" />
                  </a>
                </div>

                {/* Logo (lg-) */}
                <a href="#" className="lg:hidden">
                  <span className="sr-only">Your Company</span>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                    className="h-8 w-auto"
                  />
                </a>

                <div className="flex flex-1 items-center justify-end">
                  <a
                    href="#"
                    className="hidden text-sm font-medium text-white lg:block"
                  >
                    Search
                  </a>

                  <div className="flex items-center lg:ml-8">
                    {/* Help */}
                    <a href="#" className="p-2 text-white lg:hidden">
                      <span className="sr-only">Help</span>
                      <CircleHelp aria-hidden="true" className="size-6" />
                    </a>
                    <a
                      href="#"
                      className="hidden text-sm font-medium text-white lg:block"
                    >
                      Help
                    </a>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <a href="#" className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-white"
                        />
                        <span className="ml-2 text-sm font-medium text-white">
                          0
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

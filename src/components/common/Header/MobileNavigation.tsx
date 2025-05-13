import Image from "next/image";

import { Dispatch, Fragment, SetStateAction } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { X } from "lucide-react";

import { Button } from "@ui/button";
import { Dialog } from "@ui/dialog";
import { Link } from "@ui/link";

import { NAVIGATION } from "@globals/constant";

interface IMobileNavigation {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavigation = ({ isOpen, setIsOpen }: IMobileNavigation) => {
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      isCentralized={false}
      className="relative !rounded-none flex w-full max-w-xs data-closed:!translate-y-none data-closed:data-enter:!scale-100 transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
      classNames={{ root: "relative z-40 lg:hidden" }}
    >
      <div className="flex px-4 pt-5 pb-2">
        <Button
          type="button"
          color="transparent"
          onClick={() => setIsOpen(false)}
          className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
        >
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Close menu</span>
          <X aria-hidden="true" className="size-6" />
        </Button>
      </div>

      {/* Links */}
      <TabGroup className="mt-2">
        <div className="border-b border-gray-200">
          <TabList className="-mb-px flex space-x-8 px-4">
            {NAVIGATION.categories.map((category) => (
              <Tab
                key={category.name}
                className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
              >
                {category.name}
              </Tab>
            ))}
          </TabList>
        </div>
        <TabPanels as={Fragment}>
          {NAVIGATION.categories.map((category) => (
            <TabPanel
              key={category.name}
              className="space-y-10 px-4 pt-10 pb-8"
            >
              <div className="grid grid-cols-2 gap-x-4">
                {category.featured.map((item) => (
                  <div key={item.name} className="group relative text-sm">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt={item.imageAlt}
                      src={item.imageSrc}
                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                    />
                    <Link
                      href={item.href}
                      className="mt-6 block font-medium text-gray-900"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 z-10"
                      />
                      {item.name}
                    </Link>
                    <p aria-hidden="true" className="mt-1">
                      Shop now
                    </p>
                  </div>
                ))}
              </div>
              {category.sections.map((section) => (
                <div key={section.name}>
                  <p
                    id={`${category.id}-${section.id}-heading-mobile`}
                    className="font-medium text-gray-900"
                  >
                    {section.name}
                  </p>
                  <ul
                    role="list"
                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                    className="mt-6 flex flex-col space-y-6"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <Link
                          href={item.href}
                          className="-m-2 block p-2 text-gray-500"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

      <div className="space-y-6 border-t border-gray-200 px-4 py-6">
        {NAVIGATION.pages.map((page) => (
          <div key={page.name} className="flow-root">
            <Link
              href={page.href}
              className="-m-2 block p-2 font-medium text-gray-900"
            >
              {page.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="space-y-6 border-t border-gray-200 px-4 py-6">
        <div className="flow-root">
          <Link href="#" className="-m-2 block p-2 font-medium text-gray-900">
            Sign in
          </Link>
        </div>
        <div className="flow-root">
          <Link href="#" className="-m-2 block p-2 font-medium text-gray-900">
            Create account
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6">
        <Link href="#" className="-m-2 flex items-center p-2">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            alt=""
            src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
            className="block h-auto w-5 shrink-0"
          />
          <span className="ml-3 block text-base font-medium text-gray-900">
            CAD
          </span>
          <span className="sr-only">, change currency</span>
        </Link>
      </div>
    </Dialog>
  );
};

export default MobileNavigation;

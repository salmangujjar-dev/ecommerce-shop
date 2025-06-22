import type { Metadata } from 'next';
import Image from 'next/image';

import { Briefcase, Lightbulb, Rocket, Users } from 'lucide-react';

import { Link } from '@ui/link';

export const metadata: Metadata = {
  title: 'Company | BuildAStore',
  description:
    'Learn about the mission, values, and team behind BuildAStore - the modern ecommerce platform for entrepreneurs.',
};

const stats = [
  { id: 1, name: 'Stores Powered', value: '10,000+' },
  { id: 2, name: 'Transactions/Month', value: '5 Million+' },
  { id: 3, name: 'Uptime Guarantee', value: '99.9%' },
  { id: 4, name: 'Happy Entrepreneurs', value: 'Over 9,000' },
];

const values = [
  {
    name: 'Customer Obsession',
    description:
      "We are committed to our customers' success. We build our products and services with their needs at the forefront.",
    icon: Users,
  },
  {
    name: 'Innovation at Core',
    description:
      "We thrive on creativity and ingenuity. We constantly push the boundaries of what's possible in ecommerce technology.",
    icon: Lightbulb,
  },
  {
    name: 'Empowerment Through Simplicity',
    description:
      'We believe that powerful tools should be simple to use. We design intuitive experiences that empower everyone.',
    icon: Rocket,
  },
  {
    name: 'Unwavering Integrity',
    description:
      'We operate with transparency and honesty in everything we do, building trust with our customers and partners.',
    icon: Briefcase,
  },
];

const team = [
  {
    name: 'Salman Ahmed',
    role: 'Founder & CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1740252117044-2af197eea287?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function CompanyPage() {
  return (
    <div className='bg-white'>
      <main className='isolate'>
        {/* Hero section */}
        <div className='relative isolate -z-10'>
          <svg
            className='absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]'
            aria-hidden='true'
          >
            <defs>
              <pattern
                id='1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84'
                width={200}
                height={200}
                x='50%'
                y={-1}
                patternUnits='userSpaceOnUse'
              >
                <path d='M.5 200V.5H200' fill='none' />
              </pattern>
            </defs>
            <svg x='50%' y={-1} className='overflow-visible fill-gray-50'>
              <path
                d='M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z'
                strokeWidth={0}
              />
            </svg>
            <rect
              width='100%'
              height='100%'
              strokeWidth={0}
              fill='url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)'
            />
          </svg>
          <div
            className='absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48'
            aria-hidden='true'
          >
            <div
              className='aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30'
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
            />
          </div>
          <div className='overflow-hidden'>
            <div className='mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32'>
              <div className='mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center'>
                <div className='w-full max-w-xl lg:shrink-0 xl:max-w-2xl'>
                  <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                    Powering the next generation of digital storefronts.
                  </h1>
                  <p className='relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none'>
                    Welcome to BuildAStore, where innovation meets ecommerce.
                    We're dedicated to providing entrepreneurs and businesses
                    with the tools they need to succeed in the digital
                    marketplace. Our mission is to democratize online selling,
                    making it accessible, powerful, and simple for everyone.
                  </p>
                </div>
                <div className='mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0'>
                  <div className='ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80'>
                    <div className='relative'>
                      <Image
                        src='https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
                        alt='Two business people discussing work on a laptop.'
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={750}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                  </div>
                  <div className='mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36'>
                    <div className='relative'>
                      <Image
                        src='https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
                        alt='A team collaborating around a whiteboard with sticky notes.'
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={750}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                    <div className='relative'>
                      <Image
                        src='https://images.unsplash.com/photo-1601598851547-4302969d0614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
                        alt='Students working together on laptops in a modern space.'
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={750}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                  </div>
                  <div className='w-44 flex-none space-y-8 pt-32 sm:pt-0'>
                    <div className='relative'>
                      <Image
                        src='https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
                        alt='A creative team having a discussion in a bright office.'
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={750}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                    <div className='relative'>
                      <Image
                        src='https://images.unsplash.com/photo-1606295835125-2338079fdfc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
                        alt='A small business owner packing a product for shipping.'
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                        width={500}
                        height={750}
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className='mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Our mission
            </h2>
            <div className='mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row'>
              <div className='lg:w-full lg:max-w-2xl lg:flex-auto'>
                <p className='text-xl leading-8 text-gray-600'>
                  To empower entrepreneurs and businesses of all sizes to create
                  beautiful, powerful, and scalable online stores with ease. We
                  believe that technology should be an enabler, not a barrier,
                  to success in the digital marketplace.
                </p>
                <div className='mt-10 max-w-xl text-base leading-7 text-gray-700'>
                  <p>
                    We started BuildAStore with a simple idea: to make it
                    possible for anyone to build their dream online store
                    without needing to be a developer or a designer. We saw too
                    many great ideas fail because the technical hurdles were too
                    high. Our platform is the culmination of years of research,
                    development, and a passion for helping businesses grow.
                  </p>
                  <p className='mt-10'>
                    From inventory management to secure payments and beautiful
                    storefronts, we provide a comprehensive solution that
                    handles the complexities of ecommerce, so you can focus on
                    what you do best: your products and your customers.
                  </p>
                </div>
              </div>
              <div className='lg:flex lg:flex-auto lg:justify-center'>
                <dl className='w-64 space-y-8 xl:w-80'>
                  {stats.map((stat) => (
                    <div
                      key={stat.id}
                      className='flex flex-col-reverse gap-y-4'
                    >
                      <dt className='text-base leading-7 text-gray-600'>
                        {stat.name}
                      </dt>
                      <dd className='text-5xl font-semibold tracking-tight text-gray-900'>
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className='mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Our values
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              The principles that guide our work, our partnerships, and our
              commitment to our community.
            </p>
          </div>
          <dl className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4'>
            {values.map((value) => (
              <div key={value.name}>
                <dt className='font-semibold text-gray-900 flex items-center gap-x-3'>
                  <value.icon
                    className='h-5 w-5 flex-none text-indigo-600'
                    aria-hidden='true'
                  />
                  {value.name}
                </dt>
                <dd className='mt-1 text-gray-600'>{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Team section */}
        <div className='mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Meet our team
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              The passionate individuals dedicated to building the future of
              ecommerce.
            </p>
          </div>
          <ul
            role='list'
            className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2'
          >
            {team.map((person) => (
              <li key={person.name} className='flex flex-col gap-6 xl:flex-row'>
                <Image
                  className='aspect-[4/5] w-52 flex-none rounded-2xl object-cover'
                  src={person.imageUrl}
                  alt=''
                  width={208}
                  height={260}
                />
                <div className='flex-auto'>
                  <h3 className='text-lg font-semibold leading-8 tracking-tight text-gray-900'>
                    {person.name}
                  </h3>
                  <p className='text-base leading-7 text-gray-600'>
                    {person.role}
                  </p>
                  <p className='mt-6 text-base leading-7 text-gray-600'>
                    Driven by curiosity and a passion for innovation, our team
                    member brings unique expertise and energy to every project.
                    Their dedication helps us deliver exceptional results and
                    shape the future of ecommerce together.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA section */}
        <div className='relative isolate -z-10 mt-32 sm:mt-48'>
          <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20'>
              <Image
                className='h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm'
                src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
                alt='A diverse group of colleagues celebrating success in the office.'
                width={800}
                height={800}
              />
              <div className='w-full flex-auto'>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  Join our team
                </h2>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  Ready to make an impact? We're always looking for talented
                  people to join our mission. Explore our open roles and find
                  your place at BuildAStore.
                </p>
                <div className='mt-10 flex'>
                  <Link
                    href='/careers'
                    className='inline-block rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Explore open positions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

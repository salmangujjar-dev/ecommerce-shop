import Image from 'next/image';

import { FC } from 'react';

import { PERKS } from './constant';

const Perks: FC = () => {
  return (
    <section
      aria-labelledby='perks-heading'
      className='border-t border-gray-200 bg-gray-50'
    >
      <h2 id='perks-heading' className='sr-only'>
        Our perks
      </h2>

      <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
        <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0'>
          {PERKS.map((perk) => (
            <div
              key={perk.name}
              className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'
            >
              <div className='md:shrink-0'>
                <div className='flow-root'>
                  <Image
                    width={0}
                    height={0}
                    sizes='100vw'
                    alt=''
                    src={perk.imageUrl}
                    className='mx-auto -my-1 h-24 w-auto'
                  />
                </div>
              </div>
              <div className='mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0'>
                <h3 className='text-base font-medium text-gray-900'>
                  {perk.name}
                </h3>
                <p className='mt-3 text-sm text-gray-500'>{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Perks;

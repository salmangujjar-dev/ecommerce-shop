import { ReactNode } from 'react';

import Breadcrumb from '@ui/breadcrumb';

interface CategoryLayoutProps {
  params: Promise<{ 'gender-category': string }>;
  children: ReactNode;
}

const CategoryLayout = async ({
  params,
  children,
}: Readonly<CategoryLayoutProps>) => {
  const { 'gender-category': genderWithCategory } = await params;

  const [gender, category] = genderWithCategory?.split('-') || '';

  return (
    <main className='mx-auto max-w-7xl overflow-hidden my-10 sm:px-6 lg:px-8'>
      <div className='flex flex-col items-center mb-10 gap-y-2'>
        <h1 className='text-5xl font-bold tracking-widest text-primary-900 uppercase'>
          {gender}
        </h1>
        <h2 className='font-semibold text-3xl uppercase tracking-wide text-primary-700'>
          {category ? category : ''}
        </h2>
        <Breadcrumb
          className='ml-0'
          preHref='/shop/'
          breadcrumbs={[{ name: gender, href: `${gender}` }]}
          selectedBreadcrumb={
            category
              ? {
                  name: category,
                  href: `${genderWithCategory}`,
                }
              : null
          }
        />
      </div>
      {children}
    </main>
  );
};

export default CategoryLayout;

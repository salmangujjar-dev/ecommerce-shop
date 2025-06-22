import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@ui/pagination';

import Filters from '@common/Filters';

import { api } from '~trpc/server';

import { FILTERS, SORT_OPTIONS } from './constant';
import ProductCard from './ProductCard';

interface CategoryPageProps {
  params: Promise<{ 'gender-category': string }>;
  searchParams: Promise<{
    q?: string;
    page?: string;
    limit?: string;
    sort?: string;
  }>;
}

const ProductsPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { 'gender-category': genderWithCategory } = await params;
  const [gender, category] = genderWithCategory?.split('-') || '';

  const searchParam = await searchParams;
  const queryParam = searchParam?.q;
  const pageParam = searchParam?.page ?? 1;
  const limitParam = searchParam?.limit ?? 10;
  const sortParam =
    (searchParam?.sort as
      | 'popularity'
      | 'newest'
      | 'price_asc'
      | 'price_desc'
      | 'rating') ?? 'newest';

  const {
    products,
    page: currentPage,
    totalPages,
    total,
  } = await api.products.getByFilter({
    genderSlug: gender,
    categorySlug: category,
    search: queryParam,
    page: Number(pageParam),
    limit: Number(limitParam),
    sort: sortParam,
  });

  return (
    <>
      {/* Filters */}
      <Filters
        filters={FILTERS}
        sortOptions={SORT_OPTIONS}
        currentSort={sortParam}
      />

      {/* Product grid */}
      <section
        aria-labelledby='products-heading'
        className='mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8'
      >
        <h2 id='products-heading' className='sr-only'>
          Products
        </h2>

        {products.length === 0 && (
          <h1 className='text-center mt-6 font-bold text-4xl'>
            No Products Found
          </h1>
        )}

        <div className='-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div
        aria-label='Pagination'
        className='mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8'
      >
        <Pagination className='flex-1 min-w-0'>
          <PaginationPrevious
            href={currentPage > 1 ? `?page=${currentPage - 1}` : null}
          />
          <PaginationList>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationPage
                key={page}
                href={`?page=${page}`}
                current={currentPage === page}
              >
                {page}
              </PaginationPage>
            ))}
          </PaginationList>
          <PaginationNext
            href={currentPage < totalPages ? `?page=${currentPage + 1}` : null}
          />
        </Pagination>
      </div>
      <p className='text-right min-w-0 font-semibold text-sm mt-2'>
        Total Items: {total}
      </p>
    </>
  );
};

export default ProductsPage;

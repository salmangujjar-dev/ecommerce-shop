import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@ui/pagination';

import { api } from '~trpc/server';

import ProductCard from './[gender-category]/ProductCard';
import FilterBadges from './FilterBadges';
import SearchBar from './SearchBar';
import ShopFilters from './ShopFilters';

interface ShopPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    limit?: string;
    sort?: string;
    gender?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    colors?: string;
    sizes?: string;
  }>;
}

const ShopPage = async ({ searchParams }: ShopPageProps) => {
  const searchParam = await searchParams;
  const queryParam = searchParam?.q;
  const pageParam = searchParam?.page ?? 1;
  const limitParam = searchParam?.limit ?? 12;
  const sortParam =
    (searchParam?.sort as
      | 'popularity'
      | 'newest'
      | 'price_asc'
      | 'price_desc'
      | 'rating') ?? 'newest';
  const genderParam = searchParam?.gender;
  const categoryParam = searchParam?.category;
  const minPriceParam = searchParam?.minPrice
    ? Number(searchParam.minPrice)
    : undefined;
  const maxPriceParam = searchParam?.maxPrice
    ? Number(searchParam.maxPrice)
    : undefined;
  const colorsParam = searchParam?.colors
    ? searchParam.colors.split(',')
    : undefined;
  const sizesParam = searchParam?.sizes
    ? searchParam.sizes.split(',')
    : undefined;

  // Helper function to build pagination URLs with current filters
  const buildPaginationUrl = (page: number) => {
    const params = new URLSearchParams();

    // Add current page
    params.set('page', page.toString());

    // Add current filters
    if (searchParam?.q) params.set('q', searchParam.q);
    if (searchParam?.limit) params.set('limit', searchParam.limit);
    if (searchParam?.sort) params.set('sort', searchParam.sort);
    if (searchParam?.gender) params.set('gender', searchParam.gender);
    if (searchParam?.category) params.set('category', searchParam.category);
    if (searchParam?.minPrice) params.set('minPrice', searchParam.minPrice);
    if (searchParam?.maxPrice) params.set('maxPrice', searchParam.maxPrice);
    if (searchParam?.colors) params.set('colors', searchParam.colors);
    if (searchParam?.sizes) params.set('sizes', searchParam.sizes);

    return `?${params.toString()}`;
  };

  // Fetch categories and genders for filters
  const [categories, genders] = await Promise.all([
    api.categories.getAll(),
    api.genders.getAll(),
  ]);

  // Build filter parameters
  const filterParams: {
    search?: string;
    page: number;
    limit: number;
    sort: 'popularity' | 'newest' | 'price_asc' | 'price_desc' | 'rating';
    genderSlug?: string;
    categorySlug?: string;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
  } = {
    search: queryParam,
    page: Number(pageParam),
    limit: Number(limitParam),
    sort: sortParam,
  };

  if (genderParam) {
    filterParams.genderSlug = genderParam;
  }
  if (categoryParam) {
    filterParams.categorySlug = categoryParam;
  }
  if (minPriceParam) {
    filterParams.minPrice = minPriceParam;
  }
  if (maxPriceParam) {
    filterParams.maxPrice = maxPriceParam;
  }
  if (colorsParam && colorsParam.length > 0) {
    filterParams.colors = colorsParam;
  }
  if (sizesParam && sizesParam.length > 0) {
    filterParams.sizes = sizesParam;
  }

  const {
    products,
    page: currentPage,
    totalPages,
    total,
  } = await api.products.getByFilter(filterParams);

  // Use the products directly since filtering is now done server-side
  const filteredProducts = products;

  return (
    <main className='mx-auto w-full max-w-7xl my-10 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='flex flex-col items-center mb-10 gap-y-6'>
        <h1 className='text-5xl font-bold tracking-widest text-primary-900 uppercase'>
          Shop
        </h1>
        <p className='text-lg text-gray-600 text-center max-w-2xl'>
          Discover our complete collection of premium products for everyone
        </p>
        <SearchBar
          initialQuery={queryParam}
          currentFilters={{
            gender: genderParam,
            category: categoryParam,
            minPrice: minPriceParam,
            maxPrice: maxPriceParam,
            colors: colorsParam,
            sizes: sizesParam,
            sort: sortParam,
          }}
        />
      </div>

      {/* Filters and Products Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Filters Sidebar */}
        <div className='lg:col-span-1'>
          <ShopFilters
            categories={categories}
            genders={genders}
            currentFilters={{
              gender: genderParam,
              category: categoryParam,
              minPrice: minPriceParam,
              maxPrice: maxPriceParam,
              colors: colorsParam,
              sizes: sizesParam,
              sort: sortParam,
              search: queryParam,
            }}
          />
        </div>

        {/* Products Grid */}
        <div className='lg:col-span-3'>
          {/* Results Header */}
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h2 className='text-lg font-medium text-gray-900'>
                {filteredProducts.length} of {total} products
              </h2>
              {queryParam && (
                <p className='text-sm text-gray-500'>
                  Search results for "{queryParam}"
                </p>
              )}
            </div>
          </div>

          {/* Filter Badges */}
          <FilterBadges
            currentFilters={{
              gender: genderParam,
              category: categoryParam,
              minPrice: minPriceParam,
              maxPrice: maxPriceParam,
              colors: colorsParam,
              sizes: sizesParam,
              sort: sortParam,
              search: queryParam,
            }}
            categories={categories}
            genders={genders}
          />

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className='text-center py-12'>
              <div className='mx-auto h-24 w-24 text-gray-400'>
                <svg
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-full h-full'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </div>
              <h3 className='mt-4 text-lg font-medium text-gray-900'>
                No products found
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className='-mx-px grid grid-cols-1 border-l border-gray-200 sm:mx-0 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='mt-8'>
              <div
                aria-label='Pagination'
                className='flex justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8'
              >
                <Pagination className='flex-1 min-w-0'>
                  <PaginationPrevious
                    href={
                      currentPage > 1
                        ? buildPaginationUrl(currentPage - 1)
                        : null
                    }
                  />
                  <PaginationList>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationPage
                          key={page}
                          href={buildPaginationUrl(page)}
                          current={currentPage === page}
                        >
                          {page}
                        </PaginationPage>
                      )
                    )}
                  </PaginationList>
                  <PaginationNext
                    href={
                      currentPage < totalPages
                        ? buildPaginationUrl(currentPage + 1)
                        : null
                    }
                  />
                </Pagination>
              </div>
              <p className='text-right min-w-0 font-semibold text-sm mt-2'>
                Total Items: {total}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;

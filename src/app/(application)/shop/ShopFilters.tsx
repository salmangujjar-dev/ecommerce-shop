'use client';

import Link from 'next/link';

import { useState } from 'react';

import { FunnelIcon, X, Search } from 'lucide-react';

import { Button } from '@ui/button';

interface ShopFiltersProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    subcategories?: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  }>;
  genders: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  currentFilters: {
    gender?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    sort?: string;
    search?: string;
  };
}

const PRICE_RANGES = [
  { value: '0-25', label: '$0 - $25', min: 0, max: 25 },
  { value: '25-50', label: '$25 - $50', min: 25, max: 50 },
  { value: '50-75', label: '$50 - $75', min: 50, max: 75 },
  { value: '75-100', label: '$75 - $100', min: 75, max: 100 },
  { value: '100+', label: '$100+', min: 100, max: undefined },
];

const COLORS = [
  { value: 'black', label: 'Black', color: 'bg-black' },
  { value: 'white', label: 'White', color: 'bg-white border border-gray-300' },
  { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { value: 'red', label: 'Red', color: 'bg-red-500' },
  { value: 'green', label: 'Green', color: 'bg-green-500' },
  { value: 'yellow', label: 'Yellow', color: 'bg-yellow-400' },
  { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
  { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
  { value: 'gray', label: 'Gray', color: 'bg-gray-500' },
  { value: 'brown', label: 'Brown', color: 'bg-amber-700' },
];

const SIZES = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
  { value: '2xl', label: '2XL' },
  { value: '3xl', label: '3XL' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rating' },
];

export default function ShopFilters({
  categories,
  genders,
  currentFilters,
}: ShopFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(currentFilters.search || '');

  const buildFilterUrl = (
    updates: Record<string, string | string[] | number | undefined>
  ) => {
    const params = new URLSearchParams();

    // Add current filters
    if (currentFilters.gender) params.set('gender', currentFilters.gender);
    if (currentFilters.category)
      params.set('category', currentFilters.category);
    if (currentFilters.minPrice)
      params.set('minPrice', currentFilters.minPrice.toString());
    if (currentFilters.maxPrice)
      params.set('maxPrice', currentFilters.maxPrice.toString());
    if (currentFilters.colors)
      params.set('colors', currentFilters.colors.join(','));
    if (currentFilters.sizes)
      params.set('sizes', currentFilters.sizes.join(','));
    if (currentFilters.sort) params.set('sort', currentFilters.sort);
    if (currentFilters.search) params.set('q', currentFilters.search);

    // Apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, value.toString());
      }
    });

    return `?${params.toString()}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildFilterUrl({ q: searchQuery || undefined });
    window.location.href = url;
  };

  const clearAllFilters = () => {
    return '/shop';
  };

  const activeFiltersCount = Object.values(currentFilters).filter(
    (filter) =>
      filter !== undefined && (Array.isArray(filter) ? filter.length > 0 : true)
  ).length;

  return (
    <div className='space-y-6'>
      {/* Mobile Filter Toggle */}
      <div className='lg:hidden'>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className='w-full flex items-center justify-center'
        >
          <FunnelIcon className='mr-2 h-4 w-4' />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </div>

      {/* Desktop Filters */}
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
        {/* Search */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-900 mb-3'>Search</h3>
          <form onSubmit={handleSearch} className='relative'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search products...'
              className='w-full rounded-md border border-gray-300 px-3 py-2 pl-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            />
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <button
              type='submit'
              className='absolute right-2 top-1/2 -translate-y-1/2 rounded bg-indigo-600 px-2 py-1 text-xs text-white hover:bg-indigo-700'
            >
              Search
            </button>
          </form>
        </div>

        {/* Clear All Filters */}
        {activeFiltersCount > 0 && (
          <div className='mb-6'>
            <Link
              href={clearAllFilters()}
              className='flex items-center text-sm text-gray-500 hover:text-gray-700'
            >
              <X className='mr-1 h-4 w-4' />
              Clear all filters
            </Link>
          </div>
        )}

        {/* Gender Filter */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-900 mb-3'>Gender</h3>
          <div className='space-y-2'>
            {genders.map((gender) => (
              <Link
                key={gender.id}
                href={buildFilterUrl({
                  gender:
                    currentFilters.gender === gender.slug
                      ? undefined
                      : gender.slug,
                })}
                className={`block text-sm ${
                  currentFilters.gender === gender.slug
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {gender.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-900 mb-3'>Category</h3>
          <div className='space-y-2'>
            {categories.map((category) => (
              <div key={category.id}>
                <Link
                  href={buildFilterUrl({
                    category:
                      currentFilters.category === category.slug
                        ? undefined
                        : category.slug,
                  })}
                  className={`block text-sm ${
                    currentFilters.category === category.slug
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.name}
                </Link>
                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <div className='ml-4 mt-1 space-y-1'>
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={buildFilterUrl({
                            category:
                              currentFilters.category === subcategory.slug
                                ? undefined
                                : subcategory.slug,
                          })}
                          className={`block text-sm ${
                            currentFilters.category === subcategory.slug
                              ? 'text-indigo-600 font-medium'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-900 mb-3'>
            Price Range
          </h3>
          <div className='space-y-2'>
            {PRICE_RANGES.map((range) => {
              const isSelected =
                currentFilters.minPrice === range.min &&
                currentFilters.maxPrice === range.max;

              return (
                <Link
                  key={range.value}
                  href={buildFilterUrl({
                    minPrice: isSelected ? undefined : range.min,
                    maxPrice: isSelected ? undefined : range.max,
                  })}
                  className={`block text-sm ${
                    isSelected
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Color Filter */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-900 mb-3'>Color</h3>
          <div className='space-y-2'>
            {COLORS.map((color) => {
              const isSelected = currentFilters.colors?.includes(color.value);
              const newColors = isSelected
                ? currentFilters.colors?.filter((c) => c !== color.value)
                : [...(currentFilters.colors || []), color.value];

              return (
                <Link
                  key={color.value}
                  href={buildFilterUrl({ colors: newColors })}
                  className='flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900'
                >
                  <div className={`w-4 h-4 rounded-full ${color.color}`} />
                  <span
                    className={isSelected ? 'text-indigo-600 font-medium' : ''}
                  >
                    {color.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Size Filter */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-900 mb-3'>Size</h3>
          <div className='grid grid-cols-3 gap-2'>
            {SIZES.map((size) => {
              const isSelected = currentFilters.sizes?.includes(size.value);
              const newSizes = isSelected
                ? currentFilters.sizes?.filter((s) => s !== size.value)
                : [...(currentFilters.sizes || []), size.value];

              return (
                <Link
                  key={size.value}
                  href={buildFilterUrl({ sizes: newSizes })}
                  className={`text-center py-2 px-3 text-sm border rounded-md ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sort Options */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-900 mb-3'>Sort By</h3>
          <div className='space-y-2'>
            {SORT_OPTIONS.map((option) => (
              <Link
                key={option.value}
                href={buildFilterUrl({
                  sort:
                    currentFilters.sort === option.value
                      ? undefined
                      : option.value,
                })}
                className={`block text-sm ${
                  currentFilters.sort === option.value
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

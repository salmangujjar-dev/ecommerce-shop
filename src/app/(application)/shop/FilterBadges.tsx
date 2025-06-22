'use client';

import Link from 'next/link';

import { X } from 'lucide-react';

interface FilterBadgesProps {
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
}

const PRICE_RANGES = [
  { value: '0-25', label: '$0 - $25', min: 0, max: 25 },
  { value: '25-50', label: '$25 - $50', min: 25, max: 50 },
  { value: '50-75', label: '$50 - $75', min: 50, max: 75 },
  { value: '75-100', label: '$75 - $100', min: 75, max: 100 },
  { value: '100+', label: '$100+', min: 100, max: undefined },
];

const COLORS = [
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'pink', label: 'Pink' },
  { value: 'gray', label: 'Gray' },
  { value: 'brown', label: 'Brown' },
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

export default function FilterBadges({
  currentFilters,
  categories,
  genders,
}: FilterBadgesProps) {
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

  const getActiveFilters = () => {
    const activeFilters: Array<{
      key: string;
      label: string;
      removeUrl: string;
    }> = [];

    // Search filter
    if (currentFilters.search) {
      activeFilters.push({
        key: 'search',
        label: `Search: "${currentFilters.search}"`,
        removeUrl: buildFilterUrl({ q: undefined }),
      });
    }

    // Gender filter
    if (currentFilters.gender) {
      const gender = genders.find((g) => g.slug === currentFilters.gender);
      if (gender) {
        activeFilters.push({
          key: 'gender',
          label: `Gender: ${gender.name}`,
          removeUrl: buildFilterUrl({ gender: undefined }),
        });
      }
    }

    // Category filter
    if (currentFilters.category) {
      const category = categories.find(
        (c) => c.slug === currentFilters.category
      );
      if (category) {
        activeFilters.push({
          key: 'category',
          label: `Category: ${category.name}`,
          removeUrl: buildFilterUrl({ category: undefined }),
        });
      }
    }

    // Price range filter
    if (
      currentFilters.minPrice !== undefined ||
      currentFilters.maxPrice !== undefined
    ) {
      const priceRange = PRICE_RANGES.find(
        (range) =>
          range.min === currentFilters.minPrice &&
          range.max === currentFilters.maxPrice
      );
      if (priceRange) {
        activeFilters.push({
          key: 'price',
          label: `Price: ${priceRange.label}`,
          removeUrl: buildFilterUrl({
            minPrice: undefined,
            maxPrice: undefined,
          }),
        });
      }
    }

    // Color filters
    if (currentFilters.colors && currentFilters.colors.length > 0) {
      currentFilters.colors.forEach((colorValue) => {
        const color = COLORS.find((c) => c.value === colorValue);
        if (color) {
          const newColors = currentFilters.colors?.filter(
            (c) => c !== colorValue
          );
          activeFilters.push({
            key: `color-${colorValue}`,
            label: `Color: ${color.label}`,
            removeUrl: buildFilterUrl({ colors: newColors }),
          });
        }
      });
    }

    // Size filters
    if (currentFilters.sizes && currentFilters.sizes.length > 0) {
      currentFilters.sizes.forEach((sizeValue) => {
        const size = SIZES.find((s) => s.value === sizeValue);
        if (size) {
          const newSizes = currentFilters.sizes?.filter((s) => s !== sizeValue);
          activeFilters.push({
            key: `size-${sizeValue}`,
            label: `Size: ${size.label}`,
            removeUrl: buildFilterUrl({ sizes: newSizes }),
          });
        }
      });
    }

    // Sort filter
    if (currentFilters.sort && currentFilters.sort !== 'newest') {
      const sortOption = SORT_OPTIONS.find(
        (s) => s.value === currentFilters.sort
      );
      if (sortOption) {
        activeFilters.push({
          key: 'sort',
          label: `Sort: ${sortOption.label}`,
          removeUrl: buildFilterUrl({ sort: undefined }),
        });
      }
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className='mb-6'>
      <div className='flex flex-wrap gap-2'>
        {activeFilters.map((filter) => (
          <Link
            key={filter.key}
            href={filter.removeUrl}
            className='inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 hover:bg-indigo-200 transition-colors'
          >
            <span>{filter.label}</span>
            <X className='h-3 w-3' />
          </Link>
        ))}
        <Link
          href='/shop'
          className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors'
        >
          <span>Clear all</span>
          <X className='h-3 w-3' />
        </Link>
      </div>
    </div>
  );
}

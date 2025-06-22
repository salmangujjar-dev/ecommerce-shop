'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  currentFilters: {
    gender?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    sort?: string;
  };
}

export default function SearchBar({
  initialQuery = '',
  currentFilters,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const buildSearchUrl = (query: string) => {
    const params = new URLSearchParams();

    if (query) params.set('q', query);
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

    return `?${params.toString()}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildSearchUrl(searchQuery);
    window.location.href = url;
  };

  return (
    <form onSubmit={handleSearch} className='relative w-full max-w-lg mx-auto'>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search products...'
        className='w-full rounded-full border border-gray-300 px-4 py-3 pl-12 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
      />
      <Search className='absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
      <button
        type='submit'
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-indigo-600 px-4 py-1.5 text-sm text-white hover:bg-indigo-700 transition-colors'
      >
        Search
      </button>
    </form>
  );
}

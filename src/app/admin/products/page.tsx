'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import type { Decimal } from '@prisma/client/runtime/library';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

import { trpc } from '~trpc/client';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: Decimal | number;
  rating: number;
  reviewCount: number;
  category: {
    id: string;
    name: string;
  };
  gender: {
    id: string;
    name: string;
  };
  images: Array<{
    id: string;
    src: string;
    alt: string;
    primary: boolean;
  }>;
  colors: Array<{
    color: {
      id: string;
      name: string;
    };
  }>;
  sizes: Array<{
    id: string;
    name: string;
    inStock: boolean;
  }>;
  _count: {
    reviews: number;
    orders: number;
  };
}

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const {
    data: productsData,
    isLoading,
    refetch,
  } = trpc.admin.getAllProducts.useQuery({
    page,
    limit: 10,
    search: search || undefined,
    categoryId: categoryFilter || undefined,
    genderId: genderFilter || undefined,
  });

  const { data: categories } = trpc.categories.getAll.useQuery();
  const { data: genders } = trpc.admin.getAllGenders.useQuery();

  const deleteProductMutation = trpc.admin.deleteProduct.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate({ id });
    }
  };

  const products = productsData?.products || [];
  const totalPages = productsData?.pages || 0;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Products</h1>
          <p className='text-gray-600'>Manage your product catalog</p>
        </div>
        <Link
          href='/admin/products/new'
          className='inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className='rounded-lg bg-white p-6 shadow'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search products...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          >
            <option value=''>All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className='rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          >
            <option value=''>All Genders</option>
            {genders?.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearch('');
              setCategoryFilter('');
              setGenderFilter('');
            }}
            className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className='rounded-lg bg-white shadow'>
        {isLoading ? (
          <div className='p-6 text-center'>
            <div className='text-gray-600'>Loading products...</div>
          </div>
        ) : products.length === 0 ? (
          <div className='p-6 text-center'>
            <div className='text-gray-600'>No products found</div>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Product
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Category
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Gender
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Price
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Rating
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Stock
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {products.map((product: Product) => {
                  const price =
                    typeof product.price === 'number'
                      ? product.price
                      : Number(product.price);
                  const primaryImage =
                    product.images.find((img) => img.primary) ||
                    product.images[0];
                  const inStockSizes =
                    product.sizes.length === 0
                      ? 1
                      : product.sizes.filter((size) => size.inStock).length;

                  return (
                    <tr key={product.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 h-12 w-12'>
                            {primaryImage ? (
                              <Image
                                src={primaryImage.src}
                                alt={primaryImage.alt}
                                width={48}
                                height={48}
                                className='h-12 w-12 rounded-md object-cover'
                              />
                            ) : (
                              <div className='h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center'>
                                <span className='text-xs text-gray-500'>
                                  No image
                                </span>
                              </div>
                            )}
                          </div>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              {product.name}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {product.colors.length} colors
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {product.category.name}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {product.gender.name}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        ${price.toFixed(2)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex items-center'>
                          <span className='text-yellow-400'>★</span>
                          <span className='ml-1'>
                            {product.rating.toFixed(1)}
                          </span>
                          <span className='text-gray-500 ml-1'>
                            ({product._count.reviews})
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            inStockSizes > 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {inStockSizes}/
                          {product.sizes.length === 0
                            ? 1
                            : product.sizes.length}{' '}
                          in stock
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div className='flex space-x-2'>
                          <Link
                            target='_blank'
                            href={`/product/${product.id}`}
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            <Eye className='h-4 w-4' />
                          </Link>
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className='text-blue-600 hover:text-blue-900'
                          >
                            <Edit className='h-4 w-4' />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className='text-red-600 hover:text-red-900'
                          >
                            <Trash2 className='h-4 w-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
            <div className='flex-1 flex justify-between sm:hidden'>
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Next
              </button>
            </div>
            <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
              <div>
                <p className='text-sm text-gray-700'>
                  Showing page <span className='font-medium'>{page}</span> of{' '}
                  <span className='font-medium'>{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

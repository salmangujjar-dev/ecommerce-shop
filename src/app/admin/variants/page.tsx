'use client';

import Link from 'next/link';

import { useState } from 'react';

import { Plus, Search, Edit, Trash2, Eye, Ruler, Package } from 'lucide-react';

import { trpc } from '~trpc/client';

interface Variant {
  id: string;
  product: {
    id: string;
    name: string;
    slug: string;
  };
  color: {
    id: string;
    name: string;
    bgColor: string;
  };
  size: {
    id: string;
    name: string;
  };
  price: number | null;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function VariantsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const {
    data: variantsData,
    isLoading,
    refetch,
  } = trpc.admin.getAllVariants.useQuery({
    page,
    limit: 10,
    search: search || undefined,
  });

  const deleteVariantMutation = trpc.admin.deleteVariant.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id: string) => {
    if (
      confirm(
        'Are you sure you want to delete this variant? This will remove it from the product.'
      )
    ) {
      deleteVariantMutation.mutate({ id });
    }
  };

  const variants = variantsData?.variants || [];
  const totalPages = variantsData?.pages || 0;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Product Variants</h1>
          <p className='text-gray-600'>
            Manage product variants and combinations
          </p>
        </div>
        <Link
          href='/admin/variants/new'
          className='inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Variant
        </Link>
      </div>

      {/* Filters */}
      <div className='rounded-lg bg-white p-6 shadow'>
        <div className='flex gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search variants...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <button
            onClick={() => setSearch('')}
            className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Clear
          </button>
        </div>
      </div>

      {/* Variants Table */}
      <div className='rounded-lg bg-white shadow'>
        {isLoading ? (
          <div className='p-6 text-center'>
            <div className='text-gray-600'>Loading variants...</div>
          </div>
        ) : variants.length === 0 ? (
          <div className='p-6 text-center'>
            <div className='text-gray-600'>No variants found</div>
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
                    Color
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Size
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Price
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Stock Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {variants.map((variant: Variant) => (
                  <tr key={variant.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10'>
                          <div className='h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center'>
                            <Package className='h-5 w-5 text-indigo-600' />
                          </div>
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            {variant.product.name}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {variant.product.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div
                          className='h-4 w-4 rounded-full border border-gray-200 mr-2'
                          style={{ backgroundColor: variant.color.bgColor }}
                        />
                        <div className='text-sm font-medium text-gray-900'>
                          {variant.color.name}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <Ruler className='h-4 w-4 text-gray-400 mr-2' />
                        <div className='text-sm font-medium text-gray-900'>
                          {variant.size.name}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {variant.price ? (
                        <span className='font-medium'>
                          ${variant.price.toFixed(2)}
                        </span>
                      ) : (
                        <span className='text-gray-400'>—</span>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          variant.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {variant.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <div className='flex space-x-2'>
                        <Link
                          href={`/admin/variants/${variant.id}`}
                          className='text-indigo-600 hover:text-indigo-900'
                        >
                          <Eye className='h-4 w-4' />
                        </Link>
                        <Link
                          href={`/admin/variants/${variant.id}/edit`}
                          className='text-blue-600 hover:text-blue-900'
                        >
                          <Edit className='h-4 w-4' />
                        </Link>
                        <button
                          onClick={() => handleDelete(variant.id)}
                          className='text-red-600 hover:text-red-900'
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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

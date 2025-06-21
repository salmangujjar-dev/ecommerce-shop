'use client';

import { useState, useEffect } from 'react';

import {
  Package,
  ShoppingCart,
  Users,
  FolderOpen,
  AlertTriangle,
} from 'lucide-react';

import { trpc } from '~trpc/client';

import { DashboardStats } from '../../components/admin/DashboardStats';
import { LowStockAlert } from '../../components/admin/LowStockAlert';
import { RecentOrders } from '../../components/admin/RecentOrders';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: stats, refetch } = trpc.admin.getDashboardStats.useQuery();

  useEffect(() => {
    if (stats) {
      setIsLoading(false);
    }
  }, [stats]);

  const refreshData = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
          <p className='text-gray-600'>
            Welcome to your BuildAStore admin dashboard
          </p>
        </div>
        <button
          onClick={refreshData}
          className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      {stats && <DashboardStats stats={stats} />}

      {/* Recent Activity */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Recent Orders */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-medium text-gray-900'>Recent Orders</h2>
            <ShoppingCart className='h-5 w-5 text-gray-400' />
          </div>
          <RecentOrders orders={stats?.recentOrders || []} />
        </div>

        {/* Low Stock Alert */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-medium text-gray-900'>
              Low Stock Alert
            </h2>
            <AlertTriangle className='h-5 w-5 text-yellow-500' />
          </div>
          <LowStockAlert products={stats?.lowStockProducts || []} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className='rounded-lg bg-white p-6 shadow'>
        <h2 className='mb-4 text-lg font-medium text-gray-900'>
          Quick Actions
        </h2>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          <a
            href='/admin/products/new'
            className='flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-50'
          >
            <Package className='mb-2 h-8 w-8 text-indigo-600' />
            <span className='text-sm font-medium text-gray-900'>
              Add Product
            </span>
          </a>
          <a
            href='/admin/categories/new'
            className='flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-50'
          >
            <FolderOpen className='mb-2 h-8 w-8 text-green-600' />
            <span className='text-sm font-medium text-gray-900'>
              Add Category
            </span>
          </a>
          <a
            href='/admin/orders'
            className='flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-50'
          >
            <ShoppingCart className='mb-2 h-8 w-8 text-blue-600' />
            <span className='text-sm font-medium text-gray-900'>
              View Orders
            </span>
          </a>
          <a
            href='/admin/users'
            className='flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-50'
          >
            <Users className='mb-2 h-8 w-8 text-purple-600' />
            <span className='text-sm font-medium text-gray-900'>
              Manage Users
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

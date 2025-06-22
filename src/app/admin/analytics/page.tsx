'use client';

import { useState } from 'react';

import { formatDistanceToNow } from 'date-fns';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

import { trpc } from '~trpc/client';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d, 1y

  const { data: dashboardStats, isLoading } =
    trpc.admin.getDashboardStats.useQuery();

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Loading analytics...</div>
      </div>
    );
  }

  if (!dashboardStats) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>
          Failed to load analytics data
        </div>
      </div>
    );
  }

  // Calculate some derived metrics
  const avgOrderValue =
    dashboardStats.totalOrders > 0
      ? (
          dashboardStats.recentOrders.reduce(
            (sum, order) => sum + Number(order.total),
            0
          ) / dashboardStats.recentOrders.length
        ).toFixed(2)
      : '0.00';

  const lowStockCount = dashboardStats.lowStockProducts.length;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Analytics Dashboard
          </h1>
          <p className='text-gray-600'>
            Track your store performance and insights
          </p>
        </div>

        {/* Time Range Selector */}
        <div className='flex items-center space-x-2'>
          <label className='text-sm font-medium text-gray-700'>
            Time Range:
          </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className='rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          >
            <option value='7d'>Last 7 days</option>
            <option value='30d'>Last 30 days</option>
            <option value='90d'>Last 90 days</option>
            <option value='1y'>Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Total Revenue */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='h-8 w-8 rounded-md bg-green-100 flex items-center justify-center'>
                <DollarSign className='h-5 w-5 text-green-600' />
              </div>
            </div>
            <div className='ml-4 flex-1'>
              <p className='text-sm font-medium text-gray-500'>Total Revenue</p>
              <p className='text-2xl font-bold text-gray-900'>
                $
                {dashboardStats.recentOrders
                  .reduce((sum, order) => sum + Number(order.total), 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className='flex items-center text-green-600'>
              <TrendingUp className='h-4 w-4' />
              <span className='ml-1 text-sm font-medium'>+12%</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center'>
                <ShoppingCart className='h-5 w-5 text-blue-600' />
              </div>
            </div>
            <div className='ml-4 flex-1'>
              <p className='text-sm font-medium text-gray-500'>Total Orders</p>
              <p className='text-2xl font-bold text-gray-900'>
                {dashboardStats.totalOrders}
              </p>
            </div>
            <div className='flex items-center text-blue-600'>
              <TrendingUp className='h-4 w-4' />
              <span className='ml-1 text-sm font-medium'>+8%</span>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center'>
                <Users className='h-5 w-5 text-purple-600' />
              </div>
            </div>
            <div className='ml-4 flex-1'>
              <p className='text-sm font-medium text-gray-500'>Total Users</p>
              <p className='text-2xl font-bold text-gray-900'>
                {dashboardStats.totalUsers}
              </p>
            </div>
            <div className='flex items-center text-purple-600'>
              <TrendingUp className='h-4 w-4' />
              <span className='ml-1 text-sm font-medium'>+15%</span>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='h-8 w-8 rounded-md bg-orange-100 flex items-center justify-center'>
                <Package className='h-5 w-5 text-orange-600' />
              </div>
            </div>
            <div className='ml-4 flex-1'>
              <p className='text-sm font-medium text-gray-500'>
                Total Products
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                {dashboardStats.totalProducts}
              </p>
            </div>
            <div className='flex items-center text-orange-600'>
              <TrendingUp className='h-4 w-4' />
              <span className='ml-1 text-sm font-medium'>+5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Average Order Value */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500'>
                Average Order Value
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                ${avgOrderValue}
              </p>
            </div>
            <div className='flex items-center text-green-600'>
              <ArrowUpRight className='h-4 w-4' />
              <span className='ml-1 text-sm font-medium'>+3%</span>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500'>
                Low Stock Items
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                {lowStockCount}
              </p>
            </div>
            <div className='flex items-center text-red-600'>
              <ArrowDownRight className='h-4 w-4' />
              <span className='ml-1 text-sm font-medium'>+2</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500'>
                Conversion Rate
              </p>
              <p className='text-2xl font-bold text-gray-900'>3.2%</p>
            </div>
            <div className='flex items-center text-green-600'>
              <ArrowUpRight className='h-4 w-4' />
              <span className='ml-1 text-sm font-medium'>+0.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Recent Orders */}
        <div className='rounded-lg bg-white shadow'>
          <div className='p-6 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900'>Recent Orders</h3>
            <p className='text-sm text-gray-500'>Latest customer orders</p>
          </div>
          <div className='p-6'>
            {dashboardStats.recentOrders.length === 0 ? (
              <div className='text-center py-4'>
                <ShoppingCart className='mx-auto h-8 w-8 text-gray-400' />
                <p className='mt-2 text-sm text-gray-500'>No recent orders</p>
              </div>
            ) : (
              <div className='space-y-4'>
                {dashboardStats.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center'>
                      <div className='h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center'>
                        <ShoppingCart className='h-4 w-4 text-blue-600' />
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm font-medium text-gray-900'>
                          {order.user?.name || 'Guest User'}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Order #{order.id.slice(-8)}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium text-gray-900'>
                        ${Number(order.total).toFixed(2)}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {formatDistanceToNow(new Date(order.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className='rounded-lg bg-white shadow'>
          <div className='p-6 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900'>
              Low Stock Alert
            </h3>
            <p className='text-sm text-gray-500'>
              Products running out of stock
            </p>
          </div>
          <div className='p-6'>
            {dashboardStats.lowStockProducts.length === 0 ? (
              <div className='text-center py-4'>
                <Package className='mx-auto h-8 w-8 text-gray-400' />
                <p className='mt-2 text-sm text-gray-500'>
                  All products in stock
                </p>
              </div>
            ) : (
              <div className='space-y-4'>
                {dashboardStats.lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center'>
                      <div className='h-8 w-8 rounded-md bg-orange-100 flex items-center justify-center'>
                        <Package className='h-4 w-4 text-orange-600' />
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm font-medium text-gray-900'>
                          {product.name}
                        </p>
                        <p className='text-sm text-gray-500'>
                          {product.category?.name}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium text-gray-900'>
                        ${Number(product.price).toFixed(2)}
                      </p>
                      <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                        Low Stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Sales Chart */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-medium text-gray-900'>
              Sales Overview
            </h3>
            <BarChart3 className='h-5 w-5 text-gray-400' />
          </div>
          <div className='h-64 flex items-center justify-center bg-gray-50 rounded-lg'>
            <div className='text-center'>
              <BarChart3 className='mx-auto h-12 w-12 text-gray-400' />
              <p className='mt-2 text-sm text-gray-500'>
                Sales chart will be implemented
              </p>
            </div>
          </div>
        </div>

        {/* Traffic Chart */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-medium text-gray-900'>
              Traffic Overview
            </h3>
            <Eye className='h-5 w-5 text-gray-400' />
          </div>
          <div className='h-64 flex items-center justify-center bg-gray-50 rounded-lg'>
            <div className='text-center'>
              <Eye className='mx-auto h-12 w-12 text-gray-400' />
              <p className='mt-2 text-sm text-gray-500'>
                Traffic chart will be implemented
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

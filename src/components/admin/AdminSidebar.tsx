'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  BarChart3,
  Circle,
  Home,
  Package,
  Ruler,
  ShoppingCart,
  Users,
  FolderOpen,
  Palette,
} from 'lucide-react';

import Logo from '@ui/logo';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
  { name: 'Colors', href: '/admin/colors', icon: Circle },
  { name: 'Sizes', href: '/admin/sizes', icon: Ruler },
  { name: 'Variants', href: '/admin/variants', icon: Palette },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className='flex w-64 flex-col bg-white shadow-lg'>
      {/* Logo */}
      <div className='flex my-4 h-16 items-center justify-center'>
        <Logo size='sm' isDark />
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1 px-4 py-6'>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-indigo-500' : 'text-gray-400'
                }`}
                aria-hidden='true'
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className='border-t border-gray-200 p-4'>
        <div className='text-xs text-gray-500'>
          BuildAStore Admin
          <br />
          v1.0.0
        </div>
      </div>
    </div>
  );
}

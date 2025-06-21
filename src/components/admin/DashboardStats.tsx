import { Package, ShoppingCart, Users, FolderOpen } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    totalProducts: number;
    totalCategories: number;
    totalOrders: number;
    totalUsers: number;
  };
}

const stats = [
  {
    name: 'Total Products',
    value: 'totalProducts',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Total Categories',
    value: 'totalCategories',
    icon: FolderOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Total Orders',
    value: 'totalOrders',
    icon: ShoppingCart,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Total Users',
    value: 'totalUsers',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

export function DashboardStats({ stats: statsData }: DashboardStatsProps) {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className='rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md'
          >
            <div className='flex items-center'>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}
              >
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>{stat.name}</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {statsData[
                    stat.value as keyof typeof statsData
                  ]?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

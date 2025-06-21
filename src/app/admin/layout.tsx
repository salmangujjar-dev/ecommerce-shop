import type { Metadata } from 'next';

import { AdminSidebar } from '../../components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard | BuildAStore',
  description: 'Admin dashboard for managing BuildAStore e-commerce platform.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen bg-gray-100'>
      <AdminSidebar />
      <main className='flex-1 overflow-y-auto'>
        <div className='p-6'>{children}</div>
      </main>
    </div>
  );
}

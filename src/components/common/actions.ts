'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function clearAllFilters() {
  const headerList = await headers();
  const pathname = headerList.get('x-current-pathname');

  if (pathname) {
    redirect(pathname);
  }
}

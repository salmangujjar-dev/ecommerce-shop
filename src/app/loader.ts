'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

const Loader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();
    handleStop();

    return () => {
      handleStart();
    };
  }, [pathname, searchParams]);

  return null;
};

export default Loader;

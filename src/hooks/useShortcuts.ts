import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { useSession } from '@lib/session/provider';

type Shortcut = {
  keys: (e: KeyboardEvent) => boolean;
  handleAction: (router: AppRouterInstance) => void;
};

const SHORTCUTS: Shortcut[] = [
  {
    // Command+S (Mac) or Ctrl+S (Win/Linux)
    keys: (e) => (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's',
    handleAction: (router) => {
      router.push('/settings');
    },
  },
  {
    // Command+Q (is Reserved on Chrome) so Ctrl+Q (Mac/Win/Linux)
    keys: (e) => (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'q',
    handleAction: (router) => {
      fetch('/api/logout').then(() => {
        router.push('/login');
        router.refresh();
      });
    },
  },
  {
    // Command+D (Mac) or Ctrl+D (Win/Linux)
    keys: (e) => (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd',
    handleAction: (router) => {
      router.push('/dashboard');
    },
  },
  {
    // Command+O (Mac) or Ctrl+O (Win/Linux)
    keys: (e) => (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'o',
    handleAction: (router) => {
      router.push('/orders');
    },
  },
];

const useShortcuts = () => {
  const { isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return;

    function handler(e: KeyboardEvent) {
      for (const shortcut of SHORTCUTS) {
        if (shortcut.keys(e)) {
          e.preventDefault();
          shortcut.handleAction(router);
          break;
        }
      }
    }

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isAuthenticated, router]);

  return null;
};

export default useShortcuts;

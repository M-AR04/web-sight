'use client';

import { useEffect } from 'react';
import { useSiteStore } from '@/store/siteStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSiteStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  return <>{children}</>;
}

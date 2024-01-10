'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { NavigationProgress, nprogress } from '@mantine/nprogress';

export function RouterTransition() {
  // Get path and params
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Listen to changes
  useEffect(() => {
    setTimeout(() => nprogress.complete(), 100);

    return () => {
      // Start bar
      nprogress.start();
    };
  }, [pathname, searchParams]);

  return <NavigationProgress size={5} />;
}

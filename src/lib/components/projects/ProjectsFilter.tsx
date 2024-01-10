'use client';

import { Segmented } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function ProjectsFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <Segmented
      options={[
        {
          value: 'new',
          label: 'جدید',
        },
        {
          value: 'mine',
          label: 'اختصاص یافته به من',
        },
      ]}
      onChange={(v) => {
        const params = new URLSearchParams(searchParams);
        params.set('filter', v === 'mine' ? 'mine' : 'new');
        replace(`${pathname}?${params.toString()}`);
      }}
      defaultValue={searchParams.get('filter') || 'mine'}
    />
  );
}

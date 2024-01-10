'use client';

import { payProject } from '@/lib/actions/folder';
import { Button } from '@mantine/core';
import { App } from 'antd';
import React from 'react';

export default function PayProject({ folderId }: { folderId: string }) {
  const { message } = App.useApp();
  return (
    <Button
      size='xs'
      variant='transparent'
      color='green'
      onClick={() =>
        payProject({ folderId }).then(() =>
          message.success('پرداخت با موفقیت انجام شد')
        )
      }
    >
      پرداخت هزینه
    </Button>
  );
}

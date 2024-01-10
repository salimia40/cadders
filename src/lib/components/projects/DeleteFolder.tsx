'use client';

import { deleteFolder } from '@/lib/actions/folder';
import { Button } from '@mantine/core';
import { App, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DeleteFolder({ folderId }: { folderId: string }) {
  const { message } = App.useApp();
  const router = useRouter();
  return (
    <Popconfirm
      title='آیا از حذف این پروژه اطمینان دارید؟'
      description='با حذف این پروژه تمامی اطلاعات آن از بین خواهد رفت'
      okText='بله'
      cancelText='خیر'
      onConfirm={() =>
        deleteFolder({ folderId })
          .then(() => message.success('پروژه با موفقیت حذف شد'))
          .then(() => router.replace('/myprojects'))
      }
    >
      <Button size='xs' variant='transparent' color='red'>
        حذف
      </Button>
    </Popconfirm>
  );
}

'use client';

import { returnFolder } from '@/lib/actions/folder';
import { Button } from '@mantine/core';
import { App, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ReturnFolder({ folderId }: { folderId: string }) {
  const { message } = App.useApp();
  const router = useRouter();
  return (
    <Popconfirm
      title='آیا از بازگشت دادن این پروژه اطمینان دارید؟'
      description='پس از ویرایش توسط کاربر و تایید پروژه به پنل شما برگردانده خواهد شد.'
      okText='بله'
      cancelText='خیر'
      onConfirm={() =>
        returnFolder({ folderId })
          .then(() => message.success('پروژه با موفقیت بازگشت داده شد'))
          .then(() => router.replace('/projects'))
      }
    >
      <Button size='xs' variant='transparent' color='red'>
        برگشت
      </Button>
    </Popconfirm>
  );
}

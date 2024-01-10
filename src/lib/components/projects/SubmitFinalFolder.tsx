'use client';

import { doneProject } from '@/lib/actions/folder';
import { Button, Tooltip } from '@mantine/core';
import { App, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SubmitFinalFolder({
  folderId,
  enabled,
}: {
  folderId: string;
  enabled: boolean;
}) {
  const { message } = App.useApp();
  const router = useRouter();
  return (
    <Popconfirm
      title='آیا از ثبت نهایی این پروژه اطمینان دارید؟'
      description='با ثبت این پروژه قابلیت ویرایش آن را نخواهید داشت و پروژه جهت پرداخت ارسال می شود'
      okText='بله'
      cancelText='خیر'
      onConfirm={() =>
        doneProject({ folderId })
          .then(() => message.success('پروژه با موفقیت ثبت شد شد'))
          .then(() => router.replace('/projects'))
      }
    >
      <Tooltip
        label='برای ثبت پروژه در پنل ویرایش هزینه را وارد کنید ثبت شود'
        withArrow
        disabled={enabled}
      >
        <Button
          size='xs'
          variant='transparent'
          color='green'
          disabled={!enabled}
        >
          ثبت نهایی
        </Button>
      </Tooltip>
    </Popconfirm>
  );
}

'use client';

import { submitFolder } from '@/lib/actions/folder';
import { Button, Tooltip } from '@mantine/core';
import { App, Popconfirm } from 'antd';
import React from 'react';

export default function SubmitFolder({
  folderId,
  enabled,
}: {
  folderId: string;
  enabled: boolean;
}) {
  const { message } = App.useApp();
  return (
    <Popconfirm
      title='آیا از ثبت این پروژه اطمینان دارید؟'
      description='با ثبت این پروژه قابلیت ویرایش آن را نخواهید داشت و پروژه برای کارشناسان ارسال خواهد شد.'
      okText='بله'
      cancelText='خیر'
      onConfirm={() =>
        submitFolder({ folderId }).then(() =>
          message.success('پروژه با موفقیت ثبت شد')
        )
      }
    >
      <Tooltip
        label='برای ثبت پروژه حداقل یک فایل باید ثبت شود'
        withArrow
        disabled={enabled}
      >
        <Button
          size='xs'
          variant='transparent'
          color='green'
          disabled={!enabled}
        >
          ثبت پروژه
        </Button>
      </Tooltip>
    </Popconfirm>
  );
}

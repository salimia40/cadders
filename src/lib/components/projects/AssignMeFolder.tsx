'use client';

import { assignToMe } from '@/lib/actions/folder';
import { Button } from '@mantine/core';
import { App, Popconfirm } from 'antd';
import React from 'react';

export default function AssignMeFolder({ folderId }: { folderId: string }) {
  const { message } = App.useApp();
  return (
    <Popconfirm
      title='آیا از انتخاب این پروژه اطمینان دارید؟'
      description='در صورت صرف نظر این پروژه با پشتبانی تماس بگیرید.'
      okText='بله'
      cancelText='خیر'
      onConfirm={() =>
        assignToMe({ folderId }).then(() =>
          message.success('پروژه با موفقیت ثبت شد')
        )
      }
    >
      <Button size='xs' variant='transparent' color='blue'>
        اختصاص به من
      </Button>
    </Popconfirm>
  );
}

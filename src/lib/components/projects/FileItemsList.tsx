'use client';

import { deleteFileItem } from '@/lib/actions/folder';
import { Button } from '@mantine/core';
import { FileItem, File } from '@prisma/client';
import { IconFile } from '@tabler/icons-react';
import { App, List, Popconfirm } from 'antd';
import React from 'react';
import { MessageInstance } from 'antd/es/message/interface';
import FileDrawer from './FileDrawer';

function FileItemActions({
  item,
  editable,
  agent = false,
  message,
}: {
  item: FileItem & {
    files: File[];
  };
  editable: boolean;
  agent?: boolean;
  message: MessageInstance;
}) {
  const actions: React.ReactNode[] = [];

  if (editable) {
    actions.push(
      <FileDrawer fileItem={item} folderId={item.folderId} mode='update' />
    );
    actions.push(
      <Popconfirm
        title='آیا از حذف این فایل اطمینان دارید؟'
        description='با حذف این فایل تمامی اطلاعات آن از بین خواهد رفت'
        onConfirm={() =>
          deleteFileItem({
            fileItemId: item.id,
            folderId: item.folderId,
          }).then(() => message.success('فایل با موفقیت حذف شد'))
        }
      >
        <Button variant='transparent' color='red' size='xs'>
          حذف
        </Button>
      </Popconfirm>
    );
  }

  if (agent) {
    actions.push(
      <FileDrawer fileItem={item} folderId={item.folderId} mode='agent' />
    );
  }

  return actions;
}

function FileItemsList({
  items,
  editable,
  agent = false,
}: {
  items: (FileItem & {
    files: File[];
  })[];
  editable: boolean;
  agent?: boolean;
}) {
  const { message } = App.useApp();
  return (
    <List
      itemLayout='horizontal'
      dataSource={items}
      renderItem={(item) => (
        <List.Item
          actions={FileItemActions({
            item,
            editable,
            agent,
            message,
          })}
        >
          <List.Item.Meta
            avatar={<IconFile />}
            title={item.title || 'بدون عنوان'}
            description={item.description || item.id}
          />
        </List.Item>
      )}
    />
  );
}

export default FileItemsList;

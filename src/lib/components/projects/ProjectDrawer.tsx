'use client';

import { App, Drawer } from 'antd';
import React from 'react';
import { Stack, TextInput, Textarea, Button, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconFolderPlus } from '@tabler/icons-react';
import { createFolder, updateFolder } from '@/lib/actions/folder';

function ProjectDrawer({
  folder,
  mode = 'create',
  agent = false,
}: {
  folder?: {
    id: string;
    title: string;
    description: string;
    fee: number | null;
  };
  mode?: 'create' | 'update';
  agent?: Boolean;
}) {
  const [open, { toggle }] = useDisclosure();
  const { message } = App.useApp();
  const form = useForm({
    initialValues: {
      title: folder?.title || '',
      description: folder?.description || '',
      fee: folder?.fee || 0,
    },
  });

  const handleSubmit = async () => {
    if (mode === 'update') {
      updateFolder({
        folderId: folder!.id,
        ...form.values,
      });
      message.success('پروژه با موفقیت ویرایش شد');
      toggle();
      return;
    }
    try {
      await createFolder({
        ...form.values,
      });
      message.success('پروژه با موفقیت ایجاد شد');
    } catch (error) {
      message.error('خطا در ایجاد پروژه');
    } finally {
      form.reset();
      toggle();
    }
  };

  return (
    <>
      <Drawer
        open={open}
        title={mode === 'create' ? 'ایجاد پروژه جدید' : 'ویرایش پروژه'}
        onClose={toggle}
        extra={
          <Button variant='primary' onClick={handleSubmit}>
            {mode === 'create' ? 'ایجاد پروژه' : 'ویرایش پروژه'}
          </Button>
        }
      >
        <Stack>
          <TextInput
            label='نام پروژه'
            placeholder='نام پروژه'
            variant='filled'
            {...form.getInputProps('title')}
          />
          <Textarea
            label='توضیحات'
            autosize
            minRows={5}
            variant='filled'
            placeholder='توضیحات'
            {...form.getInputProps('description')}
          />
          {agent && (
            <NumberInput
              label='هزینه پروژه'
              placeholder='هزینه پروژه'
              variant='filled'
              {...form.getInputProps('fee')}
            />
          )}
        </Stack>
      </Drawer>
      <Button
        leftSection={mode === 'create' ? <IconFolderPlus /> : undefined}
        onClick={toggle}
        size={mode === 'create' ? undefined : 'xs'}
        variant={mode === 'create' ? undefined : 'transparent'}
      >
        {mode === 'create' ? 'ایجاد پروژه' : 'ویرایش پروژه'}
      </Button>
    </>
  );
}

export default ProjectDrawer;

'use client';

import { Stack, TextInput, Textarea, Button, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { App, Drawer, Upload } from 'antd';
import React from 'react';

import type { UploadFile, UploadProps, RcFile } from 'antd/es/upload/interface';
import { IconUpload } from '@tabler/icons-react';
import { createFileItem, updateFileItem } from '@/lib/actions/folder';
import { FileItem, File } from '@prisma/client';

type FileDrawerProps = {
  folderId: string;
  mode: 'create' | 'update' | 'agent';
  fileItem?: FileItem & {
    files: File[];
  };
};

function FileDrawer({ folderId, mode, fileItem }: FileDrawerProps) {
  const [loading, setLoading] = React.useState(false);
  const [open, { toggle }] = useDisclosure(false);
  const [images, setImages] = React.useState<UploadFile[]>(() => {
    if (mode !== 'create') {
      return [
        ...fileItem!.files
          .filter((f) => f.type === 'image')
          .filter((f) => f.isInitial)
          .map((f) => ({
            uid: f.id,
            name: f.fileName!,
            status: 'done' as UploadFile['status'],
            url: `/file${f.url!}`,
          })),
      ];
    }
    return [];
  });

  const [finalImages, setFinalImages] = React.useState<UploadFile[]>(() => {
    if (mode !== 'create') {
      return [
        ...fileItem!.files
          .filter((f) => f.type === 'image')
          .filter((f) => !f.isInitial)
          .map((f) => ({
            uid: f.id,
            name: f.fileName!,
            status: 'done' as UploadFile['status'],
            url: `/file${f.url!}`,
          })),
      ];
    }
    return [];
  });

  const [cads, setCads] = React.useState<UploadFile[]>(() => {
    if (mode !== 'create') {
      return [
        ...fileItem!.files
          .filter((f) => f.type === 'cad')
          .filter((f) => f.isInitial)
          .map((f) => ({
            uid: f.id,
            name: f.fileName!,
            status: 'done' as UploadFile['status'],
            url: `/file${f.url!}`,
          })),
      ];
    }
    return [];
  });

  const [finalCads, setFinalCads] = React.useState<UploadFile[]>(() => {
    if (mode !== 'create') {
      return [
        ...fileItem!.files
          .filter((f) => f.type === 'cad')
          .filter((f) => !f.isInitial)
          .map((f) => ({
            uid: f.id,
            name: f.fileName!,
            status: 'done' as UploadFile['status'],
            url: `/file${f.url!}`,
          })),
      ];
    }
    return [];
  });

  const [imageChanged, setImageChanged] = React.useState(false);
  const [cadChanged, setCadChanged] = React.useState(false);
  const [finalImageChanged, setFinalImageChanged] = React.useState(false);
  const [finalCadChanged, setFinalCadChanged] = React.useState(false);

  const { message } = App.useApp();
  const form = useForm({
    initialValues: {
      title: fileItem?.title || '',
      description: fileItem?.description || '',
    },
  });

  const imageProps: UploadProps = {
    maxCount: 1,

    beforeUpload: (file) => {
      setImages([...images, file]);
      setImageChanged(true);
      return false;
    },
    fileList: images,
    onRemove: (file) => {
      if (mode === 'agent') return false;
      const index = images.indexOf(file);
      const newFileList = images.slice();
      newFileList.splice(index, 1);
      setImages(newFileList);
      setImageChanged(true);
      return false;
    },
    showUploadList: {
      showRemoveIcon: mode !== 'agent',
    },
  };

  const finalImageProps: UploadProps = {
    maxCount: 1,
    onRemove: (file) => {
      const index = finalImages.indexOf(file);
      const newFileList = finalImages.slice();
      newFileList.splice(index, 1);
      setFinalImages(newFileList);
      setFinalImageChanged(true);
    },
    beforeUpload: (file) => {
      setFinalImages([...finalImages, file]);
      setFinalImageChanged(true);
      return false;
    },
    fileList: finalImages,
  };

  const cadProps: UploadProps = {
    maxCount: 1,
    onRemove: (file) => {
      if (mode === 'agent') return false;
      const index = cads.indexOf(file);
      const newFileList = cads.slice();
      newFileList.splice(index, 1);
      setCadChanged(true);
      setCads(newFileList);
      return false;
    },
    beforeUpload: (file) => {
      setCads([...cads, file]);
      setCadChanged(true);
      return false;
    },
    fileList: cads,
    showUploadList: {
      showRemoveIcon: mode !== 'agent',
    },
  };

  const finalCadProps: UploadProps = {
    maxCount: 1,
    onRemove: (file) => {
      const index = finalCads.indexOf(file);
      const newFileList = finalCads.slice();
      newFileList.splice(index, 1);
      setFinalCads(newFileList);
      setFinalCadChanged(true);
    },
    beforeUpload: (file) => {
      setFinalCads([...finalCads, file]);
      setFinalCadChanged(true);
      return false;
    },
    fileList: finalCads,
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (imageChanged) formData.append('imageFile', images[0] as RcFile);
    if (cadChanged) formData.append('cadFile', cads[0] as RcFile);
    if (finalImageChanged)
      formData.append('finalImageFile', finalImages[0] as RcFile);
    if (finalCadChanged)
      formData.append('finalCadFile', finalCads[0] as RcFile);
    if (mode === 'create') {
      try {
        const res = await createFileItem(
          {
            ...form.values,
            folderId,
          },
          formData
        );
        if (!res.success) {
          message.error(res.message);
          setLoading(false);
          return;
        }
        message.success('فایل با موفقیت ایجاد شد');
        toggle();
        setLoading(false);
      } catch (error) {
        message.error('خطا در ایجاد فایل');
        setLoading(false);
      }
    } else {
      await updateFileItem(
        {
          folderId,
          fileItemId: fileItem!.id,
          title: form.values.title,
          description: form.values.description,
          imageChanged,
          cadChanged,
          finalCadChanged,
          finalImageChanged,
        },
        formData
      );
      message.success('فایل با موفقیت ویرایش شد');
      toggle();
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer
        title={mode === 'create' ? 'افزودن فایل' : 'ویرایش فایل'}
        open={open}
        onClose={toggle}
        extra={
          <Button
            variant='primary'
            onClick={handleSubmit}
            disabled={images.length === 0 || cads.length === 0 || loading}
            leftSection={loading ? <Loader type='dots' /> : undefined}
          >
            {mode === 'create' ? 'افزودن' : 'ویرایش'}
          </Button>
        }
      >
        <Stack>
          <TextInput
            label='نام فایل'
            placeholder='نام فایل'
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

          <Upload {...imageProps}>
            <Button
              variant='outline'
              c='gray'
              leftSection={<IconUpload />}
              disabled={images.length > 0}
            >
              انتخاب فایل تصویر
            </Button>
          </Upload>
          <Upload {...cadProps}>
            <Button
              variant='outline'
              c='gray'
              leftSection={<IconUpload />}
              disabled={cads.length > 0}
            >
              انتخاب فایل آتوکد
            </Button>
          </Upload>

          {mode === 'agent' && (
            <>
              <Upload {...finalImageProps}>
                <Button
                  variant='outline'
                  c='gray'
                  leftSection={<IconUpload />}
                  disabled={finalImages.length > 0}
                >
                  انتخاب فایل تصویر نهایی
                </Button>
              </Upload>
              <Upload {...finalCadProps}>
                <Button
                  variant='outline'
                  c='gray'
                  leftSection={<IconUpload />}
                  disabled={finalCads.length > 0}
                >
                  انتخاب فایل آتوکد نهایی
                </Button>
              </Upload>
            </>
          )}
        </Stack>
      </Drawer>

      <Button
        variant={mode === 'create' ? 'primary' : 'transparent'}
        onClick={toggle}
        size={mode === 'create' ? undefined : 'xs'}
      >
        {mode === 'create' ? 'افزودن فایل' : 'ویرایش'}
      </Button>
    </>
  );
}

export default FileDrawer;

import { prisma } from '@/lib/db';
import {
  getFolderStatus,
  getFolderStatusInPersian,
} from '@/lib/getFolderStatus';
import { Divider, Group, Stack, Title, Text } from '@mantine/core';
import { Descriptions, DescriptionsProps, Empty } from 'antd';
import React from 'react';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { redirect } from 'next/navigation';
import FileDrawer from '@/lib/components/projects/FileDrawer';
import FileItemsList from '@/lib/components/projects/FileItemsList';
import DeleteFolder from '@/lib/components/projects/DeleteFolder';
import SubmitFolder from '@/lib/components/projects/SubmitFolder';
import AssignMeFolder from '@/lib/components/projects/AssignMeFolder';
import ProjectDrawer from '@/lib/components/projects/ProjectDrawer';
import ReturnFolder from '@/lib/components/projects/ReturnFolder';
import SubmitFinalFolder from '@/lib/components/projects/SubmitFinalFolder';
import PayProject from '@/lib/components/projects/PayProject';

async function Page({ params }: { params: { id: string } }) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: params.id,
    },
    include: {
      fileItems: {
        include: {
          files: true,
        },
      },
    },
  });

  const user = await getCurrentUser();
  if (!user) {
    return redirect('/login');
  }

  const { role } = user;

  const items: DescriptionsProps['items'] = [
    {
      key: '0',
      label: 'شناسه پروژه',
      children: folder?.id || 'بدون شناسه',
    },
    {
      key: '1',
      label: 'نام پروژه',
      children: folder?.title || 'بدون عنوان',
    },
    {
      key: '2',
      label: 'توضیحات',
      children: folder?.description || 'بدون توضیحات',
    },
    {
      key: '3',
      label: 'تاریخ ایجاد',
      children: folder?.createAt
        ? new Date(folder?.createAt).toLocaleDateString('fa-IR')
        : 'بدون تاریخ',
    },
    {
      key: '4',
      label: 'وضعیت',
      children: getFolderStatusInPersian(folder!),
    },
    ...(folder?.fee
      ? [
          {
            key: '5',
            label: 'مبلغ',
            children: `${folder?.fee} تومان`,
          },
        ]
      : []),
  ];

  const status = getFolderStatus(folder!);

  const actions = (
    <>
      {status === 'Draft' && (
        <>
          <SubmitFolder
            folderId={folder!.id}
            enabled={folder?.fileItems.length !== 0}
          />
          <ProjectDrawer
            folder={{
              id: folder!.id,
              title: folder!.title || '',
              description: folder!.description || '',
              fee: folder!.fee || 0,
            }}
            mode='update'
          />
          <DeleteFolder folderId={folder!.id} />
        </>
      )}
      {status === 'Submitted' && (
        <>
          {role !== 'client' && <AssignMeFolder folderId={folder!.id} />}
          {role === 'client' && (
            <Text size='xs' c='green'>
              پروژه در حال بررسی است
            </Text>
          )}
        </>
      )}
      {status === 'Reviewed' && (
        <>
          {role !== 'client' && folder?.assigneeId === user.id && (
            <>
              <SubmitFinalFolder
                folderId={folder!.id}
                enabled={folder.fee ? folder.fee > 0 : false}
              />
              <ProjectDrawer
                folder={{
                  id: folder!.id,
                  title: folder!.title || '',
                  description: folder!.description || '',
                  fee: folder!.fee || 0,
                }}
                agent
                mode='update'
              />
              <ReturnFolder folderId={folder!.id} />
            </>
          )}
          {role === 'client' && (
            <Text size='xs' c='green'>
              پروژه به کارشناسان ارسال شده است
            </Text>
          )}
        </>
      )}
      {status === 'Pending Paiment' && (
        <>
          {role !== 'client' && (
            <Text size='xs' c='green'>
              پروژه در انتظار پرداخت هزینه است
            </Text>
          )}
          {role === 'client' && <PayProject folderId={folder!.id} />}
        </>
      )}
      {status === 'Finished' && (
        <>
          <Text size='xs' c='green'>
            پروژه به اتمام رسیده است
          </Text>
        </>
      )}
    </>
  );

  return (
    <Stack>
      <Descriptions
        items={items}
        title='اطلاعات پروژه'
        extra={<Group gap='xs'>{actions}</Group>}
      />
      <Divider />

      {folder?.fileItems.length === 0 ? (
        <Empty
          description='هیچ فایلی ایجاد نشده است'
          style={{ marginTop: '5rem' }}
        >
          <FileDrawer folderId={folder!.id} mode='create' />
        </Empty>
      ) : (
        <>
          <Group justify='space-between'>
            <Title order={4}>فایل های پروژه</Title>
            {status === 'Draft' && (
              <FileDrawer folderId={folder!.id} mode='create' />
            )}
          </Group>
          <FileItemsList
            items={folder!.fileItems}
            editable={status === 'Draft'}
            agent={role === 'agent' && folder?.assigneeId === user.id}
            downloadable={status === 'Finished'}
          />
        </>
      )}
    </Stack>
  );
}

export default Page;

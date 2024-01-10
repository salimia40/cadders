import { Divider, Group, Stack, Title } from '@mantine/core';
import React from 'react';
import { getCurrentUserId } from '@/lib/getCurrentUser';
import { prisma } from '@/lib/db';
import ProjectsFilter from '@/lib/components/projects/ProjectsFilter';
import { Empty } from 'antd';
import ProjectList from '@/lib/components/projects/ProjectList';

async function page({
  searchParams,
}: {
  searchParams: { filter: 'new' | 'mine' };
}) {
  const filter = searchParams.filter || 'mine';
  const userId = await getCurrentUserId();

  const folders = await prisma.folder.findMany({
    where:
      filter === 'mine'
        ? { isFinalize: true, assigneeId: userId }
        : { isFinalize: true, assigneeId: null, isClosed: false },
  });

  return (
    <Stack>
      <Group justify='space-between'>
        <Title order={2}>پروژه ها</Title>
        <ProjectsFilter />
      </Group>
      <Divider />
      {folders.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            filter === 'mine'
              ? 'هیچ پروژه ای به شما اختصاص داده نشده است'
              : 'پروژه ای پیدا نشد'
          }
          style={{ marginTop: '5rem' }}
        />
      ) : (
        <ProjectList projects={folders} />
      )}
    </Stack>
  );
}

export default page;

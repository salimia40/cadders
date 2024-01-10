'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { Empty } from 'antd';
import { redirect } from 'next/navigation';
import React from 'react';
import { Group, Stack, Title, Divider } from '@mantine/core';
import ProjectDrawer from '@/lib/components/projects/ProjectDrawer';
import ProjectList from '@/lib/components/projects/ProjectList';

async function page() {
  const user = await getCurrentUser();
  if (!user) return redirect('/login');
  const folders = await prisma.folder.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      isClosed: true,
      isFinalize: true,
      description: true,
    },
  });

  if (folders.length === 0)
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description='هنوز پروژه ای پروژه ای ایجاد نکرده اید'
        style={{ marginTop: '5rem' }}
      >
        <ProjectDrawer />
      </Empty>
    );

  return (
    <Stack>
      <Group justify='space-between'>
        <Title order={3}>پروژه های من</Title>
        <ProjectDrawer />
      </Group>
      <Divider />
      <ProjectList projects={folders} />
    </Stack>
  );
}

export default page;

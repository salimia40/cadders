import { cookies } from 'next/headers';
import React from 'react';
import { Divider, Title } from '@mantine/core';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import FoldersTable from '@/lib/components/FoldersTable';
import { getCurrentUserId } from '@/lib/getCurrentUser';

async function Page() {
    const userId = await getCurrentUserId()

    const folders = await prisma.folder.findMany({
        where: { isFinalize: true, assigneeId: userId }
    })

    return (
        <>
            <Title pb={'xl'}>
                My folders
            </Title>
            <Divider mb={'xl'} />
            <FoldersTable folders={folders} />

        </ >
    );
};

export default Page;
import { cookies } from 'next/headers';
import React from 'react';
import { Divider, Title } from '@mantine/core';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import FoldersTable from '@/lib/components/FoldersTable';

async function Page() {
    const userId = await cookies().get("loggedIn")?.value

    if (!userId) return redirect("/login")

    const folders = await prisma.folder.findMany({
        where: { isFinalize: true }
    })

    return (
        <>
            <Title >
                All folders
            </Title>
            <Divider mb={'xl'} />
            <FoldersTable folders={folders} />

        </ >
    );
};

export default Page;
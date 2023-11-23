
import { cookies } from 'next/headers';
import React from 'react';
import Button from '@/lib/components/actionButton';
import { useFormState } from 'react-dom';
import { createFolder } from '@/lib/actions/folder';
import { showNotification } from '@mantine/notifications';
import { Box, Image, List, ListItem, Stack, Text, Title } from '@mantine/core';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

async function DashboardPage() {
    const userId = await cookies().get("loggedIn")?.value

    if (!userId) return redirect("/login")

    const folders = await prisma.folder.findMany({
        where: { userId }
    })

    return (
        <Box>
            <Title >
                My folders
            </Title>
            <List>

                {
                    folders.map((folder) => <ListItem key={folder.id}>{
                        folder.id + " " + folder.createAt
                    }</ListItem>)
                }
                <ListItem></ListItem>
            </List>

        </Box>
    );
};



export default DashboardPage;

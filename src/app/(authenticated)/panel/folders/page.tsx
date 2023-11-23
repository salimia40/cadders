import { cookies } from 'next/headers';
import React from 'react';
import { Badge, Button, Card, CardSection, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { IconFolder } from "@tabler/icons-react"
import { getCurrentUserId } from '@/lib/getCurrentUser';

async function Page() {
    const userId = await getCurrentUserId()

    const folders = await prisma.folder.findMany({
        where: { userId }
    })

    return (
        <>
            <Group justify="space-between" align='center' mb='xl'>
                <Title >
                    My folders
                </Title>
                <Button component={Link} href='/panel/folders/new'>
                    Create New Folder
                </Button>
            </Group>
            <Grid grow>
                {
                    folders.map((folder) => <GridCol key={folder.id} span={3}>
                        <Card withBorder p="xl" radius="md" style={{
                            display: "flex",
                            flexDirection: 'row',
                            gap: '12px',
                            alignItems: "center"
                        }}
                            shadow="sm"
                            component={Link}
                            href={`/panel/folders/${folder.id}`}
                        >
                            <IconFolder size={'48px'} color='gray' string={2} />
                            <Stack style={{
                                flex: 1
                            }} gap={1}>
                                <Title order={5}>{folder.title ?? folder.id}</Title>

                                <Text size='sm' c='gray'>{folder.createAt.toDateString()}</Text>
                            </Stack>
                            <CardSection component={Stack} align='center'>
                                <Badge size='sm' variant='outline' py={0}
                                    color={folder.isFinalize ? 'green' : 'red'}
                                >
                                    {
                                        folder.isFinalize ? "Submited" : "Draft"
                                    }
                                </Badge>
                            </CardSection>

                        </Card>
                    </GridCol>)
                }
            </Grid>

        </>
    );
};



export default Page;

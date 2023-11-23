import { cookies } from 'next/headers';
import React from 'react';
import { Box, Container, Grid, GridCol, Stack, Text, Title, ProgressRoot, ProgressSection, ProgressLabel, Paper, Badge, Divider } from '@mantine/core';
import { prisma } from '@/lib/db';
import { IconFolder } from "@tabler/icons-react"
import FileCard from '@/lib/components/FileCard';
import FolderActions from '@/lib/components/FolderActions';

async function Page({ params }: {
    params: { id: string }
}) {
    const userId = await cookies().get("loggedIn")?.value

    const folder = await prisma.folder.findUnique({
        where: { id: params.id },
        include: {
            files: true,
            assignee: true
        }
    })
    return (
        <Container py={'xl'} fluid>
            {folder && <>
                <Paper p="xl"
                    style={{
                        display: "flex",
                        flexDirection: 'row',
                        gap: '12px'
                    }}>
                    <IconFolder size={'48px'} color='#234567' />
                    <Box style={{
                        flex: 1
                    }}>
                        <Stack>
                            <Stack gap={1}>

                                <Title order={3}>{folder.title ?? folder.id}</Title>
                                {
                                    folder.assigneeId === userId && folder.isFinalize &&
                                    <ProgressRoot size='xl'>
                                        <ProgressSection
                                            value={
                                                Math.floor((folder.files.filter((f) => f.finalDwgFile).length / folder.files.length) * 100)
                                            }
                                            color="cyan"
                                        >
                                            <ProgressLabel>
                                                {(folder.files.filter((f) => f.finalDwgFile).length.toFixed())} uploaded
                                            </ProgressLabel>
                                        </ProgressSection>
                                    </ProgressRoot>}
                                {
                                    folder.assigneeId && <Text>
                                        Assigned to:
                                        <Text component='span' px='sm' c='gray'>
                                            {folder.assignee?.firstName + " " + folder.assignee?.lastName}
                                        </Text>
                                    </Text>
                                }
                                {
                                    folder.fee && <Text>
                                        Fee:
                                        <Text component='span' px='sm' c='gray'>
                                            {folder.fee}
                                        </Text>
                                        {
                                            folder.paid ? <Badge component='span' px='sm' c='green'>
                                                Paid
                                            </Badge> : <Badge component='span' px='sm' c='red'>
                                                Not Paid
                                            </Badge>
                                        }
                                    </Text>
                                }
                                <Text>
                                    Created At:
                                    <Text component='span' px='sm' c='gray'>
                                        {
                                            folder.createAt.toDateString()
                                        }
                                    </Text>
                                </Text>
                                <Text>
                                    Status:
                                    <Text component='span' px='sm' c='gray'>
                                        {
                                            folder.isFinalize ? 'Submitted' : 'Draft'
                                        }
                                    </Text>
                                </Text>
                                <Text>
                                    Desctiption:
                                    <Text component='span' px='sm' c='gray'>
                                        {
                                            folder.description
                                        }
                                    </Text>
                                </Text>
                            </Stack>
                        </Stack>

                    </Box>
                    <FolderActions folderId={folder.id} />

                </Paper>
                <Divider />
                <Grid p={'md'}>
                    {folder.files.map((file) => <GridCol key={file.id} span={4}>
                        <FileCard file={file} paid={folder.paid} assigneeId={folder.assigneeId} isFinalized={folder.isFinalize}
                            isClosed={folder.isClosed}
                        />
                    </GridCol>
                    )}

                </Grid>
            </>
            }

        </Container>
    );
};



export default Page;

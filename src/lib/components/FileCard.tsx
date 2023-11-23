
import { Card, Image, Text, Group, Badge, Button, ButtonGroup, CardSection, Stack } from '@mantine/core'
import { File as PrismaFile } from '@prisma/client'
import { IconDownload, IconFile, IconTrash } from '@tabler/icons-react'
import React from 'react'
import UploadEditedFiles from './UploadEditedFiles'
import { getCurrentUser } from '../getCurrentUser'
import { deleteFile } from '../actions/folder'
import DeleteFile from './DeleteFile'


async function FileCard({ file, paid, assigneeId, isFinalized = false, isClosed }: {
    file: PrismaFile,
    paid: boolean,
    assigneeId: string | null,
    isFinalized: boolean,
    isClosed: boolean
}) {
    const user = await getCurrentUser()

    return (
        <Card shadow="sm" padding="0" radius="md" withBorder>
            <CardSection>
                <Image src={`/file/${file.intialJpgFile}`} alt='' height={140} />
            </CardSection>
            <Stack px={'sm'} pb={'sm'} gap={'sm'}>


                <Group justify="space-between" mt="md" mb="xs">
                    <Group gap='sm'>
                        <IconFile color='gray' />
                        <Text fz="sm" fw={500}>
                            {file.fileName ?? file.id}
                        </Text>
                    </Group>
                    <Badge color={
                        file.finalDwgFile ? "green" :
                            "pink"} variant="light" size='sm'>
                        {file.finalDwgFile ? "uploaded" : "unTouched"}
                    </Badge>
                </Group>
                <ButtonGroup>
                    <Button component='a' href={`/file/${file.intialDwgFile}`} download variant="light" color="pink" fullWidth mt="md" size='sm' radius="md" leftSection={<IconDownload size='1rem' />}>
                        Original
                    </Button>
                    {
                        !isFinalized &&
                        <DeleteFile folderId={file.folderId} fileId={file.id} />
                    }
                    {
                        user?.role === 'agent' && user.id === assigneeId && !isClosed &&
                        <UploadEditedFiles fileId={file.id} />
                    }
                    {
                        (user?.role === 'agent' || paid) &&
                        <Button component='a' href={`/file/${file.finalDwgFile}`} download variant="light" color="green" fullWidth mt="md" size='sm' radius="md" leftSection={<IconDownload size='1rem' />}>
                            Final
                        </Button>
                    }
                    {
                        user?.role === 'client' && !paid && file.finalJpgFile &&
                        <Button disabled component='a' href={`/file/${file.finalJpgFile}`} download variant="light" color="green" fullWidth mt="md" size='sm' radius="md" leftSection={<IconDownload size='1rem' />}>
                            Preview
                        </Button>
                    }
                </ButtonGroup>
            </Stack>
        </Card>
    )
}

export default FileCard
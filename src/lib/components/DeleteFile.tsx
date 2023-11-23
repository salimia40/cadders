"use client"
import { Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import { deleteFile } from '../actions/folder'

function DeleteFile(
    {
        fileId,
        folderId
    }: {
        fileId: string,
        folderId: string
    }
) {
    return (
        <Button variant="light" color='red' mt="md" size='sm' radius="md" leftSection={<IconTrash size='1rem' />} onClick={() => {
            deleteFile({
                fileId,
                folderId
            })
        }}>Delete</Button>
    )
}

export default DeleteFile
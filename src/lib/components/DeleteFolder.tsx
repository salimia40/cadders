"use client"
import { Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import { deleteFile, deleteFolder } from '../actions/folder'

function DeleteFolder(
    {
        folderId
    }: {
        folderId: string
    }
) {
    return (
        <Button size='sm' variant='subtle' color='red' leftSection={<IconTrash size='1rem' />} onClick={() => {
            deleteFolder({
                folderId
            })
        }}>Delete</Button>
    )
}

export default DeleteFolder
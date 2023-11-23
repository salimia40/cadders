import { prisma } from '@/lib/db'
import { Button, ButtonGroup } from '@mantine/core'
import { cookies } from 'next/headers'
import React from 'react'
import SubmitButton from './SubmitButton'
import Link from 'next/link'
import AssignToMe from './AssignToMe'
import DoneButton from './DoneButton'
import { getCurrentUser } from '../getCurrentUser'
import { deleteFolder, payProject } from '../actions/folder'
import DeleteFolder from './DeleteFolder'

async function FolderActions({ folderId }: {
    folderId: string
}) {
    const user = await getCurrentUser()
    if (!user?.role) return null
    const role = user?.role
    const folder = await prisma.folder.findUnique({
        where: { id: folderId },
        include: {
            assignee: true,
            files: true
        }
    })
    if (!folder) return null
    return (
        <ButtonGroup orientation='vertical' w={'8rem'}>
            {
                folder.userId === user?.id && !folder.isFinalize && <>
                    {
                        folder.files.length > 0 &&
                        <SubmitButton folderId={folderId} />
                    }
                    <Button component={Link} href={`/panel/folders/${folderId}/addfile`} size='sm' variant='subtle' color='green'>
                        Add File
                    </Button>
                    <Button component={Link} href={`/panel/folders/${folderId}/edit`} size='sm' variant='subtle' color='orange'>
                        Edit
                    </Button>
                    <DeleteFolder folderId={folderId} />
                </>
            }
            {
                role === 'agent' && folder.isFinalize && !folder.assigneeId && <>
                    <AssignToMe folderId={folderId} />
                </>
            }
            {
                role === 'agent' && folder.isFinalize && folder.assigneeId === user.id &&
                folder.files.every((f) => f.finalDwgFile) && !folder.isClosed &&
                <>
                    <DoneButton folderId={folderId} />
                </>
            }
            {
                folder.isClosed && !folder.paid &&
                <form action={payProject}> <input name='folderId' value={folderId} hidden /> <Button size='sm' variant='subtle' color='blue' type='submit'>Pay</Button></form>
            }
        </ButtonGroup>
    )
}

export default FolderActions
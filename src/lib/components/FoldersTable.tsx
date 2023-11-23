
import { getFolderStatus } from '@/lib/getFolderStatus'
import { Button, Table, TableTd, TableTh, TableTr } from '@mantine/core'
import { Folder } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

function FoldersTable(
    { folders }: {
        folders: Folder[]
    }
) {
    const rows = folders.map((folder) => <TableTr key={folder.id}>
        <TableTd>{folder.title}</TableTd>
        <TableTd>{folder.description}</TableTd>
        <TableTd>{folder.createAt.toDateString()}</TableTd>
        <TableTd>{
            getFolderStatus(folder)
        }</TableTd>
        <TableTd>
            <Button component={Link} href={`/panel/folders/${folder.id}`} size='sm' variant='subtle'>
                view
            </Button>
        </TableTd>
    </TableTr>)
    return (
        <Table>
            <TableTr>
                <TableTh>Folder Title</TableTh>
                <TableTh>Description</TableTh>
                <TableTh>Created At</TableTh>
                <TableTh>Status</TableTh>
                <TableTh>Action</TableTh>
            </TableTr>
            {rows}
        </Table>
    )
}

export default FoldersTable
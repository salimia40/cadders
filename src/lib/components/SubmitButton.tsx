"use client"
import { submitFile } from '@/lib/actions/folder';
import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'



function SubmitButton({ folderId }: {
    folderId: string
}) {

    const router = useRouter()
    const openModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        children: (
            <Text size="sm">
                This action is so important that you are required to confirm it with a modal. Please click
                one of these buttons to proceed.
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: async () => {
            const result = await submitFile({ folderId })
            if (result.success) {
                modals.closeAll()
                showNotification({
                    color: "blue",
                    message: result.message
                })
                router.refresh()
            }
        },
    });

    return (
        <Button
            onClick={openModal}
            size='sm' variant='subtle'>
            Submit
        </Button>
    )
}

export default SubmitButton
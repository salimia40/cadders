"use client"
import { doneProject, submitFile } from '@/lib/actions/folder';
import { Button, NumberInput, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'



function DoneButton({ folderId }: {
    folderId: string
}) {
    const form = useForm({
        initialValues: {
            fee: 1000
        }
    })

    const router = useRouter()
    const openModal = () => modals.open({
        title: 'Please confirm your action',
        children: (
            <form onSubmit={form.onSubmit(async ({ fee }) => {
                let res = form.validate()
                if (!res.hasErrors) {
                    modals.closeAll()
                    const result = await doneProject({ folderId, fee })
                    showNotification({
                        color: "blue",
                        message: result.message
                    })
                    router.refresh()

                }
            })}>
                <Text size="sm">
                    This action is so important that you are required to confirm it with a modal. Please click
                    one of these buttons to proceed.
                </Text>
                <Stack>
                    <NumberInput
                        label='Fee'
                        required
                        {...form.getInputProps('fee')}
                    />
                    <Button type='submit' >
                        Submit
                    </Button>
                </Stack>
            </form>
        )
    });

    return (
        <Button
            onClick={openModal}
            size='sm' variant='subtle'>
            Done
        </Button>
    )
}

export default DoneButton
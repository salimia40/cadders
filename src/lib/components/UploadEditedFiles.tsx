'use client'
import { editFile } from '@/lib/actions/folder'
import { Card, Image, Text, Group, Badge, Button, ButtonGroup, FileInput, Stack } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { modals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { File as PrismaFile } from '@prisma/client'
import { IconArtboard, IconDownload, IconFile, IconPhoto, IconUpload } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { z } from 'zod'

interface FormValues {
    cadFile: File | undefined,
    imageFile: File | undefined,
}

function UploadFile({
    fileId
}: {
    fileId: string,
}) {
    const router = useRouter()

    const form = useForm<FormValues>({
        initialValues: {
            cadFile: undefined,
            imageFile: undefined,
        },
        validate: zodResolver(
            z.object({
                cadFile: z.any().refine((file) => file instanceof File),
                imageFile: z.any().refine((file) => file instanceof File)
            })
        ),
    })


    const dispatch = useCallback(async (values: FormData) => {
        const result = await editFile(values)
        console.log(result)
        if (result?.success) {
            showNotification(
                {
                    color: "blue",
                    message: result.message
                }
            )
            form.reset()
            modals.closeAll()
        }
    }, [form])

    return (
        <form onSubmit={form.onSubmit(
            (values) => {
                // console.log(values)
                let res = form.validate()
                if (!res.hasErrors) {
                    const formdata = new FormData()
                    formdata.append("cadFile", values.cadFile!)
                    formdata.append("imageFile", values.imageFile!)
                    formdata.append("fileId", fileId)
                    dispatch(formdata)
                    router.refresh()
                }
            }
        )}>
            <Stack>

                <FileInput
                    leftSection={<IconArtboard />}
                    label="Cad File"
                    name="cad-file"
                    required
                    clearable
                    {...form.getInputProps('cadFile')}
                />
                <FileInput
                    leftSection={<IconPhoto />}
                    label="Image File"
                    name="image-file"
                    required
                    clearable
                    {...form.getInputProps('imageFile')}
                />
                <Button
                    type='submit'
                >Upload</Button>
            </Stack>
        </form>
    )
}



function UploadEditedFiles({
    fileId
}: {
    fileId: string
}) {
    const uploadFile = () => {
        modals.open({
            title: "Upload a new file",
            children: (<>
                <UploadFile fileId={fileId} />
            </>)
        })
    }

    return (
        <Button variant="light" color="blue" fullWidth mt="md" size='sm' radius="md" leftSection={<IconUpload size='1rem' />}
            onClick={uploadFile}
        >
            Edited Files
        </Button>
    )
}

export default UploadEditedFiles
"use client"
import React, { useCallback } from 'react';
import { addFile } from '@/lib/actions/folder';
import { showNotification } from '@mantine/notifications';
import { Button, Container, FileInput, Group, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconArtboard, IconPhoto } from '@tabler/icons-react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

interface FormValues {
    cadFile: File | undefined,
    imageFile: File | undefined,
    name: string
}

function Page(
    { params }: {
        params: { id: string }
    }
) {

    const router = useRouter()

    const form = useForm<FormValues>({
        validateInputOnChange: true,
        initialValues: {
            cadFile: undefined,
            imageFile: undefined,
            name: ""
        },
        validate: zodResolver(
            z.object({
                cadFile: z.any().refine((file) => file instanceof File),
                imageFile: z.any().refine((file) => file instanceof File),
                name: z.string().min(3)
            })
        ),
    })


    const dispatch = useCallback(async (values: FormData) => {
        const result = await addFile(undefined, values)
        console.log(result)
        if (result?.success) {
            showNotification(
                {
                    color: "blue",
                    message: result.message
                }
            )
            if (result.continue) router.refresh()
            else
                router.push(`/panel/folders/${params.id}`)

        }
    }, [params, router])

    return (
        <Container>
            <form
                className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Adding New File</h1>
                <Stack className="w64">
                    <TextInput

                        label="File Title"
                        name="title"
                        required
                        {...form.getInputProps('name')} />
                    <FileInput
                        leftSection={<IconArtboard />}
                        label="Cad File"
                        name="cad-file"
                        required
                        clearable
                        accept='.dwg'
                        {...form.getInputProps('cadFile')}
                    />
                    <FileInput
                        leftSection={<IconPhoto />}
                        label="Image File"
                        name="image-file"
                        required
                        accept='.jpg, .jpeg, .png'
                        clearable
                        {...form.getInputProps('imageFile')}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button
                            onClick={() => {
                                form.onSubmit(
                                    (values) => {
                                        let res = form.validate()
                                        if (!res.hasErrors) {
                                            const formdata = new FormData()
                                            formdata.append("cadFile", values.cadFile!)
                                            formdata.append("imageFile", values.imageFile!)
                                            formdata.append("name", values.name)
                                            formdata.append("folderId", params.id)
                                            formdata.append("continue", 'false')
                                            dispatch(formdata)
                                        }
                                    }
                                )()
                            }}
                        >Submit</Button>
                        <Button
                            onClick={() => {
                                form.onSubmit(
                                    (values) => {
                                        let res = form.validate()
                                        if (!res.hasErrors) {
                                            const formdata = new FormData()
                                            formdata.append("cadFile", values.cadFile!)
                                            formdata.append("imageFile", values.imageFile!)
                                            formdata.append("name", values.name)
                                            formdata.append("folderId", params.id)
                                            formdata.append("continue", 'true')
                                            dispatch(formdata)
                                        }
                                    }
                                )()
                            }}
                        >Submit and continue</Button>
                    </Group>
                </Stack>
            </form>
        </Container>

    );
};



export default Page;

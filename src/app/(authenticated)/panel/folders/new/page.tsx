"use client"
import React, { use, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { createFolder } from '@/lib/actions/folder';
import { showNotification } from '@mantine/notifications';
import { Container, Group, Stack, TextInput, Textarea, Button } from '@mantine/core';
import { redirect } from 'next/navigation';
import { useForm } from '@mantine/form';

function DashboardPage() {

    const [result, dispatch] = useFormState(createFolder, undefined);
    const formRef = useRef<HTMLFormElement>(null)
    const form = useForm({
        initialValues: {
            title: "",
            description: ""
        }
    })

    useEffect(
        () => {

            if (result?.success) {
                showNotification(
                    {
                        color: "blue",
                        message: result.message
                    }
                )
                formRef.current?.reset()
                redirect(`/panel/folders/${result.id}/addfile`)
            }
            else {
                if (result?.message)
                    showNotification(
                        {
                            color: "red",
                            message: result?.message
                        }
                    )
            }
        },
        [result]
    )

    return (
        <Container>
            <form ref={formRef}
                onSubmit={
                    (e) => {
                        e.preventDefault()
                        dispatch(form.values)
                    }
                }
                className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">New Folder</h1>
                <Stack className="w64">
                    <TextInput

                        label="Folder Title"

                        name='title'
                        id='title'
                        placeholder={`Enter folder title...`}
                        required
                        {...form.getInputProps('title')}
                    />
                    <Textarea
                        label="Folder Description"
                        name='description'
                        id='description'
                        placeholder={`Enter folder description...`}
                        required
                        {...form.getInputProps('description')}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </Stack>
            </form>
        </Container>

    );
};



export default DashboardPage;

'use client';

import { upperFirst } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Group,
    Button,
    Anchor,
    Stack,
} from '@mantine/core';


import React from 'react'
import Link from 'next/link';
import { z } from 'zod';
import { authenticate, resetPasswordRequest } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';

export default function Page() {
    const router = useRouter()

    const type = 'reset'
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            nationalId: '',

        },
        validate: zodResolver(z.object({
            nationalId: z.string().length(10).regex(/^[0-9]+/ig),
        }))
    })

    return (
        <>
            <Text size="lg" fw={500}>
                Welcome to Cadders, Reset password
            </Text>

            <form onSubmit={form.onSubmit(async (values) => {
                let res = form.validate()
                if (!res.hasErrors) {
                    const result = await resetPasswordRequest(values.nationalId)
                    if (!result.success) {
                        showNotification({
                            message: result.message,
                            color: 'red'

                        })
                    } else {

                        showNotification({
                            message: 'verification code sent:' + result.token?.slice(10)
                        })
                        router.replace('/resetpassword/code')
                    }
                }
            })}>
                <Stack>

                    <TextInput
                        required
                        label="National ID"
                        placeholder="Your national ID"
                        value={form.values.nationalId}
                        onChange={(event) => form.setFieldValue('nationalId', event.currentTarget.value)}
                        error={form.errors.nationalId && 'Invalid national ID'}
                        radius="md"
                    />

                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component={Link} type="button" c="dimmed" size="xs" href={'/login'}>
                        {"Now remembering? login"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst("send code")}
                    </Button>
                </Group>
            </form>
        </>
    )
}
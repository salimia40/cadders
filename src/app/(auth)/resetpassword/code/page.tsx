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
    Input,
    PinInput,
} from '@mantine/core';


import React from 'react'
import Link from 'next/link';
import { z } from 'zod';
import { resetPassword } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';

export default function Page() {
    const router = useRouter()

    const type = 'login'
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            nationalId: '',
            password: '',
            code: ''
        },
        validate: zodResolver(z.object({
            nationalId: z.string().length(10).regex(/^[0-9]+/ig),
            code: z.string().length(6).regex(/^[0-9]+/ig, {
                message: 'Code should be 6 digits'
            }),
            password: z.string().min(6)
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
                    const result = await resetPassword(values.nationalId, values.code, values.password)
                    if (!result.success) {
                        showNotification({
                            message: result.message,
                            color: 'red'

                        })
                    } else {

                        showNotification({
                            message: 'password changed!'
                        })
                        router.replace('/')
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
                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Invalid password'}
                        radius="md"
                    />
                    <Input.Wrapper
                        label="Code"
                        required
                        error={form.errors.code && 'Code should be 6 digits'}

                    >
                        <Group justify='center'>

                            <PinInput
                                error={form.errors.code}
                                length={6}
                                {...form.getInputProps('code')}
                                radius="md"
                                oneTimeCode

                            />
                        </Group>
                    </Input.Wrapper>

                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component={Link} type="button" c="dimmed" size="xs" href={'/login'}>
                        {"Now remembering? login"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst('reset password')}
                    </Button>
                </Group>
            </form>
        </>
    )
}
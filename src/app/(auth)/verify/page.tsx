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
    PinInput,
    Input,
} from '@mantine/core';


import React, { useCallback } from 'react'
import Link from 'next/link';
import { z } from 'zod';
import { authenticate, generateToken, verifyPhone } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';
import { verify } from 'crypto';

export default function Page() {
    const router = useRouter()

    const type = 'verify'
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            code: '',
        },
        validate: zodResolver(z.object({
            code: z.string().length(6).regex(/^[0-9]+/ig, {
                message: 'Code should be 6 digits'
            })
        }))
    })

    const getToken = useCallback(async () => {
        const tokenRes = await generateToken()
        if (tokenRes.success) {
            showNotification({
                title: "Token Created",
                message: 'Token generated successfully: ' + tokenRes.token,
                autoClose: false
            })
        }
    }, [])

    return (
        <>
            <Text size="lg" fw={500}>
                Welcome to Cadders, Verify your phone number
            </Text>

            <form onSubmit={form.onSubmit(async (values) => {
                let res = form.validate()
                if (!res.hasErrors) {
                    const result = await verifyPhone(values)
                    if (!result.success) {
                        showNotification({
                            message: result.message,
                            color: 'red'
                        })
                    } else {
                        showNotification({
                            message: "wellcome!"
                        })
                        router.replace('/')
                    }
                }
            })}>
                <Stack>
                    <Text size="sm" fw={500}>
                        Enter the code we sent to your phone number
                    </Text>

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
                    <Anchor component='button' type="button" c="dimmed" size="xs" onClick={getToken} >
                        {"Have't recieved code yet? send again"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </>
    )
}
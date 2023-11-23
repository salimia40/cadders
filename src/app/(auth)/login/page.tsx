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
import { authenticate } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';

export default function Page() {
  const router = useRouter()

  const type = 'login'
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nationalId: '',
      password: ''
    },
    validate: zodResolver(z.object({
      nationalId: z.string().length(10).regex(/^[0-9]+/ig),
      password: z.string().min(6)
    }))
  })

  return (
    <>
      <Text size="lg" fw={500}>
        Welcome to Cadders, {type} with
      </Text>

      <form onSubmit={form.onSubmit(async (values) => {
        let res = form.validate()
        if (!res.hasErrors) {
          const result = await authenticate(values)
          if (!result.success) {
            if (result.nationalId) form.setFieldError('nationalId', result.nationalId)
            if (result.password) form.setFieldError('password', result.password)
          } else {

            showNotification({
              message: "wellcome!"
            })
            if (!result.verified) router.replace('/verify')
            else router.replace('/')
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
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
            description={
              <Anchor component={Link} type="button" c="dimmed" size="xs" href={'/resetpassword'}>
                {"Forgot password? click here"}
              </Anchor>
            }
          />

        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component={Link} type="button" c="dimmed" size="xs" href={'/register'}>
            {"Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </>
  )
}
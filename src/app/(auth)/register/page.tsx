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
  Checkbox,
} from '@mantine/core';


import React from 'react'
import Link from 'next/link';
import { z } from 'zod';
import { register } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';

export default function Page() {
  const router = useRouter()

  const type = 'register'
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nationalId: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      acceptTerms: false
    },
    validate: zodResolver(z.object({
      nationalId: z.string().length(10).regex(/^[0-9]+/ig),
      password: z.string().min(6),
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      phoneNumber: z.string().regex(/^09[0-9]{9}$/),
      acceptTerms: z.boolean().refine(val => val === true, { message: 'You should accept terms' })
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
          const result = await register({
            nationalId: values.nationalId,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber
          })
          if (!result.success) {
            if (result.nationalId) form.setFieldError('nationalId', result.nationalId)
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
            label="First Name"
            placeholder="Your first name"
            value={form.values.firstName}
            onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
            error={form.errors.firstName && 'Invalid first name'}
            radius="md"
          />

          <TextInput
            required
            label="Last Name"
            placeholder="Your last name"
            value={form.values.lastName}
            onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
            error={form.errors.lastName && 'Invalid last name'}
            radius="md"
          />


          <TextInput
            required
            label="National ID"
            placeholder="Your national ID"
            {...form.getInputProps('nationalId')}
            radius="md"
          />

          <TextInput
            required
            label="Phone Number"
            placeholder="Your phone number"
            value={form.values.phoneNumber}
            onChange={(event) => form.setFieldValue('phoneNumber', event.currentTarget.value)}
            error={form.errors.phoneNumber && 'Invalid phone number'}
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
          />

          <Checkbox
            required
            label="I accept terms and conditions"
            {...form.getInputProps('acceptTerms')}
            radius="md"
          />

        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component={Link} type="button" c="dimmed" size="xs" href={'/login'}>
            {'Already have an account? Login'}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </>
  )
}
'use client';

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

import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { resetPassword } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';

export default function Page() {
  const router = useRouter();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nationalId: '',
      password: '',
      code: '',
    },
    validate: zodResolver(
      z.object({
        nationalId: z
          .string()
          .length(10)
          .regex(/^[0-9]+/gi),
        code: z
          .string()
          .length(6)
          .regex(/^[0-9]+/gi, {
            message: 'Code should be 6 digits',
          }),
        password: z.string().min(6),
      })
    ),
  });

  return (
    <>
      <Text size='lg' fw={500}>
        Welcome to Cadders, Reset password
      </Text>

      <form
        onSubmit={form.onSubmit(async (values) => {
          const res = form.validate();
          if (!res.hasErrors) {
            const result = await resetPassword(
              values.nationalId,
              values.code,
              values.password
            );
            if (!result.success) {
              showNotification({
                message: result.message,
                color: 'red',
              });
            } else {
              showNotification({
                message: 'password changed!',
              });
              router.replace('/');
            }
          }
        })}
      >
        <Stack>
          <TextInput
            required
            label='کدملی'
            placeholder='کدملی خود را وارد کنید'
            value={form.values.nationalId}
            onChange={(event) =>
              form.setFieldValue('nationalId', event.currentTarget.value)
            }
            error={form.errors.nationalId && 'Invalid national ID'}
            radius='md'
          />
          <PasswordInput
            required
            label='کلمه عبور'
            placeholder='کلمه عبور خود را وارد کنید'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password && 'کلمه عبور باید بیشتر از 6 کاراکتر باشد'
            }
            radius='md'
          />
          <Input.Wrapper
            label='Code'
            required
            error={form.errors.code && 'کد وارد شده صحیح نمی‌باشد'}
          >
            <Group justify='center'>
              <PinInput
                style={{
                  direction: 'ltr',
                }}
                error={form.errors.code}
                length={6}
                {...form.getInputProps('code')}
                radius='md'
                oneTimeCode
              />
            </Group>
          </Input.Wrapper>
        </Stack>

        <Group justify='space-between' mt='xl'>
          <Anchor
            component={Link}
            type='button'
            c='dimmed'
            size='xs'
            href='/login'
          >
            بازگشت به صفحه ورود
          </Anchor>
          <Button type='submit' radius='xl'>
            تغییر
          </Button>
        </Group>
      </form>
    </>
  );
}

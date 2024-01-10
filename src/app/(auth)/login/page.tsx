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
} from '@mantine/core';

import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { authenticate } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';

export default function Page() {
  const router = useRouter();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nationalId: '',
      password: '',
    },
    validate: zodResolver(
      z.object({
        nationalId: z
          .string()
          .length(10)
          .regex(/^[0-9]+/gi, {
            message: 'لطفا کد ملی خود را به صورت صحیح وارد کنید',
          }),
        password: z.string().min(6, {
          message: 'رمز عبور حداقل باید 6 کاراکتر باشد',
        }),
      })
    ),
  });

  return (
    <>
      <Text size='lg' fw={500} ta='center'>
        خوش آمدید به Cadders
      </Text>

      <form
        onSubmit={form.onSubmit(async (values) => {
          const res = form.validate();
          if (!res.hasErrors) {
            const result = await authenticate(values);
            if (!result.success) {
              if (result.nationalId)
                form.setFieldError('nationalId', result.nationalId);
              if (result.password)
                form.setFieldError('password', result.password);
            } else {
              showNotification({
                title: 'ورود با موفقیت انجام شد',
                color: 'green',
                message: result.verified
                  ? 'شما در حال ورود به سایت می باشید'
                  : 'لطفا اکانت خود را تائید کنید',
              });
              if (!result.verified) router.replace('/verify');
              else router.replace('/');
            }
          }
        })}
      >
        <Stack>
          <TextInput
            required
            label='کد ملی'
            autoFocus
            placeholder='کد ملی خود را وارد کنید'
            value={form.values.nationalId}
            onChange={(event) =>
              form.setFieldValue('nationalId', event.currentTarget.value)
            }
            error={form.errors.nationalId && form.errors.nationalId}
            radius='md'
          />

          <PasswordInput
            required
            label='رمز عبور'
            placeholder='رمز عبور خود را وارد کنید'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={form.errors.password}
            radius='md'
            description={
              <Anchor
                component={Link}
                type='button'
                c='dimmed'
                size='xs'
                href='/resetpassword'
              >
                رمز عبور خود را فراموش کرده اید؟
              </Anchor>
            }
          />
        </Stack>

        <Group justify='space-between' mt='xl'>
          <Anchor
            component={Link}
            type='button'
            c='dimmed'
            size='xs'
            href='/register'
          >
            حساب کاربری ندارید؟ ثبت نام کنید
          </Anchor>
          <Button type='submit' radius='xl'>
            ورود
          </Button>
        </Group>
      </form>
    </>
  );
}

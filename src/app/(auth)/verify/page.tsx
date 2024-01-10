'use client';

import { useForm, zodResolver } from '@mantine/form';
import {
  Text,
  Group,
  Button,
  Anchor,
  Stack,
  PinInput,
  Input,
} from '@mantine/core';

import React, { useCallback } from 'react';
import { z } from 'zod';
import { generateToken, verifyPhone } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';

export default function Page() {
  const router = useRouter();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      code: '',
    },
    validate: zodResolver(
      z.object({
        code: z
          .string()
          .length(6)
          .regex(/^[0-9]+/gi, {
            message: 'لطفا کد تایید خود را به صورت صحیح وارد کنید',
          }),
      })
    ),
  });

  const getToken = useCallback(async () => {
    const tokenRes = await generateToken();
    if (tokenRes.success) {
      showNotification({
        title: 'Token Created',
        message: `توکن با موفقیت ارسال شد: ${tokenRes.token}`,
        autoClose: false,
      });
    }
  }, []);

  return (
    <>
      <Text size='lg' fw={500}>
        به Cadders خوش آمدید، شماره خود را تائید کنید
      </Text>

      <form
        onSubmit={form.onSubmit(async (values) => {
          const res = form.validate();
          if (!res.hasErrors) {
            const result = await verifyPhone(values);
            if (!result.success) {
              showNotification({
                message: result.message,
                color: 'red',
              });
            } else {
              showNotification({
                message: 'تایید شد',
              });
              router.replace('/');
            }
          }
        })}
      >
        <Stack>
          <Text size='sm' fw={500}>
            کد ارسال شده را وارد کنید
          </Text>

          <Input.Wrapper label='Code' required error={form.errors.code}>
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
            component='button'
            type='button'
            c='dimmed'
            size='xs'
            onClick={getToken}
          >
            ارسال مجدد کد
          </Anchor>
          <Button type='submit' radius='xl'>
            تایید
          </Button>
        </Group>
      </form>
    </>
  );
}

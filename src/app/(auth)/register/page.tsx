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
  Checkbox,
} from '@mantine/core';

import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { register } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';

export default function Page() {
  const router = useRouter();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nationalId: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      acceptTerms: false,
    },
    validate: zodResolver(
      z.object({
        nationalId: z
          .string()
          .length(10)
          .regex(/^[0-9]+/gi, {
            message: 'لطفا کد ملی خود را به صورت صحیح وارد کنید',
          }),
        password: z
          .string()
          .min(6, { message: 'لطفا رمز عبور خود را وارد کنید' }),
        firstName: z.string().min(2, { message: 'لطفا نام خود را وارد کنید' }),
        lastName: z
          .string()
          .min(2, { message: 'لطفا نام خانوادگی خود را وارد کنید' }),
        phoneNumber: z
          .string()
          .regex(/^09[0-9]{9}$/, {
            message: 'لطفا شماره موبایل خود را به صورت صحیح وارد کنید',
          }),
        acceptTerms: z
          .boolean()
          .refine((val) => val === true, {
            message: 'لطفا قوانین را تایید کنید',
          }),
      })
    ),
  });

  return (
    <>
      <Text size='lg' fw={500} ta='center'>
        به Cadders خوش آمدید، ثبت نام
      </Text>

      <form
        onSubmit={form.onSubmit(async (values) => {
          const res = form.validate();
          if (!res.hasErrors) {
            const result = await register({
              nationalId: values.nationalId,
              password: values.password,
              firstName: values.firstName,
              lastName: values.lastName,
              phoneNumber: values.phoneNumber,
            });
            if (!result.success) {
              if (result.nationalId)
                form.setFieldError('nationalId', result.nationalId);
            } else {
              showNotification({
                title: 'ثبت نام با موفقیت انجام شد',
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
            label='نام'
            placeholder='نام خود را وارد کنید'
            {...form.getInputProps('firstName')}
            error={form.errors.firstName}
            radius='md'
            autoFocus
          />

          <TextInput
            required
            label='نام خانوادگی'
            placeholder='نام خانوادگی خود را وارد کنید'
            {...form.getInputProps('lastName')}
            error={form.errors.lastName}
            radius='md'
          />

          <TextInput
            required
            label='کد ملی'
            placeholder='کد ملی خود را وارد کنید'
            {...form.getInputProps('nationalId')}
            radius='md'
          />

          <TextInput
            required
            label='شماره تلفن'
            placeholder='شماره تلفن خود را وارد کنید'
            error={form.errors.phoneNumber}
            {...form.getInputProps('phoneNumber')}
            radius='md'
          />

          <PasswordInput
            required
            label='رمز عبور'
            placeholder='رمز عبور خود را وارد کنید'
            error={form.errors.password}
            {...form.getInputProps('password')}
            radius='md'
          />

          <Checkbox
            required
            label='شرایط و ضوابط را مطالعه نموده و قبول نموده ام'
            {...form.getInputProps('acceptTerms')}
            radius='md'
          />
        </Stack>

        <Group justify='space-between' mt='xl'>
          <Anchor
            component={Link}
            type='button'
            c='dimmed'
            size='xs'
            href='/login'
          >
            حساب کاربری دارید؟ ورود
          </Anchor>
          <Button type='submit' radius='xl'>
            ثبت نام
          </Button>
        </Group>
      </form>
    </>
  );
}

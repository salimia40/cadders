'use client';

import { ActionIcon, Drawer } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconMenu2 } from '@tabler/icons-react';
import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { $Enums } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/actions/auth';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const menuItems = [
  { label: 'صفحه اصلی', key: '' },
  { label: 'خدمات', key: 'services' },
  { label: 'پرسش های متداول', key: 'faqs' },
  { label: 'تماس با ما', key: 'contact' },
  { label: 'درباره ما', key: 'about' },
  { label: 'درخواست مشاوره', key: 'request' },
];

const items: MenuItem[] = menuItems.map(({ key, label }) =>
  getItem(label, key, null)
);

const adminMenuItems = [
  { label: 'پروفایل', key: 'profile' },
  { label: 'داشبورد', key: 'dashboard' },
  { label: 'تنظیمات', key: 'settings' },
  { label: 'خروج', key: 'logout' },
];

const clientMenuItems = [
  { label: 'پروفایل', key: 'profile' },
  { label: 'پنل کاربری', key: 'panel' },
  { label: 'تنظیمات', key: 'settings' },
  { label: 'خروج', key: 'logout' },
];

const adminItems: MenuItem[] = adminMenuItems.map(({ key, label }) =>
  getItem(label, key, null)
);
const clientItems: MenuItem[] = clientMenuItems.map(({ key, label }) =>
  getItem(label, key, null)
);

const guestMenuItems = [
  { label: 'ورود', key: 'login' },
  { label: 'ثبت نام', key: 'register' },
];

const guestItems: MenuItem[] = guestMenuItems.map(({ key, label }) =>
  getItem(label, key, null)
);

const divider: MenuItem = { type: 'divider' };

export default function HeaderMenu({
  loggedIn,
  role,
}: {
  loggedIn: boolean;
  role?: $Enums.Role;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const matches = useMediaQuery('(min-width: 734px)');
  const profileItems = role === $Enums.Role.client ? clientItems : adminItems;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Drawer opened={opened} onClose={close} title='منو'>
        <Menu
          onSelect={({ key }) => {
            if (key === 'logout') {
              close();
              logout();
              return;
            }
            close();
            router.push(`/${key}`);
          }}
          selectedKeys={[`${pathname.split('/')[1]}`]}
          items={[...(loggedIn ? profileItems : guestItems), divider, ...items]}
        />
      </Drawer>

      <ActionIcon
        onClick={open}
        style={{
          display: matches ? 'none' : 'block',
        }}
        variant='transparent'
      >
        <IconMenu2 />
      </ActionIcon>
    </>
  );
}

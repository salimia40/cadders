'use client';

import {
  AppShell,
  AppShellSection,
  Burger,
  Container,
  Group,
  NavLink,
  ScrollArea,
  Stack,
} from '@mantine/core';
import {
  IconCreditCard,
  IconDashboard,
  IconFolders,
  IconLogout,
  IconSettings,
  IconUserCircle,
  IconUsers,
} from '@tabler/icons-react';
import { logout } from '@/lib/actions/auth';
import { useDisclosure } from '@mantine/hooks';
import { Menu, MenuProps } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

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

const adminLinks = [
  {
    label: 'داشبورد',
    icon: <IconDashboard />,
    link: '/dashboard',
  },
  {
    label: 'پروفایل',
    icon: <IconUserCircle />,
    link: '/profile',
  },
  {
    label: 'کاربران',
    icon: <IconUsers />,
    link: '/users',
  },
  {
    label: 'پروژه ها',
    icon: <IconFolders />,
    link: '/projects',
  },
  {
    label: 'پرداخت ها',
    icon: <IconCreditCard />,
    link: '/payments',
  },
  {
    label: 'تنظیمات',
    icon: <IconSettings />,
    link: '/settings',
  },
];

const agentLinks = [
  {
    label: 'داشبورد',
    icon: <IconDashboard />,
    link: '/dashboard',
  },
  {
    label: 'پروفایل',
    icon: <IconUserCircle />,
    link: '/profile',
  },
  {
    label: 'پروژه ها',
    icon: <IconFolders />,
    link: '/projects',
  },
  {
    label: 'پرداخت ها',
    icon: <IconCreditCard />,
    link: '/payments',
  },
  {
    label: 'تنظیمات',
    icon: <IconSettings />,
    link: '/settings',
  },
];

const clientLinks = [
  {
    label: 'پنل کاربری',
    icon: <IconDashboard />,
    link: '/panel',
  },
  {
    label: 'پروفایل',
    icon: <IconUserCircle />,
    link: '/profile',
  },
  {
    label: 'پروژه های من',
    icon: <IconFolders />,
    link: '/myprojects',
  },
  {
    label: 'پرداخت ها',
    icon: <IconCreditCard />,
    link: '/payments',
  },
  {
    label: 'تنظیمات',
    icon: <IconSettings />,
    link: '/settings',
  },
];

export default function Shell({
  children,
  role = 'client',
}: {
  children: React.ReactNode;
  role: 'admin' | 'agent' | 'client';
}) {
  const [opened, { toggle }] = useDisclosure();

  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <Group align='center' h='100%' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Image
            src='/assets/shell_title.png'
            alt='header'
            width={240}
            height={60}
            style={{
              objectFit: 'contain',
            }}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShellSection>
          <Stack align='center' mt='xl' mb='md'>
            <Image
              src='/assets/logo.png'
              alt='header'
              width={120}
              height={120}
              style={{
                borderRadius: '50%',
              }}
            />
            <Image
              src='/assets/shell_title.png'
              alt='header'
              width={240}
              height={80}
              style={{
                marginTop: -20,
                objectFit: 'contain',
              }}
            />
          </Stack>
        </AppShellSection>
        <AppShellSection grow component={ScrollArea}>
          <Menu
            items={(role === 'admin'
              ? adminLinks
              : role === 'agent'
              ? agentLinks
              : clientLinks
            ).map(({ label, link, icon }) => getItem(label, link, icon))}
            onClick={({ key }) => {
              router.push(key);
              toggle();
            }}
            selectedKeys={[`/${pathname.split('/')[1]}`]}
          />
        </AppShellSection>
        <AppShellSection>
          {/* {userButton} */}
          <NavLink
            rightSection={<IconLogout stroke={1.5} />}
            label='خروج'
            onClick={() => logout()}
          />
        </AppShellSection>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container fluid>{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}

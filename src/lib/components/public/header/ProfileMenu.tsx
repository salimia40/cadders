'use client';

import { logout } from '@/lib/actions/auth';
import {
  Avatar,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from '@mantine/core';
import { $Enums } from '@prisma/client';
import {
  IconDashboard,
  IconLogout,
  IconSettings,
  IconUserCircle,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

function ProfileMenu({ role }: { role: $Enums.Role }) {
  return (
    <Menu>
      <MenuTarget>
        <Avatar size={40} src='/assets/profile.png' />
      </MenuTarget>
      <MenuDropdown>
        <MenuItem
          component={Link}
          href='/profile'
          leftSection={<IconUserCircle size='1rem' stroke={1.5} />}
        >
          پروفایل
        </MenuItem>
        {role === $Enums.Role.client ? (
          <MenuItem
            component={Link}
            href='/panel'
            leftSection={<IconDashboard size='1rem' stroke={1.5} />}
          >
            {' '}
            پنل کاربری{' '}
          </MenuItem>
        ) : (
          <MenuItem
            component={Link}
            href='/dashboard'
            leftSection={<IconDashboard size='1rem' stroke={1.5} />}
          >
            {' '}
            داشبورد{' '}
          </MenuItem>
        )}
        <MenuItem leftSection={<IconSettings size='1rem' stroke={1.5} />}>
          تنظیمات
        </MenuItem>
        <MenuDivider />
        <MenuItem
          leftSection={<IconLogout size='1rem' stroke={1.5} />}
          onClick={() => logout()}
        >
          خروج
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}

export default ProfileMenu;

import React from 'react';

import { Image, ActionIcon } from '@mantine/core';
import { $Enums } from '@prisma/client';
import Link from 'next/link';
import { IconBell } from '@tabler/icons-react';
import ProfileMenu from './ProfileMenu';
import Search from './Search';
import classes from './Header.module.css';
import HeaderMenu from './HeaderMenu';

const menuItems = [
  'صفحه اصلی',
  'خدمات',
  'پرسش های متداول',
  'تماس با ما',
  'درباره ما',
  'درخواست مشاوره',
];

export default function Header({
  user,
}: {
  user:
    | {
        id: string;
        name: string | null;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string;
        phoneNumberVerified: boolean;
        nationalId: string | null;
        image: string | null;
        password: string;
        role: $Enums.Role;
      }
    | null
    | undefined;
}) {
  return (
    <>
      <div className={classes.headerWrapper}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <Image src='/assets/logo.png' maw='70px' alt='logo' />
            <Image
              src='/assets/title.png'
              className={classes.title}
              alt='title'
            />
          </div>
          <div className={classes.buttons}>
            <Search />
            {user ? (
              <>
                <ActionIcon variant='transparent'>
                  <IconBell size='2rem' color='gray' />
                </ActionIcon>
                <ProfileMenu role={user.role} />
              </>
            ) : (
              <Link className={classes.login} href='/login'>
                ورود / ثبت نام
              </Link>
            )}
            <HeaderMenu loggedIn={!!user} role={user?.role} />
          </div>
          {/* </Group> */}
        </div>
      </div>
      <div className={classes.menu}>
        <div className={classes.menuItems}>
          {menuItems.map((item, index) => (
            <Link href='/' className={classes.menuItem} key={index}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

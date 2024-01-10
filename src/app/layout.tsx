import type { Metadata } from 'next';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import React from 'react';
import { vazirmatn } from './fonts';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'سامانه جامع امنیت اماکن',
  description: 'Description of your page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fa' dir='rtl'>
      <head>
        <ColorSchemeScript />
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body className={vazirmatn.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

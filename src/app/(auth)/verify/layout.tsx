import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/getCurrentUser';
import React from 'react';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return <>{children}</>;
}

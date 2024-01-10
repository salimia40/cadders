import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/getCurrentUser';
import Shell from '@/lib/components/Shell';
import React from 'react';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return <Shell role={user.role}>{children}</Shell>;
}

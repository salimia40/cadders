import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/getCurrentUser';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return <>{children}</>;
}


import { cookies } from 'next/headers';
import Shell from '@/lib/components/Shell';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { UserButton } from '@/lib/components/UserButton';
import { getCurrentUser } from '@/lib/getCurrentUser';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()
    if (!user) redirect('/login')
    return (
        <Shell role={user.role}
            userButton={<UserButton />}
        >
            {children}
        </Shell>
    )
}
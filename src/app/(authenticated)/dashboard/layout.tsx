import { redirect } from 'next/navigation';
import Shell from '@/lib/components/Shell';
import { UserButton } from '@/lib/components/UserButton';
import { getCurrentUser } from '@/lib/getCurrentUser';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()
    if (!user) redirect('/login')
    if (user.role === "client") redirect('/panel')
    return (
        <Shell role={user.role}
            userButton={<UserButton />}
        >
            {children}
        </Shell>
    )
}
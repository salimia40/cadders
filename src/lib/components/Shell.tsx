"use client"
import { AppShell, AppShellSection, Burger, Container, Group, NavLink, ScrollArea, Title } from '@mantine/core';
import { IconChevronRight, IconFolders, IconLogout } from '@tabler/icons-react';
import { logout } from '@/lib/actions/auth';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { UserButton } from '@/lib/components/UserButton';
import { Suspense } from 'react';

export default function Shell({
    children,
    userButton,
    role = "client"
}: {
    children: React.ReactNode,
    userButton: React.ReactNode,
    role: 'admin' | "agent" | 'client'
}) {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md">
            <AppShell.Header>
                <Group align='center' h={'100%'} px='md'>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Title>{
                        role === "admin" ? "Admin Panel" : role === "agent" ? "Agent Panel" : "Client Panel"
                    }</Title>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar >
                <AppShellSection>

                </AppShellSection>
                <AppShellSection grow component={ScrollArea}>
                    {role === 'client' &&
                        <NavLink
                            leftSection={<IconFolders size="1rem" stroke={1.5} />}
                            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                            label="My Folders"
                            component={Link}
                            href="/panel/folders"
                            type='submit'
                        />
                    }
                    {role === "admin" &&
                        <NavLink
                            leftSection={<IconFolders size="1rem" stroke={1.5} />}
                            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                            label="View All Folders"
                            component={Link}
                            href="/dashboard/allfolders"
                            type='submit'
                        />
                    }
                    {role === 'agent' &&
                        <>
                            <NavLink
                                leftSection={<IconFolders size="1rem" stroke={1.5} />}
                                rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                                label="View Free Folders"
                                component={Link}
                                href="/dashboard/freefolders"
                                type='submit'
                            />
                            <NavLink
                                leftSection={<IconFolders size="1rem" stroke={1.5} />}
                                rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                                label="Assigned Folders"
                                component={Link}
                                href="/dashboard/assignedfolders"
                                type='submit'
                            />
                            {/* <NavLink
                                leftSection={<IconFolders size="1rem" stroke={1.5} />}
                                rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                                label="Done Folders"
                                component={Link}
                                href="/dashboard/donefolders"
                                type='submit'
                            /> */}
                        </>
                    }
                </AppShellSection>
                <AppShellSection>
                    {userButton}
                    <form action={logout}>
                        <NavLink
                            leftSection={<IconLogout size="1rem" stroke={1.5} />}
                            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                            label="Log out"
                            component='button'
                            type='submit'
                        />
                    </form>
                </AppShellSection>
            </AppShell.Navbar>
            <AppShell.Main>
                <Container fluid>
                    {children}
                </Container>
            </AppShell.Main>
        </AppShell>
    )
}
import { logout } from '@/lib/actions/auth'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { Box, Button, Group, Paper, Title } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { Footer } from './Footer'

async function Layout(
    props: {
        children: React.ReactNode
    }
) {
    const user = await getCurrentUser()
    return (
        <>
            <Paper shadow='sm' >
                <Group justify='space-between' mx={'xl'}>
                    <Title order={3}>Cadders</Title>
                    <Group my={'1rem'}>
                        {!user && <>
                            <Button mr={2} variant='outline' color='green' component={Link} href={'/login'}>Login</Button>
                            <Button variant='outline' component={Link} href={'/register'}>Register</Button>
                        </>
                        }
                        {
                            user && <form action={logout}><Button variant='outline' type='submit' >Logout</Button></form>
                        }
                        {
                            user && user.role === 'client' ?
                                <Button variant='outline' component={Link} href={'/panel'}>Client Panel</Button>
                                : user?.role === "admin" ?
                                    <Button variant='outline' component={Link} href={'/dashboard'}>Admin Panel</Button>
                                    : user?.role === "agent" ?
                                        <Button variant='outline' component={Link} href={'/dashboard'}>Agent Panel</Button>
                                        : <></>

                        }
                    </Group>
                </Group>
            </Paper>
            {props.children}
            <Footer />
        </>
    )
}

export default Layout
import { getCurrentUser } from '@/lib/getCurrentUser'
import React from 'react'
import Header from '@/lib/components/public/header/Header'
import { Footer } from '@/lib/components/public/footer/Footer'

async function Layout(
    props: {
        children: React.ReactNode
    }
) {
    const user = await getCurrentUser()
    return (
        <>
            <Header user={user} />
            {props.children}
            <Footer />
        </>
    )
}

export default Layout
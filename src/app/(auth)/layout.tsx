import React from 'react'
import {
    Paper,
} from '@mantine/core';


function Layout({ children }: {
    children: React.ReactNode
}) {


    return (
        <Paper radius="md" p="xl" withBorder maw={'400px'} mx={'auto'} mt={'10rem'} >
            {children}
        </Paper>
    );
}

export default Layout
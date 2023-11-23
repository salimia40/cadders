'use server'
import { Avatar, rem, NavLink } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { getCurrentUser } from '../getCurrentUser';

export async function UserButton() {
    const user = await getCurrentUser()

    return (
        <NavLink leftSection={<Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
            radius="xl"
        />}
            label={
                user?.firstName + " " + user?.lastName
            }
            description={user?.phoneNumber}
            rightSection={<IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />}

        />

    );
}
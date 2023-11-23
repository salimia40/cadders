import { Text, Container, ActionIcon, Group, rem, Title } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';

const data = [
    {
        title: 'About',
        links: [
            { label: 'Features', link: '#' },
            { label: 'Pricing', link: '#' },
            { label: 'Support', link: '#' },
            { label: 'Forums', link: '#' },
        ],
    },
    {
        title: 'Project',
        links: [
            { label: 'Contribute', link: '#' },
            { label: 'Media assets', link: '#' },
            { label: 'Changelog', link: '#' },
            { label: 'Releases', link: '#' },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'Join Discord', link: '#' },
            { label: 'Follow on Twitter', link: '#' },
            { label: 'Email newsletter', link: '#' },
            { label: 'GitHub discussions', link: '#' },
        ],
    },
];

export function Footer() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                component="a"
                href={link.link}
            >
                {link.label}
            </Text>
        ));

        return (
            <div key={group.title}>
                <Title order={5}>{group.title}</Title>
                <Group>
                    {links}
                </Group>
            </div>
        );
    });

    return (
        <footer >
            <Container >
                <div >
                    <Title size={30} >Cadders</Title>
                    <Text size="xs" c="dimmed" >
                        Build fully functional accessible web applications faster than ever
                    </Text>
                </div>
                <div >{groups}</div>
            </Container>
            <Container >
                <Text c="dimmed" size="sm">
                    © 2023 puyaars.ir. All rights reserved.
                </Text>

                <Group gap={0} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
import { Divider, Group, Stack } from '@mantine/core';
import { Skeleton } from 'antd';
import React from 'react';

import Button from 'antd/lib/skeleton/Button';
import Title from 'antd/lib/skeleton/Title';

function loading() {
  return (
    <Stack>
      <Group justify='space-between'>
        <Button />
        <Title />
      </Group>
      <Group>
        <Title />
        <Title />
        <Title />
      </Group>
      <Group>
        <Title />
        <Title />
        <Title />
      </Group>
      <Divider />
      <Skeleton avatar paragraph={{ rows: 2 }} />
      <Skeleton avatar paragraph={{ rows: 2 }} />
      <Skeleton avatar paragraph={{ rows: 2 }} />
    </Stack>
  );
}

export default loading;

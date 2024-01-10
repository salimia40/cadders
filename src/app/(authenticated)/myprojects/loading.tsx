import { Stack } from '@mantine/core';
import { Skeleton } from 'antd';
import React from 'react';

function loading() {
  return (
    <Stack>
      <Skeleton avatar paragraph={{ rows: 2 }} />
      <Skeleton avatar paragraph={{ rows: 2 }} />
      <Skeleton avatar paragraph={{ rows: 2 }} />
    </Stack>
  );
}

export default loading;

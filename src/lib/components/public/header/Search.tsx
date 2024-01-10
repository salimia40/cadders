'use client';

import React from 'react';
import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import classes from './Search.module.css';

export default function Search() {
  const matches = useMediaQuery('(min-width: 870px)');
  return (
    <Input
      className={classes.search}
      style={{ display: matches ? 'block' : 'none' }}
      rightSection={<IconSearch size='1rem' />}
      placeholder='جستجو'
    />
  );
}

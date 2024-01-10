import { Anchor, Button, List, ListItem, ThemeIcon } from '@mantine/core';
import { Popover } from 'antd';
import React from 'react';

import { File } from '@prisma/client';
import { IconDownload } from '@tabler/icons-react';

function DownloadButton({ files }: { files: File[] }) {
  return (
    <Popover
      content={
        <List size='xs'>
          {files.map((file) => (
            <ListItem
              icon={
                <Anchor
                  component='a'
                  href={`/file${file.url}`}
                  download={file.fileName || file.id}
                >
                  <ThemeIcon radius='xl' size='sm' color='green'>
                    <IconDownload size='0.8rem' />
                  </ThemeIcon>
                </Anchor>
              }
              key={file.id}
            >
              {file.fileName || file.id}
            </ListItem>
          ))}
        </List>
      }
      trigger='click'
    >
      <Button variant='transparent'>دانلود</Button>
    </Popover>
  );
}

export default DownloadButton;

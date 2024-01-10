import React from 'react';
import { MantineProvider, DirectionProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { App, ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/fa_IR';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { RouterTransition } from '../lib/components/nProgress';
import theme from './theme';

function providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme.mantineTheme}>
      <DirectionProvider>
        <AntdRegistry>
          <ConfigProvider
            locale={locale}
            direction='rtl'
            theme={theme.antdTheme}
          >
            <App>
              <Notifications />
              <RouterTransition />
              <ModalsProvider>{children}</ModalsProvider>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </DirectionProvider>
    </MantineProvider>
  );
}

export default providers;

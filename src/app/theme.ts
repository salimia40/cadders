import { createTheme } from '@mantine/core';
import { ThemeConfig } from 'antd';
import { vazirmatn } from './fonts';

const mantineTheme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: vazirmatn.style.fontFamily,
});

const antdTheme: ThemeConfig = {
  token: {
    fontFamily: vazirmatn.style.fontFamily,
  },
  inherit: true,
};

export default { mantineTheme, antdTheme };

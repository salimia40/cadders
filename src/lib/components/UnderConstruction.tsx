import { Button, Result } from 'antd';
import React from 'react';

export default function UnderConstruction() {
  return (
    <Result
      status='404'
      title='این صفحه در حال توسعه است'
      subTitle='لطفا صبور باشید'
      extra={<Button href='/'>بازگشت به صفحه اصلی</Button>}
    />
  );
}

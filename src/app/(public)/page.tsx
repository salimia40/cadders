import { IconPlus } from '@tabler/icons-react';
import Stats from '@/lib/components/public/Stats';
import React from 'react';
import classes from './page.module.css';

const buttons = (
  <div className={classes.buttons}>
    <button type='button'>
      <span>آپلود فایل آتوکد</span>
      <span>
        <IconPlus />
      </span>
    </button>

    <button type='button'>
      <span>توضیحات بیشتر</span>
      <span>
        <IconPlus />
      </span>
    </button>
  </div>
);

export default async function Home() {
  return (
    <>
      <div className={classes.guidWrapper}>
        <div className={classes.guid}>
          <p className={classes.title}>نحوه عملکرد سامانه جامع امنیت اماکن</p>
          <div className={classes.content}>
            <p>
              این سامانه برای اینکه امکانات امنیت انبوه را برای هر نیاز به
              کاربران داشته باشیم را ایجاد کنیم. این سامانه میتواند فراخوانی کند
              که امنیت انبوه را به ازای هر کاربر کمک کند. این سامانه میتواند
              فراخوانی کند که امنیت انبوه را به ازای هر کاربر کمک کند. این
              سامانه میتواند فراخوانی کند که امنیت انبوه را به ازای هر کاربر کمک
              کند. این سامانه میتواند فراخوانی کند که امنیت انبوه را به ازای هر
              کاربر کمک کند.
            </p>
            <button type='button'>
              <span>توضیحات بیشتر</span>
              <span>
                <IconPlus />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className={classes.toturial}>
        <p className={classes.title}>آموزش سریع استفاده از سامانه</p>
        <p className={classes.content}>
          نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت
          اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع
          امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن
        </p>
        <div className={classes.video}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={44}
            height={44}
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <linearGradient
              id='a'
              x1={0}
              y1={8}
              x2={24}
              y2={12}
              gradientUnits='userSpaceOnUse'
            >
              <stop offset={0} stopColor='currentColor' />
              <stop offset={1} stopColor='currentColor' stopOpacity={0.2} />
            </linearGradient>
            <path
              d='M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z'
              strokeWidth={0}
              fill='url(#a)'
            />
          </svg>
          <span>پخش ویدیو</span>
        </div>
      </div>

      <div className={classes.featureWrapper}>
        <div
          className={classes.feature}
          style={{
            // @ts-ignore
            '--image': `url(/assets/camera.png)`,
          }}
        >
          <p className={classes.title}>نحوه عملکرد سامانه جامع امنیت اماکن</p>
          <p className={classes.content}>
            نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت
            اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع
            امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه
            جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد
            سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه
            عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن
            نحوه عملکرد سامانه جامع امنیت اماکن
          </p>
          {buttons}
        </div>
      </div>
      <div className={classes.featureWrapper}>
        <div
          className={classes.feature}
          style={{
            // @ts-ignore
            '--image': `url(/assets/alarm.png)`,
          }}
        >
          <p className={classes.title}>نحوه عملکرد سامانه جامع امنیت اماکن</p>
          <p className={classes.content}>
            نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت
            اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع
            امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه
            جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد
            سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه
            عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن
            نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت
            اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع
            امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه
            جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه عملکرد
            سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن نحوه
            عملکرد سامانه جامع امنیت اماکن نحوه عملکرد سامانه جامع امنیت اماکن
          </p>
          {buttons}
        </div>
      </div>

      <Stats />
    </>
  );
}

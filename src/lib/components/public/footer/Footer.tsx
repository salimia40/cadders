import { Image } from '@mantine/core';
import React from 'react';
import classes from './Footer.module.css';

const footerLinks = [
  <a href='' className={classes.footerLink} key={0}>
    <div className={classes.icon} />
    <span>صفحه اصلی</span>
  </a>,
  <a href='' className={classes.footerLink} key={1}>
    <div className={classes.icon} />
    <span>ثبت نام</span>
  </a>,
  <a href='' className={classes.footerLink} key={2}>
    <div className={classes.icon} />
    <span>پرسش های متداول</span>
  </a>,
  <a href='' className={classes.footerLink} key={3}>
    <div className={classes.icon} />
    <span>درباره ما</span>
  </a>,
];

export function Footer() {
  return (
    <>
      <div className={classes.footerSupport}>
        <Image src='/assets/support_hours.png' alt='header' />
        <Image src='/assets/support.png' alt='header' />
      </div>
      <div className={classes.footerLinksMobile}>{footerLinks}</div>
      <div className={classes.footer}>
        <div className={classes.footerRight}>
          <div className={classes.shadow} />
          <div className={classes.bg} />
          <div className={classes.whiteLine} />
          <div className={classes.ribbon}>
            <div className={classes.logo}>
              <Image src='/assets/logo.png' alt='header' />
            </div>
            <Image src='/assets/footer_title.png' alt='header' />
          </div>
          <Image
            className={classes.company}
            src='/assets/company.png'
            alt='header'
          />
        </div>
        <div className={classes.footerLeft}>
          <div className={classes.links}>{footerLinks}</div>
          <div className={classes.info}>
            <Image src='/assets/support.png' alt='header' />
            <Image src='/assets/support_hours.png' alt='header' />
          </div>
        </div>
      </div>
    </>
  );
}

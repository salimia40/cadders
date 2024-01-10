import React from 'react';
import { Image } from '@mantine/core';
import classes from './Stats.module.css';

function Stats() {
  return (
    <div className={classes.stats}>
      <div className={classes.stat}>
        <Image src='/assets/uploads.png' alt='header' />
        <div className={classes.label}>تعداد فایل های آپلود شده</div>
        <div className={classes.value}>10k+</div>
      </div>

      <div className={classes.stat}>
        <Image src='/assets/downloads.png' alt='header' />
        <div className={classes.label}>تعداد فایل های دانلود شده</div>
        <div className={classes.value}>10k+</div>
      </div>

      <div className={classes.stat}>
        <Image src='/assets/progress.png' alt='header' />
        <div className={classes.label}>تعداد فایل های در حال انجام</div>
        <div className={classes.value}>10k+</div>
      </div>
    </div>
  );
}

export default Stats;

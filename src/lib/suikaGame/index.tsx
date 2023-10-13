import React from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";

const cx = classNames.bind(styles);

const SuikaGame = () => {
  useMatterJS();

  return (
    <div className={cx('area')}>
      <div className={cx('wrap')}>
        <div id={'canvas'} className={cx('canvas')} />
      </div>
    </div>
  )
}

export default SuikaGame;
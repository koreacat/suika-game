import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface BGMBtnProps {
  isPlaying: boolean;
  handleMusic: () => void;
}

const BGMBtn = ({isPlaying, handleMusic}: BGMBtnProps) => {
  return (
    <button className={cx("bgmBtn", { playing: isPlaying })} onClick={handleMusic}>
      <div className={cx("border")}></div>
      <div className={cx("play")}></div>
    </button>
  );
};

export default BGMBtn;

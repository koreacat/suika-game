import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const BGMBtn = () => {
  const [audio] = useState(new Audio(require('../../../resource/bgm.mp3'))); // 음악 파일 경로로 변경
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audio.loop = true; // 무한 반복 설정

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, audio]);

  const toggleMusic = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <button className={cx("bgmBtn", { playing: isPlaying })} onClick={toggleMusic}>
      <div className={cx("border")}></div>
      <div className={cx("play")}></div>
    </button>
  );
};

export default BGMBtn;

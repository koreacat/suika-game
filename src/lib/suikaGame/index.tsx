import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { Fruit, getFruitFeature, getRandomFruitFeature } from './object/Fruit';

const cx = classNames.bind(styles);

const SuikaGame = () => {
  const [score, setScore] = useState(0);
  const [nextItem, setNextItem] = useState<Fruit>(getRandomFruitFeature()?.label as Fruit);

  useMatterJS({setScore, nextItem, setNextItem});

  return (
    <div className={cx('gameArea')}>
      <div className={cx('gameWrap')}>
        <div className={cx('bestScoreArea')}>
          <span className={cx('best')}>
            <span className={cx('text')}>BEST SCORE</span>
            <span className={cx('number')}>{score}</span>
          </span>
        </div>
        <div className={cx('scoreArea')}>
          <span className={cx('score')}>{score}</span>
        </div>
        <div className={cx('nextArea')}>
          <span className={cx('next')} style={{background: getFruitFeature(nextItem)?.color}}/>
        </div>
        <div id={'canvas'} className={cx('canvas')} />
      </div>
    </div>
  )
}

export default SuikaGame;
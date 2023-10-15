import { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { Fruit, getRandomFruitFeature } from './object/Fruit';
import BGMBtn from './bgmBtn';
import GameOverModal from './gameOverModal';

const cx = classNames.bind(styles);

const SuikaGame = () => {
  const [score, setScore] = useState(0);
  const [nextItem, setNextItem] = useState<Fruit>(getRandomFruitFeature()?.label as Fruit);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useMatterJS({ setScore, nextItem, setNextItem, isGameOver, setIsGameOver });

  const handleTryAgain = () => {
    setIsGameOver(false);
  }

  return (
    <div className={cx('gameArea')}>
      <div className={cx('gameWrap')}>

        <div className={cx('topArea')}>
          <div className={cx('bestScoreArea')}>
            <span className={cx('text')}>BEST SCORE</span>
            <span className={cx('number')}>{score}</span>
          </div>
          <div className={cx('scoreArea')}>
            <span className={cx('score')}>{score}</span>
          </div>
          <div className={cx('nextArea')}>
            <span className={cx('text')}>NEXT</span>
            <span className={cx('next')} style={{ backgroundImage: `url(${require('../../resource/' + nextItem + '.png')})` }} />
          </div>
        </div>

        <div id={'canvas'} className={cx('canvas')} />

        <div className={cx('bottomArea')}>
          <BGMBtn />
        </div>
      </div>

      <GameOverModal isVisible={isGameOver} onClick={handleTryAgain}/>
    </div>
  )
}

export default SuikaGame;
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import useMatterJS from "./useMatterJS";
import { Fruit, getRandomFruitFeature } from './object/Fruit';
import BGMBtn from './bgmBtn';
import GameOverModal from './gameOverModal';
import Intro from './intro';

const cx = classNames.bind(styles);

const SuikaGame = () => {
  const [audio] = useState(new Audio(require('../../resource/bgm.mp3'))); // 음악 파일 경로로 변경
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [nextItem, setNextItem] = useState<Fruit>(getRandomFruitFeature()?.label as Fruit);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const { clear } = useMatterJS({ score, setScore, nextItem, setNextItem, isGameOver, setIsGameOver });

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

  useEffect(() => {
    const bestScore = localStorage.getItem('bestScore');
    if (bestScore) setBestScore(Number(bestScore));
  }, [isGameOver]);

  useEffect(() => {
    if(isGameOver) {
      const bestScore = localStorage.getItem('bestScore') || 0;
      console.log(bestScore, score);
      if (score > Number(bestScore)) {
        localStorage.setItem('bestScore', score.toString());
      }
    }
  }, [isGameOver]);

  const getBestScore = () => {
    return score > bestScore ? score : bestScore;
  }

  const handleTryAgain = () => {
    setScore(0);
    setNextItem(getRandomFruitFeature()?.label as Fruit);
    setIsGameOver(false);
    clear();
  }

  const handleGameStart = () => {
    setIsStart(true);
    setIsPlaying(true);
  }

  const handleMusic = () => {
    setIsPlaying((prevState) => !prevState);
  };


  return (
    <div className={cx('gameArea')}>
      { !isStart && <Intro handleGameStart={handleGameStart}/>}

      <div className={cx('gameWrap')} style={{ visibility: isStart ? 'visible' : 'hidden'}}>
        <div className={cx('topArea')}>
          <div className={cx('bestScoreArea')}>
            <span className={cx('text')}>BEST SCORE</span>
            <span className={cx('number')}>{getBestScore()}</span>
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
          <BGMBtn isPlaying={isPlaying} handleMusic={handleMusic} />
        </div>
      </div>

      <GameOverModal isVisible={isGameOver} onClick={handleTryAgain} score={score} />
    </div>
  )
}

export default SuikaGame;
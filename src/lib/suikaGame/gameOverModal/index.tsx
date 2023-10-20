import { useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface GameOverModalProps {
  isVisible: boolean;
  onClick: () => void;
  score: number;
}

let timeout: NodeJS.Timeout | null = null;

const GameOverModal = ({ isVisible, onClick, score }: GameOverModalProps) => {
  const [toastVisible, setToastVisible] = useState(false);

  if(!isVisible) return null;

  const clip = () => {
    timeout && clearTimeout(timeout);
    navigator.clipboard.writeText(window.location.href);
    setToastVisible(true);
    timeout = setTimeout(() => {
      setToastVisible(false);
    }, 2800)
  }

  return (
    <div className={cx('gameOverArea')}>
      <span className={cx('text')}>GAME OVER</span>
      <span className={cx('score')}>SCORE: {score}</span>
      <button className={cx('btn')} onClick={onClick}>↻ TRY AGAIN?</button>
      <div className={cx('linkArea')}>
        <a href={'https://forms.gle/QbPDG6rzT4spywyf6'} target='_blank' className={cx('formsLink')}>의견 남기기</a>        
        <button className={cx('shareaBtn')} onClick={clip}>공유하기</button>        
      </div>
      <div className={cx('toastArea', { show: toastVisible })}>🍉URL이 복사되었습니다.</div>
    </div>
  )
}

export default GameOverModal;
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface GameOverModalProps {
  isVisible: boolean;
  onClick: () => void;
  score: number;
}

const GameOverModal = ({ isVisible, onClick, score }: GameOverModalProps) => {
  if(!isVisible) return null;

  return (
    <div className={cx('gameOverArea')}>
      <span className={cx('score')}>SCORE: {score}</span>
      <span className={cx('text')}>GAME OVER</span>
      <button className={cx('btn')} onClick={onClick}>TRY AGAIN?</button>
    </div>
  )
}

export default GameOverModal;
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
      <span className={cx('text')}>GAME OVER</span>
      <span className={cx('score')}>SCORE: {score}</span>
      <button className={cx('btn')} onClick={onClick}>TRY AGAIN?</button>
      <a href={'https://forms.gle/QbPDG6rzT4spywyf6'} target='_blank' className={cx('formsLink')}>의견 남기기</a>
    </div>
  )
}

export default GameOverModal;
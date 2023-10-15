import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface GameOverModalProps {
  isVisible: boolean;
  onClick: () => void;
}

const GameOverModal = ({ isVisible, onClick }: GameOverModalProps) => {
  if(!isVisible) return null;

  return (
    <div className={cx('gameOverArea')}>
      <span className={cx('text')}>GAME OVER</span>
      <button className={cx('btn')} onClick={onClick}>TRY AGAIN?</button>
    </div>
  )
}

export default GameOverModal;
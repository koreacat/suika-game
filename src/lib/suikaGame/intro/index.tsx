import styles from './index.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface IntroProps {
  handleGameStart: () => void;
}

const Intro = ({handleGameStart}: IntroProps) => {

  return (
    <div className={cx('introArea')}>
      {/* <em className={cx('title')}>수박 게임</em> */}
      <button className={cx('btn')} onClick={handleGameStart}>GAME START</button>
    </div>
  )
}

export default Intro;
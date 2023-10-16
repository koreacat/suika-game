import { Fruit } from '../object/Fruit';
import { getRenderWidth } from '../object/Size';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface HeaderProps {
  bestScore: number;
  score: number;
  nextItem: null | Fruit;
}

const Header = ({score, bestScore, nextItem}: HeaderProps) => {
  const getBestScore = () => {
    return score > bestScore ? score : bestScore;
  }

  return (
    <div className={cx('headerArea')} style={{ maxWidth: getRenderWidth() }}>
      <div className={cx('bestScoreArea')}>
        <span className={cx('text')}>BEST SCORE</span>
        <span className={cx('number')}>{getBestScore()}</span>
      </div>
      <div className={cx('scoreArea')}>
        <span className={cx('score')}>{score}</span>
      </div>
      <div className={cx('nextArea')}>
        <span className={cx('text')}>NEXT</span>
        <span className={cx('next')} style={{ backgroundImage: `url(${require('../../../resource/' + nextItem + '.png')})` }} />
      </div>
    </div>
  )
}

export default Header;
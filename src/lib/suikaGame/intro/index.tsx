import { Fruit } from '../object/Fruit';
import styles from './index.module.scss';
import classNames from "classnames/bind";
import {useState} from "react";
const cx = classNames.bind(styles);

interface IntroProps {
  handleGameStart: () => void;
}

const Intro = ({ handleGameStart }: IntroProps) => {
  const [positionOffset, setPositionOffset] = useState(1);

  const positionCircularly = (totalElements: number, index: number) => {
    const radius = 150; // 조절 가능한 원의 반지름
    const angle = (2 * Math.PI * index) / totalElements;
    
    const x = radius * Math.cos(angle) * positionOffset
    const y = radius * Math.sin(angle) * positionOffset;

    return {
        top: `calc(50% + ${y}px - 24px)`,
        left: `calc(50% + ${x}px - 24px)`,
    };
};

  const fruitItemEls = Object.keys(Fruit).map((fruit, index) => {
    const itemPositions = positionCircularly(11, index);

    return (
      <li key={fruit} className={cx('listItem')}
        style={{
          backgroundImage: `url(${require('../../../resource/' + fruit + '.png')})`,
          top: itemPositions.top,
          left: itemPositions.left
        }} />
    )
  })

  const onClick = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        setPositionOffset(0.6);
        resolve(true);
      }, 0);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        setPositionOffset(3);
        resolve(true);
      }, 500);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        handleGameStart();
        resolve(true);
      }, 500);
    });
  }

  return (
    <div className={cx('introArea')}>
      <ul className={cx('listWrap')}>{fruitItemEls}</ul>

      <div className={cx('titleArea')}>
        <button className={cx('btn')} onClick={onClick}>GAME START</button>
      </div>
    </div>
  )
}

export default Intro;
import { useState, useEffect } from 'react';

interface NumberAnimationProps {
  value: number;
}

const NumberAnimation = ({ value }: NumberAnimationProps) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    let animationFrame: number = -1;
    let currentNumber = number;

    const updateNumber = () => {
      if (currentNumber < value) {
        currentNumber += 1;
        setNumber(currentNumber);
        animationFrame = requestAnimationFrame(updateNumber);
      }
    };

    animationFrame = requestAnimationFrame(updateNumber);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return <>{number}</>;
};

export default NumberAnimation;

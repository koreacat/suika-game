import { RENDER_WIDTH } from "./Size";

// 체리, 딸기, 포도, 오렌지, 감, 사과, 배, 복숭아, 파인애플, 멜론, 수박
export enum Fruit {
  CHERRY = "CHERRY",
  STRAWBERRY = "STRAWBERRY",
  GRAPES = "GRAPES",
  ORANGE = "ORANGE",
  PERSIMMON = "PERSIMMON",
  APPLE = "APPLE",
  PEAR = "PEAR",
  PEACH = "PEACH",
  PINEAPPLE = "PINEAPPLE",
  MELON = "MELON",
  WATERMELON = "WATERMELON",
}

export type FruitType = keyof typeof Fruit;

export const getFruitFeature = (fruit: FruitType) => {
  switch (fruit) {
    case Fruit.CHERRY:
      return {color: "#FF0000", radius: RENDER_WIDTH / 20, label: Fruit.CHERRY, score: 1, texture: `/${Fruit.CHERRY}.png`};
    case Fruit.STRAWBERRY:
      return {color: "#FF1493", radius: RENDER_WIDTH / 15, label: Fruit.STRAWBERRY, score: 3, texture: `/${Fruit.STRAWBERRY}.png`};
    case Fruit.GRAPES:
      return {color: "#4B0082", radius: RENDER_WIDTH / 12, label: Fruit.GRAPES, score: 6, texture: `/${Fruit.GRAPES}.png`};
    case Fruit.ORANGE:
      return {color: "#FFA500", radius: RENDER_WIDTH / 10, label: Fruit.ORANGE, score: 10, texture: `/${Fruit.ORANGE}.png`};
    case Fruit.PERSIMMON:
      return {color: "#FF4500", radius: RENDER_WIDTH / 8, label: Fruit.PERSIMMON, score: 15, texture: `/${Fruit.PERSIMMON}.png`};
    case Fruit.APPLE:
      return {color: "#FF6347", radius: RENDER_WIDTH / 7, label: Fruit.APPLE, score: 21, texture: `/${Fruit.APPLE}.png`};
    case Fruit.PEAR:
      return {color: "#D1E231", radius: RENDER_WIDTH / 6, label: Fruit.PEAR, score: 28, texture: `/${Fruit.PEAR}.png`};
    case Fruit.PEACH:
      return {color: "#FFDAB9", radius: RENDER_WIDTH / 5, label: Fruit.PEACH, score: 36, texture: `/${Fruit.PEACH}.png`};
    case Fruit.PINEAPPLE:
      return {color: "#FFD700", radius: RENDER_WIDTH / 4, label: Fruit.PINEAPPLE, score: 45, texture: `/${Fruit.PINEAPPLE}.png`};
    case Fruit.MELON:
      return {color: "#90EE90", radius: RENDER_WIDTH / 3.5, label: Fruit.MELON, score: 55, texture: `/${Fruit.MELON}.png`};
    case Fruit.WATERMELON:
      return {color: "#228B22", radius: RENDER_WIDTH / 3, label: Fruit.WATERMELON, score: 66, texture: `/${Fruit.WATERMELON}.png`};
  }
}

export const getRandomFruitFeature = () => {
  const fruits = Object.values(Fruit).slice(0, 5);
  const randomIndex = Math.floor(Math.random() * fruits.length); // 무작위 인덱스 선택
  return getFruitFeature(fruits[randomIndex]);
};

export const getNextFruitFeature = (currentFruit: Fruit) => {
  // 현재 과일의 순서를 찾기
  const currentIndex = Object.values(Fruit).indexOf(currentFruit);

  if (currentIndex === -1) {
    // 주어진 과일이 유효하지 않은 경우, 예외 처리
    return null;
  }

  // 다음 과일의 순서 계산
  const nextIndex = (currentIndex + 1) % Object.values(Fruit).length;

  // 다음 과일의 종류 가져오기
  const nextFruit = Object.values(Fruit)[nextIndex];

  // 다음 과일의 특성 가져오기
  const feature = getFruitFeature(nextFruit);

  return feature;
};
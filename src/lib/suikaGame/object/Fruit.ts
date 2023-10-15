import { RENDER_WIDTH } from "./Size";

// 체리, 딸기, 포도, 오렌지, 감, 사과, 배, 복숭아, 파인애플, 멜론, 수박
export enum Fruit {
  BLUEBERRY = "BLUEBERRY",
  STRAWBERRY = "STRAWBERRY",
  TANGERINE = "TANGERINE",
  TOMATO = "TOMATO",
  AVOCADO = "AVOCADO",
  // APPLE = "APPLE",
  // PEAR = "PEAR",
  // PEACH = "PEACH",
  // PINEAPPLE = "PINEAPPLE",
  // MELON = "MELON",
  WATERMELON = "WATERMELON",
}

export type FruitType = keyof typeof Fruit;

export const getFruitFeature = (fruit: FruitType) => {
  switch (fruit) {
    case Fruit.BLUEBERRY:
      return {radius: RENDER_WIDTH / 20, label: Fruit.BLUEBERRY, score: 1};
    case Fruit.STRAWBERRY:
      return {radius: RENDER_WIDTH / 15, label: Fruit.STRAWBERRY, score: 3};
    case Fruit.TANGERINE:
      return {radius: RENDER_WIDTH / 12, label: Fruit.TANGERINE, score: 6};
    case Fruit.TOMATO:
      return {radius: RENDER_WIDTH / 10, label: Fruit.TOMATO, score: 10};
    case Fruit.AVOCADO:
      return {radius: RENDER_WIDTH / 8, label: Fruit.AVOCADO, score: 15};
    // case Fruit.APPLE:
    //   return {radius: RENDER_WIDTH / 7, label: Fruit.APPLE, score: 21};
    // case Fruit.PEAR:
    //   return {radius: RENDER_WIDTH / 6, label: Fruit.PEAR, score: 28};
    // case Fruit.PEACH:
    //   return {radius: RENDER_WIDTH / 5, label: Fruit.PEACH, score: 36};
    // case Fruit.PINEAPPLE:
    //   return {radius: RENDER_WIDTH / 4, label: Fruit.PINEAPPLE, score: 45};
    // case Fruit.MELON:
    //   return {radius: RENDER_WIDTH / 3.5, label: Fruit.MELON, score: 55};
    case Fruit.WATERMELON:
      return {radius: RENDER_WIDTH / 3, label: Fruit.WATERMELON, score: 66};
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
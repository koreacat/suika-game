import Matter from "matter-js";

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
      return {color: "#FF0000", radius: 10};
    case Fruit.STRAWBERRY:
      return {color: "#FF1493", radius: 15};
    case Fruit.GRAPES:
      return {color: "#4B0082", radius: 20};
    case Fruit.ORANGE:
      return {color: "#FFA500", radius: 25};
    case Fruit.PERSIMMON:
      return {color: "#FF4500", radius: 30};
    case Fruit.APPLE:
      return {color: "#FF6347", radius: 35};
    case Fruit.PEAR:
      return {color: "#D1E231", radius: 40};
    case Fruit.PEACH:
      return {color: "#FFDAB9", radius: 50};
    case Fruit.PINEAPPLE:
      return {color: "#FFD700", radius: 60};
    case Fruit.MELON:
      return {color: "#90EE90", radius: 75};
    case Fruit.WATERMELON:
      return {color: "#228B22", radius: 90};
  }
}

export const getFruit = (fruit: FruitType) => {
  const feature = getFruitFeature(fruit);
  const radius = feature?.radius || 1;
  const color = feature?.color;
  return Matter.Bodies.circle(100, 30, radius, {
    restitution: 0,
    render: {
      fillStyle: color,
    }
  });
}
import Matter from "matter-js";
export declare enum Fruit {
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
    WATERMELON = "WATERMELON"
}
export type FruitType = keyof typeof Fruit;
export declare const getFruitFeature: (fruit: FruitType) => {
    color: string;
    radius: number;
} | undefined;
export declare const getFruit: (fruit: FruitType) => Matter.Body;

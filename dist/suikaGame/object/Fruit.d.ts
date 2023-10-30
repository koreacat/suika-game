export declare enum Fruit {
    BLUEBERRY = "BLUEBERRY",
    STRAWBERRY = "STRAWBERRY",
    TANGERINE = "TANGERINE",
    TOMATO = "TOMATO",
    AVOCADO = "AVOCADO",
    KOREANMELON = "KOREANMELON",
    APPLE = "APPLE",
    PEACH = "PEACH",
    COCONUT = "COCONUT",
    MELON = "MELON",
    WATERMELON = "WATERMELON",
    GOLDWATERMELON = "GOLDWATERMELON"
}
export type FruitType = keyof typeof Fruit;
export declare const getFruitFeature: (fruit: FruitType) => {
    radius: number;
    mass: number;
    label: Fruit;
    score: number;
} | undefined;
export declare const getRandomFruitFeature: () => {
    radius: number;
    mass: number;
    label: Fruit;
    score: number;
} | undefined;
export declare const getNextFruitFeature: (currentFruit: Fruit) => {
    radius: number;
    mass: number;
    label: Fruit;
    score: number;
} | null | undefined;

import { getRenderWidth } from "./Size";
export var Fruit;
(function (Fruit) {
    Fruit["BLUEBERRY"] = "BLUEBERRY";
    Fruit["STRAWBERRY"] = "STRAWBERRY";
    Fruit["TANGERINE"] = "TANGERINE";
    Fruit["TOMATO"] = "TOMATO";
    Fruit["AVOCADO"] = "AVOCADO";
    Fruit["KOREANMELON"] = "KOREANMELON";
    Fruit["APPLE"] = "APPLE";
    Fruit["PEACH"] = "PEACH";
    Fruit["COCONUT"] = "COCONUT";
    Fruit["MELON"] = "MELON";
    Fruit["WATERMELON"] = "WATERMELON";
    Fruit["GOLDWATERMELON"] = "GOLDWATERMELON";
})(Fruit || (Fruit = {}));
export var getFruitFeature = function (fruit) {
    switch (fruit) {
        case Fruit.BLUEBERRY:
            return { radius: getRenderWidth() / 24, mass: 0.8, label: Fruit.BLUEBERRY, score: 1 };
        case Fruit.STRAWBERRY:
            return { radius: getRenderWidth() / 18, mass: 1, label: Fruit.STRAWBERRY, score: 3 };
        case Fruit.TANGERINE:
            return { radius: getRenderWidth() / 12, mass: 1, label: Fruit.TANGERINE, score: 6 };
        case Fruit.TOMATO:
            return { radius: getRenderWidth() / 10, mass: 1, label: Fruit.TOMATO, score: 10 };
        case Fruit.AVOCADO:
            return { radius: getRenderWidth() / 8, mass: 1, label: Fruit.AVOCADO, score: 15 };
        case Fruit.KOREANMELON:
            return { radius: getRenderWidth() / 7, mass: 1, label: Fruit.KOREANMELON, score: 21 };
        case Fruit.APPLE:
            return { radius: getRenderWidth() / 6, mass: 1, label: Fruit.APPLE, score: 28 };
        case Fruit.PEACH:
            return { radius: getRenderWidth() / 5.3, mass: 1, label: Fruit.PEACH, score: 36 };
        case Fruit.COCONUT:
            return { radius: getRenderWidth() / 4.6, mass: 1, label: Fruit.COCONUT, score: 45 };
        case Fruit.MELON:
            return { radius: getRenderWidth() / 3.95, mass: 1, label: Fruit.MELON, score: 55 };
        case Fruit.WATERMELON:
            return { radius: getRenderWidth() / 3.5, mass: 1, label: Fruit.WATERMELON, score: 66 };
        case Fruit.GOLDWATERMELON:
            return { radius: getRenderWidth() / 3.5, mass: 1, label: Fruit.GOLDWATERMELON, score: 100 };
    }
};
export var getRandomFruitFeature = function () {
    var fruits = Object.values(Fruit).slice(0, 5);
    var randomIndex = Math.floor(Math.random() * fruits.length); // 무작위 인덱스 선택
    return getFruitFeature(fruits[randomIndex]);
};
export var getNextFruitFeature = function (currentFruit) {
    // 현재 과일의 순서를 찾기
    var currentIndex = Object.values(Fruit).indexOf(currentFruit);
    if (currentIndex === -1) {
        // 주어진 과일이 유효하지 않은 경우, 예외 처리
        return null;
    }
    // 다음 과일의 순서 계산
    var nextIndex = (currentIndex + 1) % Object.values(Fruit).length;
    // 다음 과일의 종류 가져오기
    var nextFruit = Object.values(Fruit)[nextIndex];
    // 다음 과일의 특성 가져오기
    var feature = getFruitFeature(nextFruit);
    return feature;
};

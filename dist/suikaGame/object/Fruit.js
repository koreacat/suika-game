import Matter from "matter-js";
// 체리, 딸기, 포도, 오렌지, 감, 사과, 배, 복숭아, 파인애플, 멜론, 수박
export var Fruit;
(function (Fruit) {
    Fruit["CHERRY"] = "CHERRY";
    Fruit["STRAWBERRY"] = "STRAWBERRY";
    Fruit["GRAPES"] = "GRAPES";
    Fruit["ORANGE"] = "ORANGE";
    Fruit["PERSIMMON"] = "PERSIMMON";
    Fruit["APPLE"] = "APPLE";
    Fruit["PEAR"] = "PEAR";
    Fruit["PEACH"] = "PEACH";
    Fruit["PINEAPPLE"] = "PINEAPPLE";
    Fruit["MELON"] = "MELON";
    Fruit["WATERMELON"] = "WATERMELON";
})(Fruit || (Fruit = {}));
export var getFruitFeature = function (fruit) {
    switch (fruit) {
        case Fruit.CHERRY:
            return { color: "#FF0000", radius: 10 };
        case Fruit.STRAWBERRY:
            return { color: "#FF1493", radius: 15 };
        case Fruit.GRAPES:
            return { color: "#4B0082", radius: 20 };
        case Fruit.ORANGE:
            return { color: "#FFA500", radius: 25 };
        case Fruit.PERSIMMON:
            return { color: "#FF4500", radius: 30 };
        case Fruit.APPLE:
            return { color: "#FF6347", radius: 35 };
        case Fruit.PEAR:
            return { color: "#D1E231", radius: 40 };
        case Fruit.PEACH:
            return { color: "#FFDAB9", radius: 50 };
        case Fruit.PINEAPPLE:
            return { color: "#FFD700", radius: 60 };
        case Fruit.MELON:
            return { color: "#90EE90", radius: 75 };
        case Fruit.WATERMELON:
            return { color: "#228B22", radius: 90 };
    }
};
export var getFruit = function (fruit) {
    var feature = getFruitFeature(fruit);
    var radius = (feature === null || feature === void 0 ? void 0 : feature.radius) || 1;
    var color = feature === null || feature === void 0 ? void 0 : feature.color;
    return Matter.Bodies.circle(100, 30, radius, {
        restitution: 0,
        render: {
            fillStyle: color,
        }
    });
};

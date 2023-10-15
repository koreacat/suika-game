import Matter from "matter-js";
import { RENDER_WIDTH, RENDER_HEIGHT } from "./Size";

export const GuideLineColor = '#ffffff30';

export const GuideLine = Matter.Bodies.rectangle(
    RENDER_WIDTH / 2,
    RENDER_HEIGHT / 2 + 40,
    5,
    RENDER_HEIGHT,
    {
        isStatic: true, 
        isSensor: true, 
        collisionFilter: { group: -1 }, 
        render: { fillStyle: GuideLineColor },
        label: 'guideLine',
    }
)
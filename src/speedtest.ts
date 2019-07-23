import { BotPos } from "./BotPhysics";
import { Box2DPhysics } from "./Box2DPhysics";

let botPos = new BotPos(1,4);
let power = {
    left: 1,
    right: 1,
}

function onUpdate(positions:BotPos[]) {
    botPos = positions[0];
}

let engine = new Box2DPhysics(onUpdate, [botPos]);
engine.setPower([power]);

console.log("Started test");

setTimeout(() => {
    console.log(`Bot is at: ${botPos.x}, expects 4.89`);
    process.exit();
}, 1000)
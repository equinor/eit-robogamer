import BotPos from "./models/BotPos";
import EnginePower from "./models/EnginePower";

export default interface BotPhysics {
    start(onUpdate: PositionCallback, initialPosition: readonly BotPos[]): void;
    setPower(power: EnginePower[]): void;
}

export interface PositionCallback{
    (this: void, positions: BotPos[]): void
}


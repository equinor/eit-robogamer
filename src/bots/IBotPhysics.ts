import EnginePower from "./EnginePower";
import BotPos from "./BotPos";

export default interface IBotPhysics {
    start(onUpdate: IPositionCallback, initialPosition: readonly BotPos[], timestamp: number): void;
    setPower(power: EnginePower[]): void;
}

export interface IPositionCallback{
    (this: void, positions: BotPos[]): void
}


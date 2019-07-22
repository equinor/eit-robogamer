export interface BotPos {
    x: number;
    y: number;
    angle: number;
}

export interface EnginePower {
    left: number, // from -1.0 to 1.0
    right: number, // from -1.0 to 1.0
}

export interface PositionCallback{
    (this: void, positions: BotPos[]): void
}


export abstract class BotPhysics {
    protected onUpdate: PositionCallback;
    constructor(onUpdate: PositionCallback) {
        this.onUpdate = onUpdate;
    }
    public abstract setPower(power: [EnginePower]): void;
}

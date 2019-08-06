export class BotPos {
    x: number; //from 0.0 to 16.0
    y: number; //from 0.0 to 9.0
    angle: number; // radians

    constructor(x = 0,y = 0, angle = 0){
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
}

export interface EnginePower {
    left: number, // from -1.0 to 1.0
    right: number, // from -1.0 to 1.0
}

export interface PositionCallback{
    (this: void, positions: BotPos[]): void
}


export interface BotPhysics {
    start(onUpdate: PositionCallback, initialPosition: BotPos[]): void;
    setPower(power: EnginePower[]): void;
}

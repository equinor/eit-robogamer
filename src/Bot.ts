import { BotPos, EnginePower } from "./BotPhysics";

export class Bot {
    x: number;
    y: number;
    angle: number;
    private _power: () => EnginePower;

    constructor(x = 0,y = 0, angle = 0){
        this.x = x;
        this.y = y;
        this.angle = angle;

        this._power = () => {return {
            left: 0,
            right: 0,
        }};
    }


    goTo(x: number, y: number): void {

    }

    turnToPoint(x: number, y: number): void {
        var dy = y - this.y;
        var dx = x - this.x;
        this.turnToAngle(Math.atan2(dy,dx));
    }

    turnToAngle(target: number): void {
        this._power = () => {
            let offset = Math.atan2(Math.sin(target-this.angle), Math.cos(target-this.angle));
            let right = offset / Math.PI;
            return {
                left: -right,
                right: right,
            }
        }
    }

    stop(): void {
        this.power = {
            left: 0,
            right: 0,
        }
    }

    get pos(): BotPos {
        return {
            x: this.x,
            y: this.y,
            angle: this.angle
        }
    }

    set pos(pos: BotPos){
        this.x = pos.x;
        this.y = pos.y;
        this.angle = pos.angle;
    }

    get power() : EnginePower {
        return this._power();
    }

    set power(power: EnginePower){
        this._power = () => power;
    }
}
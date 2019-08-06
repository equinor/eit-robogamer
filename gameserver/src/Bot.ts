import { BotPos, EnginePower } from "./BotPhysics";

export default class Bot {
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
        this._power = () => {
            let dy = y - this.y;
            let dx = x - this.x;
            let direction = Math.atan2(dy,dx);
            let offset = Math.atan2(Math.sin(direction-this.angle), Math.cos(direction-this.angle));
            let right = 1;
            let left = 1;
            if(offset > 0 ){
                left = offset / Math.PI
            }
            if(offset < 0) {
                right = -offset / Math.PI
            }
            let distance = Math.sqrt(dy*dy + dx * dx);
            let maxPower = Math.min(distance, 1);
            
            return {
                left: left * maxPower,
                right: right * maxPower,
            }
        }

    }

    turnToPoint(x: number, y: number): void {
        let dy = y - this.y;
        let dx = x - this.x;
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
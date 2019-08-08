import BotPos from "./BotPos";
import EnginePower from "./EnginePower";

export default class Bot{
    public constructor(
        public readonly pos: BotPos,
        public readonly controller: BotController = stop,
        public readonly canShotAt: number = 0,
        public readonly disabledUntil: number = 0,
    ) {
    }

    public setPos(pos: BotPos): Bot {
        return this.set({pos: pos})
    }

    public get x(): number{
        return this.pos.x;
    }

    public get y(): number{
        return this.pos.y;
    }

    public get angle(): number{
        return this.pos.angle;
    }

    public get power(): EnginePower {
        return this.controller(this);
    }
  

    public setPower(power: EnginePower) { 
        return this.set({controller: setPower(power)});
    }

    public goTo(x: number, y: number): Bot{
        return this.set({controller: goTo(x,y)});
    }

    public turnToPoint(x: number, y: number): Bot{
        let dy = y - this.y;
        let dx = x - this.x;
        return this.turnToAngle(Math.atan2(dy,dx));
    }

    public turnToAngle(target: number): Bot{
        return this.set({controller: turnToAngle(target)});
    }

    public stop() {
        return this.set({controller: stop});
    }

    public set({pos = this.pos, controller = this.controller, canShotAt = this.canShotAt, disabledUntil = this.disabledUntil}): Bot{
        return new Bot(pos, controller, canShotAt, disabledUntil)
    }
}

export interface BotController{
    (pos: BotPos): EnginePower
}

function goTo(x: number, y: number): BotController {
    return (pos:BotPos) => {
        let dy = y - pos.y;
        let dx = x - pos.x;
        let direction = Math.atan2(dy,dx);
        let offset = Math.atan2(Math.sin(direction-pos.angle), Math.cos(direction-pos.angle));
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

function turnToAngle(target: number): BotController {
    return (pos: BotPos) => {
        let offset = Math.atan2(Math.sin(target-pos.angle), Math.cos(target-pos.angle));
        let right = offset / Math.PI;
        return {
            left: -right,
            right: right,
        }
    }
}

function setPower(power: EnginePower): BotController {
    return () => power;
}

function stop(): EnginePower {
    return {
        left: 0,
        right: 0,
    }
}
import BotPos from "../bots/BotPos";
import EnginePower from "../bots/EnginePower";


export default class Bot{
    public constructor(
        public readonly pos: BotPos,
        public readonly controller: BotController = stop,
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
        return this.controller(this.pos);
    }
  

    public setPower(power: EnginePower) { 
        return this.set({controller: setPower(power)});
    }

    public goTo(x: number, y: number): Bot{
        return this.set({controller: goTo(x,y)});
    }

    public turnToPoint(x: number, y: number): Bot{
        return this.set({controller: turnToPoint(x,y)});
    }

    public stop() {
        return this.set({controller: stop});
    }

    public set({pos = this.pos, controller = this.controller}): Bot{
        return new Bot(pos, controller)
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
            left = -offset / Math.PI
        }
        if(offset < 0) {
            right = offset / Math.PI
        }
        let distance = Math.sqrt(dy*dy + dx * dx);
        let maxPower = Math.min(distance, 1);
        
        return new EnginePower(left * maxPower, right * maxPower);
    }

}

function turnToPoint(x: number, y: number): BotController {
    return (pos: BotPos) => {
        const dy = y - pos.y;
        const dx = x - pos.x;
        const target = Math.atan2(dy,dx);
        const offset = Math.atan2(Math.sin(target-pos.angle), Math.cos(target-pos.angle));
        const right = offset / Math.PI * 0.25; // lets turn nice and slowly.
        return new EnginePower(-right, right);
    }
}

function setPower(power: EnginePower): BotController {
    return () => power;
}

function stop(): EnginePower {
    return EnginePower.NoPower;
}
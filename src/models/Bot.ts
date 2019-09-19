import BotPos from "../bots/BotPos";
import EnginePower from "../bots/EnginePower";
import Point from "./Point";
import PidController from "./PidController";


export default class Bot{
    private pid = new PidController(0.1, 0.1, 0.1);
    public constructor(
        public readonly pos: BotPos,
        public readonly controller: BotController = stop,
    ) {
    }

    public setPos(pos: BotPos): Bot {
        return this.set({pos: pos})
    }

    public get power(): EnginePower {
        return this.controller(this.pos);
    }
  

    public setPower(power: EnginePower) { 
        return this.set({controller: setPower(power)});
    }

    public goTo(point:Point): Bot{
        return this.set({controller: goTo(point, this.pid)});
    }

    public turnToPoint(point:Point): Bot{
        return this.set({controller: turnToPoint(point)});
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

let printTimer = Date.now();

function goTo(target: Point, pid: PidController): BotController {
    return (pos: BotPos) => {
        const lineToTarget = target.sub(pos);
        let angleOffset = pos.angle.sub(lineToTarget.asAngle()).radians;
        pid.updateInput(angleOffset);
        let angleInput = pid.getInput();
        let right = -angleInput;
        let left = angleInput;
        let distance = Math.sqrt(Math.pow(lineToTarget.x, 2) + Math.pow(lineToTarget.y, 2));
        let speed = - Math.min(Math.max(distance / 5, -0.2), -0.15);
        if (Date.now() - printTimer > 1000) {
            printTimer = Date.now();
            console.log(`Position: (${r2d(pos.x, 1000)}, ${r2d(pos.y, 1000)}), Power: (${r2d(left, 1000)}, ${r2d(right, 1000)}), Speed: ${r2d(speed, 1000)}, Angle: ${r2d(pos.radians, 1000)}, Angle offset: ${r2d(angleOffset, 1000)}, Angle input: ${r2d(angleInput, 1000)}, Distance: ${r2d(distance, 1000)}`)
        }
        return new EnginePower(speed + left / Math.PI, speed + right / Math.PI);
    }

}

function r2d(num: number, len: number) {
    return Math.round(num * len) / len;
}

function turnToPoint(point: Point): BotController {
    return (pos: BotPos) => {
        const target = point.sub(pos.point).asAngle();
        const right = target.sub(pos.angle).normalized * 0.5;
        return new EnginePower(-right, right);
    }
}

function setPower(power: EnginePower): BotController {
    return () => power;
}

function stop(): EnginePower {
    return EnginePower.NoPower;
}
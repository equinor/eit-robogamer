import Bot from "../models/Bot";
import EnginePower from "../bots/EnginePower";
import Point from "../models/Point";

export default class MyBot {
    public constructor(public _bot: Bot){
        
    }

    public goTo(x: number, y:number):void {
        this._bot = this._bot.goTo(new Point(x,y));
    }

    public turnToPoint(x: number, y: number): void {
        this._bot = this._bot.turnToPoint(new Point(x,y));
    }

    public setPower(left: number, right: number): void {
        this._bot = this._bot.setPower(new EnginePower(left,right));
    }

    public stop(): void {
        this._bot = this._bot.stop();
    }
}
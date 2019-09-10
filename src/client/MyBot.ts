import Bot from "../models/Bot";
import EnginePower from "../bots/EnginePower";

export default class MyBot {
    public constructor(public _bot: Bot){
        
    }

    public goTo(x: number, y:number):void {
        this._bot = this._bot.goTo(x,y);
    }

    public turnToPoint(x: number, y: number): void {
        this._bot = this._bot.turnToPoint(x,y);
    }

    public setPower(left: number, right: number): void {
        this._bot = this._bot.setPower(new EnginePower(left,right));
    }

    public stop(): void {
        this._bot = this._bot.stop();
    }
}
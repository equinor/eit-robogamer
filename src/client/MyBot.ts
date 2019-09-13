import Bot from "../models/Bot";
import EnginePower from "../bots/EnginePower";
import Point from "../models/Point";

export default class MyBot {
    public constructor(private _get: () => Bot, private _set: (bot:Bot) => void ){
        
    }

    public get x():number {
        return this._get().pos.x;
    }

    public get y():number {
        return this._get().pos.y;
    }

    public get radians():number {
        return this._get().pos.angle.radians;
    }

    public get degrees():number {
        return this._get().pos.angle.degrees;
    }

    public goTo(x: number, y:number):void {
        this._set(this._get().goTo(new Point(x,y)));
    }

    public turnToPoint(x: number, y: number): void {
        this._set(this._get().turnToPoint(new Point(x,y)));
    }

    public setPower(left: number, right: number): void {
        this._set(this._get().setPower(new EnginePower(left,right)));
    }

    public stop(): void {
        this._set(this._get().stop());
    }
}
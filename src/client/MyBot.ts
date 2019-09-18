import Bot from "../models/Bot";
import EnginePower from "../bots/EnginePower";
import Point from "../models/Point";
import BotPos from "../bots/BotPos";

export default class MyBot {
    public constructor(public _get: () => Bot, public _set: (bot:Bot) => void ){
        
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

    public calibrate(left: number, right: number) {
        this._set(this._get().setBasePower(new EnginePower(left, right)));
    }

    public done_left(){
        this._set(this._get().done_left())
    }

    public done_right(){
        this._set(this._get().done_right())
    }

    public set_prev_pos(pos: BotPos){
        this._set(this._get().set_prev_pos(pos))
    }

    public runBasePower() {
        this._set(this._get().setPower(this._get().base_power));
    }
    public runNoPower() {
        this._set(this._get().setPower(new EnginePower(0,0)));
    }
}
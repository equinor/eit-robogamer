import MyBot from "./MyBot";
import Bot from "../models/Bot";

export default class State{
    public _bots: MyBot[];

    public constructor(public _gametime: number, bots: readonly Bot[]){
        this._bots = bots.map(b => new MyBot(b));
    }

    public gametime(): number{
        return this._gametime;
    }

    public myBots(): MyBot[]{
        return this._bots;
    }
    
    getBots(): readonly Bot[] {
        return this._bots.map(m => m._bot);
    }
}
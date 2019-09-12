import MyBot from "./MyBot";
import Bot from "../models/Bot";

export default class State{
    public _bots: MyBot[];

    public constructor(public _gameTime: number, bots: readonly Bot[]){
        this._bots = bots.map(b => new MyBot(b));
    }

    public gameTime(): number{
        return this._gameTime;
    }

    public myBots(): MyBot[]{
        return this._bots;
    }
    
    getBots(): readonly Bot[] {
        return this._bots.map(m => m._bot);
    }
}
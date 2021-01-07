import MyBot from "./MyBot";
import Bot from "../models/Bot";
import { Team } from "../models/State";
import Game from "../Game";
import BotPos from "../bots/BotPos";

export default class State{
    public _bots: MyBot[];

    public constructor(private readonly _game: Game, private _team: Team ){
        const game = this._game;
        const team = this._team;

        this._bots = this._game.state.getTeam(this._team).map((_, i ) => {
            function get():Bot {
                return game.state.getTeam(team)[i];
            }

            function set(bot: Bot) {
                var bots = [...game.state.getTeam(team)];
                bots[i] = bot;
                game.state = game.state.updateTeam(team, bots); 
            }
            return new MyBot(get, set);
        });
    }

    public get gameTime(): number{
        return this._game.state.gameTime;
    }

    public get myBots(): MyBot[]{
        return this._bots;
    }

    public get otherBots(): BotPos[] {
        if(this._team == Team.Red){
            return this._game.state.getTeam(Team.Blue).map(b => b.pos);
        }
        return this._game.state.getTeam(Team.Red).map(b => b.pos);
    }
}
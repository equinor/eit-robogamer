import BotPos from "./bots/BotPos";
import IBotPhysics from "./bots/IBotPhysics";
import State from "./models/State";
import ClientState from "./client/State";
import ITeamClient from "./client/ITeamClient";

export default class Game {
    public onUpdate:(state: State) => void = () => {};

    private _botPhysics: IBotPhysics;
    private _state: State;
    private _lastUpdate: number = Date.now()

    constructor(botPhysics: IBotPhysics, private _red: ITeamClient, private _blue: ITeamClient) {
        this._state = State.NewGame([new BotPos(2,2), new BotPos(2,4.5), new BotPos(2,7), new BotPos(5,4.5)], [new BotPos(14,2), new BotPos(14,4.5), new BotPos(14,7), new BotPos(11,4.5)]);

        this._botPhysics = botPhysics;
        this._botPhysics.start(this.step.bind(this), this._state.getBotList());
        this._red.start();
        this._blue.start();
    }

    step(positions:BotPos[]) {
        this.updateTime();
        this._state = this._state.setBotList(positions);
        this.updateRed();
        this.updateBlue();
        this._botPhysics.setPower(this._state.getPower());
        this.onUpdate(this._state);
    }

    updateTime() {
        const newTime = Date.now();
        this._state = this._state.addMsToGameTime(newTime - this._lastUpdate);
        this._lastUpdate = newTime;
    }

    updateRed() {
        const state = new ClientState(this._state.gameTime, this._state.redTeam);
        this._red.update(state);
        this._state = this._state.updateRedTeam(state.getBots());
    }

    updateBlue() {
        const state = new ClientState(this._state.gameTime, this._state.blueTeam);
        this._blue.update(state);
        this._state = this._state.updateBlueTeam(state.getBots());
    }
}
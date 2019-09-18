import BotPos from "./bots/BotPos";
import IBotPhysics from "./bots/IBotPhysics";
import State, { Team } from "./models/State";
import ClientState from "./client/State";
import ITeamClient from "./client/ITeamClient";
import Point from "./models/Point";

interface Client {
    client: ITeamClient;
    state: ClientState;
}

export default class Game {
    public onUpdate:(state: State) => void = () => {};

    private _botPhysics: IBotPhysics;
    private _state: State;
    private _lastUpdate: number = Date.now()
    private _red: Client;
    private _blue: Client;

    constructor(botPhysics: IBotPhysics, red: ITeamClient, blue: ITeamClient) {
        //this._state = State.NewGame([new Point(2,2), new Point(2,4.5), new Point(2,7), new Point(5,4.5)], [new Point(14,2), new Point(14,4.5), new Point(14,7), new Point(11,4.5)]);
        this._state = State.NewGame([new Point(2,2)], []);
        this._red = {
            client: red,
            state: new ClientState(this, Team.Red)
        }
        this._blue = {
            client: blue,
            state: new ClientState(this, Team.Blue)
        }
        this._botPhysics = botPhysics;
        this._botPhysics.start(this.step.bind(this), this._state.getBotList());
        this._red.client.start(this._red.state);
        this._blue.client.start(this._red.state);
    }
    
    public get state(): State{
        return this._state;
    }

    public set state(state: State) {
        this._state = state;
    }

    private step(positions:BotPos[]) {
        this.updateTime();
        this._state = this._state.setBotList(positions);
        this._red.client.update(this._red.state);
        this._blue.client.update(this._blue.state);
        this._botPhysics.setPower(this._state.getPower());
        this.onUpdate(this._state);
    }

    private updateTime() {
        const newTime = Date.now();
        this._state = this._state.addMsToGameTime(newTime - this._lastUpdate);
        this._lastUpdate = newTime;
    }
}
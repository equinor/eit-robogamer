import Bot from "./Bot";
import BotPos from "../bots/BotPos";
import Point from "./Point";
import Angle from "./Angle";
import EnginePower from "../bots/EnginePower";

export enum Team {
    Red,
    Blue,
}

export default class State {
    public constructor(
        public readonly redTeam: readonly Bot[],
        public readonly blueTeam: readonly Bot[],
        public readonly gameTime: number, // Seconds since match started in game time.
    ) { }

    public getBotList(): readonly BotPos[] {
        return [...this.redTeam.map(b => b.pos), ...this.blueTeam.map(b => b.pos)];
    }

    public setBotList(pos:readonly BotPos[]): State {
        const red = pos.slice(0, this.redTeam.length);
        const blue = pos.slice(this.redTeam.length);
        const redTeam = this.redTeam.map((bot, i) => bot.setPos(red[i]));
        const blueTeam = this.blueTeam.map((bot, i) => bot.setPos(blue[i]));

        return this.set({
            redTeam: redTeam,
            blueTeam: blueTeam
        });
    }

    public updateBots(updater: (bots: Bot) => Bot): State {
        return this.set({
            redTeam: this.redTeam.map(updater),
            blueTeam: this.blueTeam.map(updater)
        });
    }

    public getTeam(team: Team): readonly Bot[]{
        if(team == Team.Red) {
            return this.redTeam;
        }
        if(team == Team.Blue) {
            return this.blueTeam;
        }
        return [];
    }

    public updateTeam(team: Team, bots: readonly Bot[]): State{
        if(team == Team.Red) {
            return this.set({redTeam: bots});
        }
        if(team == Team.Blue) {
            return this.set({blueTeam: bots});
        }
        return this;
    }

    public updateRedTeam(red: readonly Bot[]): State {
        return this.set({redTeam: red});
    }
    public updateBlueTeam(blue: readonly Bot[]): State {
        return this.set({blueTeam: blue});
    }

    public addMsToGameTime(ms:number): State {
        const newTime = this.gameTime + ms / 1000;
        return this.set({gameTime: newTime});
    }

    public getPower() {
        return [...this.redTeam.map(b => b.power), ...this.blueTeam.map(b => b.power)];
    }

    public set({ redTeam = this.redTeam, blueTeam = this.blueTeam, gameTime = this.gameTime, }): State {
        return new State(redTeam, blueTeam, gameTime);
    }

    public static readonly Default: State = new State([], [], 0);

    public static NewGame(red: readonly Point[], blue: readonly Point[]) {
        const redTeam = red.map((point) => new Bot(new BotPos(point,new Angle(0)), new BotPos(point), new EnginePower()));
        const blueTeam = blue.map((point) => new Bot(new BotPos(point),  new BotPos(point), new EnginePower()));
        return new State(redTeam, blueTeam, 0);
    }
}
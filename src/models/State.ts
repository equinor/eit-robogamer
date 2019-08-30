import Shot from "./Shot";
import Bot from "./Bot";
import BotPos from "./BotPos";

export default class State {
    public constructor(
        public readonly redTeam: readonly Bot[],
        public readonly blueTeam: readonly Bot[],
        public readonly score: number, // 1.0 red team vicory, 0.0 blue team victory
        public readonly gameTime: number, // Seconds since match started in gametime.
        public readonly shots: readonly Shot[],
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

    public getPower() {
        return [...this.redTeam.map(b => b.power), ...this.blueTeam.map(b => b.power)];
    }

    public set({ redTeam = this.redTeam, blueTeam = this.blueTeam, score = this.score, gameTime = this.gameTime, shots = this.shots }): State {
        return new State(redTeam, blueTeam, score, gameTime, shots);
    }

    public static readonly Default: State = new State([], [], 0.5, 0, []);

    public static NewGame(red: readonly BotPos[], blue: readonly BotPos[]) {
        const redTeam = red.map((pos) => new Bot(pos));
        const blueTeam = blue.map((pos) => new Bot(pos));
        return new State(redTeam, blueTeam, 0.5, 0, []);
    }
}
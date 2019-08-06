import { BotPhysics, BotPos } from "./BotPhysics";
import Bot from "./Bot";
import { GameState } from "./GameState";

export default class Game {
    public onUpdate = () => {};


    private _botPhysics: BotPhysics;
    private _bots: Bot[] = [new Bot(2,2), new Bot(2,4.5), new Bot(2,7), new Bot(5,4.5), new Bot(14,2), new Bot(14,4.5), new Bot(14,7), new Bot(11,4.5)];

    constructor(botPhysics: BotPhysics) {
        this._botPhysics = botPhysics;
        this._botPhysics.start(this.step.bind(this), this._bots);
        setInterval(this.update.bind(this), 1000)
    }

    update() {
        for (const bot of this._bots) {
            var r = Math.random();
            if(r < 0.25) {
                bot.goTo(Math.random() * 16,Math.random() * 9);
                continue;
            }
            if(r < 0.5) {
                bot.turnToPoint(Math.random() * 16,Math.random() * 9);
                continue;
            }
            if(r < 0.75) {
                bot.power = {
                    left: (Math.random() * 2) - 1,
                    right: (Math.random() * 2) - 1,
                };
                continue;
            }
            bot.stop();
        }
    }

    step(positions:BotPos[]) {
        const length = Math.min(this._bots.length, positions.length);
        for (let i = 0; i < length; i += 1) {
            this._bots[i].pos = positions[i];
        }

        this._botPhysics.setPower(this._bots.map((b) => b.power))

        this.onUpdate();
    }

    get state() {
        let state = new GameState();
        state.bots = this._bots;
        return state;
    }
}
import BotPos from "./models/BotPos";
import BotPhysics from "./BotPhysics";
import State from "./models/State";

export default class Game {
    public onUpdate:(state: State) => void = () => {};

    private _botPhysics: BotPhysics;
    private _state: State;

    constructor(botPhysics: BotPhysics) {
        this._state = State.NewGame([new BotPos(2,2), new BotPos(2,4.5), new BotPos(2,7), new BotPos(5,4.5)], [new BotPos(14,2), new BotPos(14,4.5), new BotPos(14,7), new BotPos(11,4.5)]);

        this._botPhysics = botPhysics;
        this._botPhysics.start(this.step.bind(this), this._state.getBotList());

        setInterval(this.update.bind(this), 1000)
    }

    update() {
        this._state = this._state.updateBots(bot => {
            var r = Math.random();
            if(r < 0.25) {
                return bot.goTo(Math.random() * 16,Math.random() * 9);
            }
            if(r < 0.5) {
                return bot.turnToPoint(Math.random() * 16,Math.random() * 9);
            }
            if(r < 0.75) {
                return bot.setPower({
                    left: (Math.random() * 2) - 1,
                    right: (Math.random() * 2) - 1,
                });
            }
            return bot.stop();
        });
    }

    step(positions:BotPos[]) {
        this._state = this._state.setBotList(positions);
        this._botPhysics.setPower(this._state.getPower());
        this.onUpdate(this._state);
    }
}
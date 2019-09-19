import State from "../src/client/State";
import ITeamClient from "../src/client/ITeamClient";

export default class RandomStrategy implements ITeamClient {
    private timer = 0;
    private updateRate = 250;
    private targetX = 8;
    private targetY = 4.5;

    public start() {
        this.timer = Date.now();
    }

    public update(state: State) {
        let now = Date.now();
        if (Date.now() - this.timer < this.updateRate) {
            return;
        }
        this.timer = now;

        state.myBots.forEach(bot => {
            if (Math.abs(bot.x - this.targetX) < 0.5 && Math.abs(bot.y - this.targetY) < 0.5) {
                this.targetX = Math.random() * 14 + 1;
                this.targetY = Math.random() * 7 + 1;
            }
            bot.goTo(this.targetX, this.targetY);
            return;
            // var r = Math.random();
            // if(r < 0.25) {
            //     bot.goTo(Math.random() * 16,Math.random() * 9);
            //     return;
            // }
            // if(r < 0.5) {
            //     bot.turnToPoint(Math.random() * 16,Math.random() * 9);
            //     return;
            // }
            // if(r < 0.75) {
            //     bot.setPower((Math.random() * 2) - 1, (Math.random() * 2) - 1);
            //     return;
            // }
            // bot.stop();
        });
    }
}

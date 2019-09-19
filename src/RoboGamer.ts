import { Mode } from "./models/Options";
import { parseArgs } from "./Cli";
import Game from "./Game";
import UiClient from "./UiClient";
import Loader from "./Loader";
import ITeamClient from "./client/ITeamClient";
import FakeBots from "./bots/FakeBots";
import RealBots from "./bots/RealBots";
import RandomStrategy from "../strategies/testRandom";

export default class RoboGamer {
    public static main(args: string[]) {
        const options = parseArgs(args);
        const red = new RandomStrategy();
        const blue = new RandomStrategy();


        switch (options.mode) {
            case Mode.Sim:
                this.Sim(red, blue);
                break;
            case Mode.Real:
                this.Real(red, blue);
                break;
            default:
                throw new Error(`Unknown mode ${options.mode}`);
        }
    }

    public static Sim(red: ITeamClient, blue: ITeamClient) {
        let physic = new FakeBots();
        let game = new Game(physic, red, blue);
        let uiClient = new UiClient();

        game.onUpdate = uiClient.newState.bind(uiClient);
    }

    public static Real(red: ITeamClient, blue: ITeamClient) {
        let physic = new RealBots(Loader.roboConfig());
        let game = new Game(physic, red, blue);
        let uiClient = new UiClient();

        game.onUpdate = uiClient.newState.bind(uiClient);
    }
}
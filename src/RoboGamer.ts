import { Mode } from "./models/Options";
import { parseArgs } from "./Cli";
import Game from "./Game";
import UiClient from "./UiClient";
import Loader from "./Loader";
import ITeamClient from "./client/ITeamClient";
import FakeBots from "./bots/FakeBots";
import RealBots from "./bots/RealBots";
import Calibrator from "./ai/Calibrator";

export default class RoboGamer {
    public static main(args: string[]) {
        const options = parseArgs(args);
        const red = Loader.team(options.red);
        const blue = Loader.team(options.blue);


        switch (options.mode) {
            case Mode.Calibrate:
                this.Calibrate();
                break;
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

    public static Calibrate() {
        let physic = new RealBots(Loader.roboConfig());
        //let physic = new FakeBots();
        let red_calibrator = new Calibrator("red");
        let blue_calibrator = new Calibrator("blue");
        let game = new Game(physic, red_calibrator, blue_calibrator);
        let uiClient = new UiClient();

        game.onUpdate = uiClient.newState.bind(uiClient);
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
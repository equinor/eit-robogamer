import { Mode } from "./models/CliArgs";
import { getArgs } from "./Cli";
import Box2DPhysics from "./Box2DPhysics";
import Game from "./Game";
import UiClient from "./UiClient";

export default class RoboGamer {
    public static main() {
        const args = getArgs();
        switch (args.mode) {
            case Mode.Sim:
                this.Sim();
                break;
            case Mode.Real:
                this.Real();
                break;
            case Mode.Headless:
                this.Headless();
                break;
            default:
                throw new Error(`Unknown mode ${args.mode}`);
        }
    }

    public static Sim() {
        let physic = new Box2DPhysics();
        let game = new Game(physic);
        let uiClient = new UiClient();

        game.onUpdate = uiClient.newState.bind(uiClient);
    }

    public static Real() {
        throw new Error("Real mode is not implemented");
    }

    public static Headless() {
        throw new Error("Headless is not implemented");
    }
}
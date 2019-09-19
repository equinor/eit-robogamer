export enum Mode {
    Calibrate,
    Sim,
    Real,
}

export default class Options{
    public static readonly default = new Options("./localTeam.js", "./opponents/random.js", Mode.Calibrate);

    public constructor(
        public readonly red: string,
        public readonly blue: string,
        public readonly mode: Mode,
    ) {
    }

    public setRed(redTeam: string): Options {
        return this.set({red: redTeam});
    }
    public setBlue(blueTeam: string): Options {
        return this.set({blue: blueTeam});
    }
    public setReal(): Options {
        return this.set({mode: Mode.Real});
    }
    public setSim(): Options {
        return this.set({mode: Mode.Sim});
    }

    public set({red = this.red, blue = this.blue, mode = this.mode}): Options{
        return new Options(red, blue, mode)
    }
}

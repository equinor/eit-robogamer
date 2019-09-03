export enum Mode {
    Sim,
    Real,
    Headless
}

export default class CliArgs{
    public static readonly default = new CliArgs("local", "local", Mode.Sim);

    public constructor(
        public readonly red: string,
        public readonly blue: string,
        public readonly mode: Mode,
    ) {
    }

    public setRed(redTeam: string): CliArgs {
        return this.set({red: redTeam});
    }
    public setBlue(blueTeam: string): CliArgs {
        return this.set({blue: blueTeam});
    }
    public setHeadless(): CliArgs {
        return this.set({mode: Mode.Headless});
    }
    public setReal(): CliArgs {
        return this.set({mode: Mode.Real});
    }
    public setSim(): CliArgs {
        return this.set({mode: Mode.Sim});
    }

    public set({red = this.red, blue = this.blue, mode = this.mode}): CliArgs{
        return new CliArgs(red, blue, mode)
    }
}

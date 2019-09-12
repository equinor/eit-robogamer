import Options from "./models/Options";
import commander from 'commander';

export function parseArgs(args: string[]): Options {
    commander.version('0.0.1');
    commander
        .option('-r, --red-team <file>', 'The program to run as the red team')
        .option('-b, --blue-team <file>', 'The program to run as the blue team')
        .option('--sim', 'Run in simulator. Default')
        .option('--real', 'Run using real robots');
    
    commander.parse(args);

    var options = Options.default;

    if(commander.redTeam) options = options.setRed(commander.redTeam);
    if(commander.blueTeam) options = options.setBlue(commander.blueTeam);
    if(commander.real) options = options.setReal();
    if(commander.sim) options = options.setSim();

    return options;
}
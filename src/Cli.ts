import Options from "./models/Options";
import {Command} from 'commander';

export function parseArgs(args: string[]): Options {
    var program = new Command();
    program.version('0.0.1');
    program
        .option('-r, --red-team <file>', 'The program to run as the red team')
        .option('-b, --blue-team <file>', 'The program to run as the blue team')
        .option('--sim', 'Run in simulator. Default')
        .option('--real', 'Run using real robots');
    
        program.parse(args);

    var options = Options.default;

    if(program.redTeam) options = options.setRed(program.redTeam);
    if(program.blueTeam) options = options.setBlue(program.blueTeam);
    if(program.real) options = options.setReal();
    if(program.sim) options = options.setSim();

    return options;
}
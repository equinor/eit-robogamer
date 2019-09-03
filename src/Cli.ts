import CliArgs from "./models/CliArgs";
import commander from 'commander';

export function getArgs(): CliArgs {
    commander.version('0.0.1');
    commander
        .option('-r, --red-team <file>', 'The program to run as the red team')
        .option('-b, --blue-team <file>', 'The program to run as the blue team')
        .option('--sim', 'Run in simulator. Deafult')
        .option('--real', 'Run using real robots')
        .option('--headless', 'Run in simulator witout ui.');
    
    commander.parse(process.argv);

    var args = CliArgs.default;

    if(commander.redTeam) args = args.setRed(commander.redTeam);
    if(commander.blueTeam) args = args.setBlue(commander.blueTeam);
    if(commander.headless) args = args.setHeadless();
    if(commander.real) args = args.setReal();
    if(commander.sim) args = args.setSim();

    return args;
}
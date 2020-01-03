# RoboGamer

## Quick start

* `npm install` to download the internet.
* `npm start` will start the simulator with `./localTeam.js` as the blue team and `./opponents/random.js` as the blue team in the simulator.

## Command:
* `npm test` will run some unit test and print out code coverage. It's not very high.

* `npm start -- --help` will print out the help for the cli.
```
> robogamer@0.0.1 start D:\dev\robogamer
> ts-node src/index.ts "--help"

Usage: index.ts [options]

Options:
  -V, --version           output the version number
  -r, --red-team <file>   The program to run as the red team
  -b, --blue-team <file>  The program to run as the blue team
  --sim                   Run in simulator. Default
  --real                  Run using real robots
  -h, --help              output usage information
```
 Note that files for the team 


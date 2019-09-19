import State from "../Client/State"
import ITeamClient from "../client/ITeamClient"
import BotPos from "../bots/BotPos";
import { writeFileSync } from "fs";

class CalibrationData {
    public power_left: number = 0;
    public power_right: number = 0;
    public speed_left: number = 0;
    public speed_right: number = 0;
}

enum Stage {
    Init,
    Delay,
    DeadzoneLeft,
    DeadzoneRight,
    PowerDiff,
    Done,
}

class BotCalibration {
    public stage: Stage = Stage.Init;
    public log: BotPos[] = [];
    public logstart: number = 0;
    public logging: boolean = false;
    public powerpct: number = 0.1;
    public delay: number = -1;
    public deadzone: [number,number] = [0,0];
    public powerbias: number = 0;
    public powerbiastimestamp: number = 0;
    public cdata: CalibrationData[] = [];

    public length() : number {
        var totallength = 0;
        for (var i = 0; i < this.log.length - 1; ++i){
            var curr = this.log[i];
            var next = this.log[i+1];
            var diffx = next.x - curr.x;
            var diffy = next.y - curr.y;
            var length = Math.sqrt(Math.pow(diffx,2) + Math.pow(diffy,2));
            totallength += length;
        }
        return totallength;
    }

    public normalize(dir: [number,number]): [number,number] {
        var length = Math.sqrt(Math.pow(dir[0], 2) + Math.pow(dir[1],2));
        return [dir[0]/length,dir[1]/length];
    }

    public linearRegression() : [number,number] {
        var sum = this.log.map((value) => [value.x,value.y]).reduce((prev,curr) => [prev[0]+curr[0], prev[1]+curr[1]]);
        var avg = [sum[0] / this.log.length, sum[1] / this.log.length];

        var nom = 0;
        var denom = 0;
        for (var i = 0; i < this.log.length; ++i) {
            nom += (this.log[i].x - avg[0]) * (this.log[i].y - avg[1]);
            denom += (this.log[i].x - avg[0]) * (this.log[i].x - avg[0]);
        }

        var direction = [
            Math.sign(this.log[this.log.length - 1].x - this.log[0].x),
            Math.sign(this.log[this.log.length - 1].y - this.log[0].y)
        ];
        if (denom == 0) {
            return [0,direction[1]];
        }

        return this.normalize([direction[0],direction[1] * nom / denom]);
    }
}

export default class Calibrator implements ITeamClient {
    private team: string;
    private data: BotCalibration[] = [];

    constructor(team: string) {
        this.team = team;
    }
    start(state: State): void {
        while (this.data.length < state._bots.length)
            this.data.push(new BotCalibration());
    }
    update(state: State): void {
        var sizex = 16;
        var sizey = 9;
        var posepsilon = 10 / 1920;
        var rotepsilon = Math.PI * 2 * 0.05;
        var loglen = 15;
        state._bots.forEach((bot,idx) => {
            var cali = this.data[idx];
            cali.log.push(bot.botPos);
            var inbounds = 
                bot.x > sizex/8 &&
                bot.x < sizex - sizex/8 &&
                bot.y > sizey/8 &&
                bot.y < sizey - sizey/8;
            
            //console.log(this.team + idx, inbounds, bot.x, bot.y, cali.log.length, cali.logging);

            if (cali.logging) {
                var runtime = state.gameTime - cali.logstart;
                var timeout = runtime > 10;

                //ran out of calibration area or time
                if (!inbounds && timeout) {
                    //restart stage
                    cali.logging = false;
                    bot.setPower(0,0);
                    
                    
                    var totallength = cali.length();
                    var speed = totallength / runtime;

                    cali.cdata.push({
                        power_left: cali.powerpct,
                        power_right: cali.powerpct,
                        speed_left: speed,
                        speed_right: speed,
                    });

                    console.log(this.team + idx, "saving results for", cali.powerpct, "with speed", speed);
                    cali.log = [];
                    //writeFile();
                    writeFileSync("calibrationdata_" + this.team + ".json", JSON.stringify(this.data, null, 4));

                    cali.logging = false;
                    cali.powerpct = Math.min(1, cali.powerpct * 2);
                } else {
                    switch (cali.stage) {
                        case Stage.Init:
                            if (runtime > 3) {
                                cali.logging = false,
                                cali.stage = Stage.Delay;
                                console.log(this.team + idx, "done with Init");
                            }
                            break;
                        case Stage.Delay:
                            var first = cali.log[0];
                            for (var i = 0; i < cali.log.length; ++i) {
                                var curr = cali.log[i];
                                var diff = [
                                    curr.x - first.x,
                                    curr.y - first.y
                                ];
                                var len = Math.sqrt(Math.pow(diff[0], 2) + Math.pow(diff[1], 2));
                                var moved = len > posepsilon;
                                if (moved) {
                                    //movement detected
                                    cali.delay = Math.max(0.01, curr.timestamp - cali.logstart);
                                    cali.logging = false;
                                    cali.stage = Stage.DeadzoneLeft;
                                    console.log(this.team + idx, "done with Delay", cali.delay);
                                }
                            }
                            break;
                        case Stage.DeadzoneLeft:
                        case Stage.DeadzoneRight:
                            var first = cali.log[0];
                            var last = cali.log[cali.log.length - 1];
                            var diff = [
                                last.x - first.x,
                                last.y - first.y
                            ];
                            var len = Math.sqrt(Math.pow(diff[0], 2) + Math.pow(diff[1], 2));
                            var moved = len > posepsilon;
                            var rot = Math.abs(last.radians - first.radians);
                            var rotated = rot > rotepsilon;
                            if (moved || rotated) {
                                cali.logging = false;
                                if (cali.stage == Stage.DeadzoneLeft) {
                                    console.log(this.team + idx, "done with DeadZoneLeft", cali.powerpct);
                                    cali.deadzone[0] = cali.powerpct;
                                    cali.stage = Stage.DeadzoneRight;
                                } else {
                                    console.log(this.team + idx, "done with DeadZoneRight", cali.powerpct);
                                    cali.deadzone[1] = cali.powerpct;
                                    cali.stage = Stage.PowerDiff;
                                }
                            } else {
                                cali.powerpct = Math.floor(runtime / (cali.delay * 1.15)) * 0.01;
                                console.log(this.team + idx, "testing deadzone", cali.powerpct);
                                if (cali.stage == Stage.DeadzoneLeft) {
                                    bot.setPower(cali.powerpct, 0);
                                } else {
                                    bot.setPower(0, cali.powerpct);
                                }
                            }
                            break;
                        case Stage.PowerDiff:
                            var minpower = Math.max(cali.deadzone[0], cali.deadzone[1]);
                            var testpower = minpower * 2;
                            var curr = cali.log[cali.log.length - 1];
                            var changeshouldbevisible = curr.timestamp - cali.powerbiastimestamp > cali.delay * 1.15;
                            if (changeshouldbevisible) {
                                if (cali.log.length >= 2) {
                                    var prev = cali.log[cali.log.length - 2];
                                    var anglediff = curr.radians - prev.radians;
                                    if (anglediff > Math.PI * 2)
                                        anglediff -= Math.PI * 2;
                                    if (anglediff < -Math.PI * 2)
                                        anglediff += Math.PI * 2;
                                    
                                    var straight_ish = Math.abs(anglediff) < rotepsilon;
                                    if (straight_ish) {
                                        cali.logging = false;
                                        cali.stage = Stage.Done;
                                        console.log(this.team + idx, "done with PowerDiff", cali.powerbias);
                                        writeFileSync("calibrationdata_" + this.team + ".json", JSON.stringify(this.data, null, 4));
                                    } else {
                                        cali.powerbias += anglediff * 0.1;
                                        cali.powerbiastimestamp = state.gameTime;
                                        var power = [
                                            testpower * (Math.min(0, -cali.powerbias) + 1),
                                            testpower * (Math.min(0,  cali.powerbias) + 1)
                                        ];
                                        bot.setPower(power[0], power[1]);
                                        console.log(this.team + idx, "testing powerbias", power[0], power[1]);
                                    }
                                }
                            }
                            break;
                        case Stage.Done:
                        default:
                            //hurray
                            break;
                    }
                }
            } else {
                bot.setPower(0,0);
                if (inbounds && cali.log.length > loglen) {
                    var recentlymoved = cali.log.slice(cali.log.length - loglen).reduce(
                        (prevresult, val) => prevresult || Math.abs(bot.x - val.x) > posepsilon || Math.abs(bot.y - bot.y) > posepsilon, false);

                    //in bounds, have been standing still for a while and ready to calibrate
                    if (!recentlymoved) {
                        cali.logging = true;
                        cali.logstart = state.gameTime;
                        cali.log = []; //clear old calibration input data

                        switch (cali.stage) {
                            case Stage.Init:
                                console.log(this.team + idx, "starting log procedure");
                                break;
                            case Stage.Delay:
                                bot.setPower(0.5, 0.5);
                                console.log(this.team + idx, "starting Delay");
                                break;
                            case Stage.DeadzoneLeft:
                                console.log(this.team + idx, "starting DeadzoneLeft");
                                break;
                            case Stage.DeadzoneRight:
                                console.log(this.team + idx, "starting DeadzoneRight");
                                break;
                            case Stage.PowerDiff:
                                console.log(this.team + idx, "starting PowerDiff");
                                break;
                        }
                    }
                }
            }
        });
    }
} 

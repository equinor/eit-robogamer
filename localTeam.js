function start(){

}

let nextUpdate = 0;


let incr = 1.0 / 90.0;

let calibration_time = 0;

function pos_equal(pos1, pos2) {
    E_alpha = 0.01;
    E_pos = 0.01;
    angle_diff = 180 - Math.abs(Math.abs(pos1.angle.degrees - pos2.angle.degrees) - 180); 
    return angle_diff < E_alpha && Math.abs(pos1.x - pos2.x) < E_pos && Math.abs(pos1.y - pos2.y) < E_pos;
}

function update(state){
     if(state.gameTime < nextUpdate ){
        return;
    }
    nextUpdate += 1;

    state.myBots.forEach(bot => {
        
        if (!(bot._get().left_calibrated) && pos_equal(bot._get().pos, bot._get().prev_pos)){
            bot.calibrate(bot._get().base_power.left + incr, bot._get().base_power.right );
            bot.runBasePower();
            console.log(bot._get().base_power);
            return;
        }
        else if(!bot._get().left_calibrated){
            console.log("done calibrating right", bot._get().base_power);
            bot.calibrate(bot._get().base_power.left - incr, bot._get().base_power.right);
            bot.done_left();
            bot.set_prev_pos(bot._get().pos);
            bot.runNoPower();
            calibration_time = state.gameTime;
            return;
        }
        //console.log(pos_equal(bot._get().pos, bot._get().prev_pos));

        if (!pos_equal(bot._get().pos, bot._get().prev_pos) && state.gameTime - calibration_time < 10) {
            bot.set_prev_pos(bot._get().pos);
            
            return;
        }
        if (!(bot._get().right_calibrated) && pos_equal(bot._get().pos, bot._get().prev_pos)){
            bot.calibrate(bot._get().base_power.left, bot._get().base_power.right  + incr);
            bot.runBasePower();
            console.log(bot._get().base_power);
            return;
        }
        else if(!bot._get().right_calibrated){
            
            console.log("done calibrating right", bot._get().base_power);
            bot.calibrate(bot._get().base_power.left, bot._get().base_power.right - incr);
            bot.done_right();
            bot.set_prev_pos(bot._get().pos);
            bot.runNoPower();
            return;
        }
        bot.runNoPower();
        
    });
}

module.exports = {
    start: start,
    update: update,
}
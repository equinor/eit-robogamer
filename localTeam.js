function start(){

}

let nextUpdate = 0;


let incr = 1.0 / 90.0;

let calibration_time = 0;
let wait = 20;
function pos_equal(pos1, pos2) {
    E_alpha = 6;
    E_pos = 2.0;
    angle_diff = 180 - Math.abs(Math.abs(pos1.angle.degrees - pos2.angle.degrees) - 180); 
    return angle_diff < E_alpha && Math.abs(pos1.x - pos2.x) < E_pos && Math.abs(pos1.y - pos2.y) < E_pos;
}

function update(state){
     if(state.gameTime < nextUpdate ){
        return;
    }
    nextUpdate += 1;
    console.log(state.gameTime);

    state.myBots.forEach(bot => {
        if(state.gameTime < wait) 
        {
            
            bot.set_prev_pos(bot._get().pos);
            return;
        }
        
        if (!(bot._get().left_calibrated) && pos_equal(bot._get().pos, bot._get().prev_pos)){
            console.log("Trying left side with:", bot._get().base_power.left + incr)
            bot.calibrate(bot._get().base_power.left + incr, bot._get().base_power.right );
            bot.runBasePower(); 
            return;
        }
        else if(!bot._get().left_calibrated){
            console.log("done calibrating left", bot._get().base_power);
            bot.calibrate(bot._get().base_power.left - incr, bot._get().base_power.right);
            bot.done_left();
            bot.set_prev_pos(bot._get().pos);
            bot.runNoPower();
            calibration_time = state.gameTime;
            return;
        }
        
        if (!pos_equal(bot._get().pos, bot._get().prev_pos) && state.gameTime - calibration_time < 10) {
            bot.set_prev_pos(bot._get().pos);
            return;
        }
        if (!(bot._get().right_calibrated) && pos_equal(bot._get().pos, bot._get().prev_pos)){
            console.log("Trying right side with:", bot._get().base_power.right + incr)
            bot.calibrate(bot._get().base_power.left, bot._get().base_power.right  + incr);
            bot.runBasePower();
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
        bot.setPower(bot._get().base_power.left  + (2*incr), bot._get().base_power.right + (2*incr));
        
    });
}

module.exports = {
    start: start,
    update: update,
}
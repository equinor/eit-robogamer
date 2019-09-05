function start(){

}

let nextUpdate = 0;

function update(state){
    if(state.gametime() < nextUpdate ){
        return;
    }
    nextUpdate += 1;
    state.myBots().forEach(bot => {
        var r = Math.random();
        if(r < 0.25) {
            bot.goTo(Math.random() * 16,Math.random() * 9);
            return;
        }
        if(r < 0.5) {
            bot.turnToPoint(Math.random() * 16,Math.random() * 9);
            return;
        }
        if(r < 0.75) {
            bot.setPower((Math.random() * 2) - 1, (Math.random() * 2) - 1);
            return;
        }
        bot.stop();
    });
}

module.exports = {
    start: start,
    update: update,
}
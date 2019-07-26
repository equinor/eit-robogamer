import express from 'express';
import socket from 'socket.io';
import http from 'http';
import { BotPos, EnginePower } from './BotPhysics';
import { Box2DPhysics } from './Box2DPhysics';
import { Bot } from './Bot';
const app = express();
const server = http.createServer(app);
const port = 8080
const io = socket(server);


app.use(express.static("../webviewer"));

io.on('connection', function(){
    console.log('a user connected');
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))



function toIO(pos:BotPos){
    return {
        x: pos.x,
        y: pos.y,
        a: pos.angle,
    }
}

let bots = [new Bot(2,2), new Bot(2,4.5), new Bot(2,7), new Bot(5,4.5), new Bot(14,2), new Bot(14,4.5), new Bot(14,7), new Bot(11,4.5)]

let physic = new Box2DPhysics(step, bots);

function update() {
    for (const bot of bots) {
        var r = Math.random();
        if(r < 0.25) {
            bot.goTo(Math.random() * 16,Math.random() * 9);
            continue;
        }
        if(r < 0.5) {
            bot.turnToPoint(Math.random() * 16,Math.random() * 9);
            continue;
        }
        if(r < 0.75) {
            bot.power = {
                left: (Math.random() * 2) - 1,
                right: (Math.random() * 2) - 1,
            };
            continue;
        }
        bot.stop();
    }
}

function step(positions:BotPos[]) {
    const length = Math.min(bots.length, positions.length);
    for (let i = 0; i < length; i += 1) {
        bots[i].pos = positions[i];
    }

    physic.setPower(bots.map((b) => b.power))

    let payload = positions.map(toIO);
    io.emit("bot", {
        h: payload.slice(0,4),
        a: payload.slice(4,8),
    });
}

setInterval(update, 1000)

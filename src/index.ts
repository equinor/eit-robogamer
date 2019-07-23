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


app.use(express.static("public"));

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
    let x = Math.random() * 16;
    let y = Math.random() * 9;

    for (const bot of bots) {
        bot.turnToPoint(x,y);
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


function createPower(): EnginePower {
    return {
        left: (Math.random() * 2) -1,
        right: (Math.random() * 2) -1,
    }
}

setInterval(update, 1000)

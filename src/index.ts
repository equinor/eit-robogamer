import express from 'express';
import socket from 'socket.io';
import http from 'http';
import { BotPos, EnginePower } from './BotPhysics';
import { Box2DPhysics } from './Box2DPhysics';
const app = express();
const server = http.createServer(app);
const port = 8080
const io = socket(server);


app.use(express.static("public"));

io.on('connection', function(){
    console.log('a user connected');
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))


interface Bot {
    x: number;
    y: number;
    a: number;
}

function toIO(pos:BotPos): Bot{
    return {
        x: pos.x,
        y: pos.y,
        a: pos.angle,
    }
}

function emit(positions:BotPos[]) {
    let bots = positions.map(toIO);
    io.emit("bot", {
        h: bots.slice(0,4),
        a: bots.slice(4,8),
    });
    console.log("sent update");
}

let bots = [new BotPos(8,4), new BotPos(9,4), new BotPos(9,5), new BotPos(9,3), new BotPos(7,4), new BotPos(7,5), new BotPos(7,3), new BotPos(10,4)]

let physic = new Box2DPhysics(emit, bots);

function step() {
    physic.setPower([createPower(), createPower(), createPower(), createPower(), createPower(), createPower(), createPower(), createPower()]);
}

function createPower(): EnginePower {
    return {
        left: (Math.random() * 2) -1,
        right: (Math.random() * 2) -1,
    }
}

setInterval(step, 1000)

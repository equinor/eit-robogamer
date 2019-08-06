import express from 'express';
import socket from 'socket.io';
import http from 'http';
import { BotPos, EnginePower } from './BotPhysics';
import { Box2DPhysics } from './Box2DPhysics';
import Bot from './Bot';
import Game from './Game';
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

let physic = new Box2DPhysics();
let game = new Game(physic);

function toUI() {
    let positions = game.state.bots;
    let payload = positions.map(toIO);
    io.emit("bot", {
        h: payload.slice(0,4),
        a: payload.slice(4,8),
    });
}

game.onUpdate = toUI;
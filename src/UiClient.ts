import express from 'express';
import socket from 'socket.io';
import http from 'http';
import BotPos from './models/BotPos';
import State from './models/State';


export default class UiClient{
    private readonly _io: socket.Server;

    public constructor(){
        const app = express();
        const server = http.createServer(app);
        const port = 8080
        this._io = socket(server);


        app.use(express.static("./www"));

        this._io.on('connection', function(){
            console.log('a user connected');
        });

        server.listen(port, () => console.log(`Example app listening on port ${port}!`))
    }

    public newState(state: State){
        let positions = state.getBotList();
        let payload = positions.map(toIO);
        this._io.emit("bot", {
            h: payload.slice(0,4),
            a: payload.slice(4,8),
        });
    }
}

function toIO(pos:BotPos){
    return {
        x: pos.x,
        y: pos.y,
        a: pos.angle,
    }
}
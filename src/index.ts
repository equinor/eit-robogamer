import express from 'express';
import socket from 'socket.io';
import http from 'http';
const app = express();
const server = http.createServer(app);
const port = 8080
const io = socket(server);


app.use(express.static("public"));

io.on('connection', function(){
    console.log('a user connected');
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

interface BotPos {
    x: number;
    y: number;
    angle: number;
}

interface EnginePower {
    left: number, // from -1.0 to 1.0
    right: number, // from -1.0 to 1.0
}

interface PositionCallback{
    (this: void, positions: BotPos[]): void
}

abstract class BotPhysics {
    protected onUpdate: PositionCallback;

    constructor(onUpdate: PositionCallback) {
        this.onUpdate = onUpdate;
    }

    public abstract setPower(power: [EnginePower]): void;
}

class FakePhysics extends BotPhysics {
    
    
    constructor(onUpdate: PositionCallback){
        super(onUpdate);

        setInterval(this.update, 1000);
    }

    setPower(power: EnginePower[]): void {
        throw new Error("Method not implemented.");
    }

    update = () => {
        this.onUpdate([this.botgen(),this.botgen(),this.botgen(),this.botgen(),this.botgen(),this.botgen(),this.botgen(),this.botgen()]);
    }

    private botgen(): BotPos{
        return {
            x: Math.random() * 16,
            y: Math.random() * 9,
            angle: Math.random() * Math.PI * 2,
        };
    }
}

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

new FakePhysics(emit);

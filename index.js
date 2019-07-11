const express = require('express');
const socket = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const port = 8080
const io = socket(server);


app.use(express.static("public"));

io.on('connection', function(socket){
    console.log('a user connected');
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

function botgen(){
    let bot = {};
    bot.x = Math.random() * 16;
    bot.y = Math.random() * 9;
    bot.a = Math.random() * Math.PI * 2;

    return bot;
}

function tick(){
    io.emit("bot", {
        h: [botgen(), botgen(), botgen(), botgen()],
        a: [botgen(), botgen(), botgen(), botgen()],
    });
    console.log("sent update");
}

setInterval(tick, 1000);
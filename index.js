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
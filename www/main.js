let socket = new WebSocket("ws://localhost:3030/socket");

socket.onmessage = (event) => {
    console.log(event.data);
}

socket.onopen = function(e) {
    socket.send("Test message");
};
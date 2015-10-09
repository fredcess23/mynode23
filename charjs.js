<code class="language-javascript">

var clients = [];

/*
    Create an http server to serve the client.html file
    ---------------------------------------------------
*/
var http = require("http");
var fs = require("fs");
var httpServer = http.createServer(function(request, response) {
    fs.readFile(__dirname + "/client.html", "utf8", function(error, content) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.end(content);
    });
}).listen(process.env.PORT || 1337);

/*
    Listen for and handle socket.io connections
    -------------------------------------------
*/
var io = require("socket.io").listen(httpServer);
io.sockets.on("connection", function(socket) {

    socket.on('join', function(nick, callback) {

        // If the nickname isn't in use, join the user
        if (clients.indexOf(nick) &lt; 0) {

            // Store the nickname, we'll use it when sending messages
            socket.nick = nick;

            // Add the nickname to the global list
            clients.push(nick);

            // Send a message to all clients that a new user has joined
            socket.broadcast.emit("user-joined", nick);

            callback(true, clients);

        } else {
            callback(false);
        }
    });

    socket.on("chat", function(message) {

        if (socket.nick &amp;&amp; message) {
            io.sockets.emit("chat", {sender: socket.nick, message: message});
        }
    });

    socket.on("disconnect", function() {
        // Check that the user has already joined successfully
        if (socket.nick) {
            // Remove the client from the global list
            clients.splice(clients.indexOf(socket.nick), 1);
            // Let all the remaining clients know of the disconnect
            io.sockets.emit("user-left", socket.nick);
        }
    });

});
</code>
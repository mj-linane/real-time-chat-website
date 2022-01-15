const Database = require("@replit/database")
const db = new Database()
const express = require("express")
const app = express() // create instance of express
const server = require("http").Server(app) // create server

const io = require("socket.io")(server,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });  // create instance of socket.io

// app.use(express.static('public')); // use public directory for static files


io.on("connection", socket => {
    socket.on("joined", () => { // when server receives the "joined" message
        io.emit("joined") // send message to client
    })

    socket.on('new-user', name => {
        db.set([socket.id], name).then(() => {
            socket.broadcast.emit('user-connected', name)
        })
    })

    socket.on("disconnect", () => { //when someone closes the tab
        io.emit("leave");
    })

    socket.on('send-chat-message', message => {

        db.get([socket.id]).then(value => {
            socket.broadcast.emit('chat-message', {
                message: message,
                name: value
            })
        })
    })
})


server.listen(3000, function () {
    console.log('listening on port 3000');
}); // run the server

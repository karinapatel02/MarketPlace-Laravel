// creating express instance
var express = require("express");
var app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
 
// // // creating http instance
var http = require("http").createServer(app);

// // // creating socket io instance
var io = require("socket.io")(http, {
    cors: {
        origin: "http://mavmarket.rxr8071.uta.cloud",
        methods: ["GET", "POST"]
    }
});
 
// // // start the server
http.listen(8001,"10.182.226.247", function () {
    console.log("Server started");
});

// Create instance of mysql
var mysql = require("mysql");
 
// make a connection
var connection = mysql.createConnection({
    "host": "51.81.160.154",
    "port": 3306,
    "user": "dmp4205_Divya",
    "password": "Divya@6696",
    "database": "dmp4205_MavMarket"
});
 
// connect
connection.connect(function (error) {
    console.log(error);
});

// io.on("connection", function (socket) {
//     console.log(`${socket.id} is connected.`);
// });

// var users = [];
 
io.on("connection", function (socket) {
    console.log("User connected", socket.id);

    const users = [];
//   for (let [id, socket] of io.of("/").sockets) {
//     users.push({
//       userID: id,
//       username: socket.username,
//     });
//     io.emit("user_connected", users.username);
//   }
//   socket.emit("users", users);
 
    // attach incoming listener for new user
    socket.on("user_connected", function (username) {
        // save in array
        users[username] = socket.id;
 
        // socket ID will be used to send message to individual person
 
        // notify all connected clients
        io.emit("user_connected", username);
    });

    // listen from client inside IO "connection" event
    socket.on("send_message", function (data) {
    // send event to receiver
    var socketId = users[data.receiver];
 
    io.emit("message_received", data);
    console.log(data);
    // save in database
    connection.query("INSERT INTO messages (sender, receiver, message) VALUES ('" + data.sender + "', '" + data.receiver + "', '" + data.message + "')", function (error, result) {
        console.log(error);
    }); 
    // var temp = data.sender;
    // data.sender = data.receiver;
    // data.receiver = temp;
    // io.emit("message_received", data);
    // connection.release();
});
});

// create body parser instance
var bodyParser = require("body-parser");
 
// enable URL encoded for POST requests
app.use(bodyParser.urlencoded());
 
// enable headers required for POST request
app.use(function (request, result, next) {
    result.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
 
// create api to return all messages
app.post("/get_messages", function (request, result) {
    // get all messages from database
    console.log(request.body);
    connection.query("SELECT * FROM messages WHERE (sender = '" + request.body.sender + "' AND receiver = '" + request.body.receiver + "') OR (sender = '" + request.body.receiver + "' AND receiver = '" + request.body.sender + "')", function (error, messages) {
        // response will be in JSON
        if(!messages) {
            result.end(JSON.stringify(""));
        }
        else {
            result.end(JSON.stringify(messages));
        }
    });
    // connection.release();
});

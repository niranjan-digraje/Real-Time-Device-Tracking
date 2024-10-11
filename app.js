const express = require("express");
const app = express();
const path = require("path");
const http = require("http")  //http use for run socket.io package
const socketio = require("socket.io");  //require socket.io package

//http server
const server = http.createServer(app);

//socket io call
const io = socketio(server);

//view engine
app.set("view engine","ejs");
app.use(express.static('public'));
//public folder
//app.set(express.static(path.join(__dirname,"public")));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{id: socket.id,...data});
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    });
});

app.get("/",function(req,res){
    res.render("index");
});

//main server_(server/app)
server.listen(3000,function(req,res){
    console.log("Server Started...");
});
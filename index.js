let connected = require("./connected");

const express = require('express');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// serve up javascript files
app.use(express.static("public"));

// serve up index
app.get("/", function(req, res){
    res.sendFile(`${__dirname}/index.html`);
});

// server start
http.listen(3000);

// On connection
io.on("connection", connected);

'use strict';
const PORT = process.env.PORT || 9999;
const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const server = http.Server(app);
const dbConnect = require('./common/connection');
dbConnect.init()

// Set ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set body parser json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Start server
server.listen(PORT, (error) => 
{
    if (!error)
    {
        console.log("Server running with port: " + PORT);
        return;
    }
    console.error(error);
});

// Socket io
var io = require("socket.io")(server);

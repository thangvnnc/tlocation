'use strict';
const PORT = process.env.PORT || 8080;
const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const server = http.Server(app);
const dbConnect = require('./common/connection');

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
io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('register', (data) => {
        socket.join(data.id);
    });

    socket.on('sendNotify', (data) => {
        io.to(data.id).emit({
            id: data.id,
            lat: data.lat,
            lng: data.lng
        })
    })
});

app.get('/', (req, res) => {
    res.render('index');
});

// var ids = [];
// app.post('/register', (req, res) => {
//     var body = req.body;
//     var ipId = body['ip-id'];
//     ids.push(ipId);
//     res.send({
//         status: 0,
//         message: ""
//     });
// });

// app.get('/show-map', (req, res) => {
//     res.render('show-map');
// })

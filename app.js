'use strict';
const PORT = process.env.PORT || 8080;
const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const server = http.Server(app);
// const dbConnect = require('./common/connection');
const enforce = require('express-sslify');
app.use(enforce.HTTPS());

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
    socket.on('register', (data) => {
        socket.join(data.id);
    });

    socket.on('set-location-change', (data) => {
        let dataResult = {
            id: data.id,
            lat: data.lat,
            lng: data.lng,
            note: data.note,
            date: data.date
        }
        io.to(data.id).emit('notify-location-change', dataResult);
    })
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/push-location', (req, res) => {
    res.render('push-location');
});

app.get('/show', (req, res) => {
    res.render('show');
});

app.get('/show-location', (req, res) => {
    res.render('show-location');
});
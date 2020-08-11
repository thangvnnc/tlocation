'use strict';
//put these lines in a seperate file
const mysql = require('mysql2');

const connection = mysql.createPool({
    host: "192.168.1.100",
    user: "root",
    password: "",
    database: "location_infos"
});

module.exports = connection;
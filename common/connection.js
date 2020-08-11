'use strict';
//put these lines in a seperate file
const mysql = require('mysql2');

const connection = mysql.createPool({
    host: "192.168.1.100",
    user: "root",
    password: ""
});

connection.init = function ()
{
    connection.promise().execute("CREATE DATABASE IF NOT EXISTS `location_infos`")
    .then(() => {
        
    })
    .catch((error) => 
    {
        console.error(error);
    });
}

module.exports = connection;
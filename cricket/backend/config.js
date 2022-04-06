const mysql = require('mysql');
//const connection = mysql.createConnection({
//    host: "localhost",
//    user: "root",
//    password: "nikhil@11",
//    database: "cricket",
//    multipleStatements: true
//});

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin@123",
    database: "cricket",
    multipleStatements: true
})

connection.connect(e => {
    if(e){
        console.log(e)
    }
    else{
        console.log('Connected to MySQL CLient')
    }
})

module.exports = connection

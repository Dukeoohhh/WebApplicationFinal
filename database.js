const mysql = require('mysql');

var connection = mysql.createConnection({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'icecream_shop',
    port            : '3307'
});

connection.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log('Mysql database success to connect.');
    }
});

module.exports = connection;
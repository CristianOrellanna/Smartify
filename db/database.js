const mysql = require('mysql2')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('../config');

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
})

connection.connect((error) => {
    if(error){
        console.log('PROBLEMAS AL REALIZAR LA CONEXION A LA DB')
    }else{
        console.log('SE CONECTO A LA DB EXITOSAMENTE')
    }
})

module.exports = connection;

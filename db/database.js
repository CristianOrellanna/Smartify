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
        console.log('Problemas al conectar a la DB')
    }else{
        console.log('Se a conectado a la DB de manera exitosa')
    }
})

module.exports = connection;

const mysql = require("mysql2")
const dotenv = require ("dotenv")
const data = new Date()
module.exports = class Mensagem{
    static connect(){
        const connection = mysql.createConnection({ //inica o coneção com o xampp
            user: process.env.user,       // padrão do XAMPP
            password: process.env.password,
            database: process.env.database //nome do banco de dados 
        })
        return connection
    }
}
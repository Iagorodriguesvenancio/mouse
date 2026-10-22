const mysql = require("mysql2")
const dotenv = require ("dotenv").config()
const data = new Date()

const pool = mysql.createPool({
    host: process.env.host || "localhost",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10,
})

module.exports = class User{
    static createUser(callback,dados){
        pool.query(
            "INSERT INTO usuarios(username,email, cpf, password, data_criacao) VALUES (?,?,?,?,?)",
            [dados.username, dados.email,dados.cpf, dados.password, `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`],
            (error,resultado) =>{
               if (error) {
            console.log("ERRO NO INSERT:", error);
            return callback(error, null);
        }
        callback(null, resultado.insertId);
            }
        )
    }

    static logar(callback,dados){
        pool.query(
            "SELECT id_user,cpf, password,adm FROM `usuarios` WHERE cpf = ?",
            [dados.cpf],
            (error,resultado) => {
                callback(error,resultado)
            }
        )
    }

    static getUser(callback){
        pool.query(
            "SELECT id_user,email,username,cpf,status,data_criacao,adm FROM `usuarios`",
            (error,resultado) =>{
                callback(error,resultado)
            }
        )
    }

    static getUserBusca(callback,username){
        pool.query(
            "SELECT id_user,email,username,cpf,status,data_criacao,adm FROM `usuarios` WHERE username like ?",
            [`%${username}%`],
            (error,resultado) =>{
            
                callback(error,resultado)
            }
        )
    }

    static getUserId(callback,dados){
        pool.query(
            "SELECT id_user,email,username,cpf,status,data_criacao,adm FROM `usuarios` WHERE id_user = ?",
            [dados.id],
            (error,resultado) => {
                callback(error,resultado)
            }
        )
    }

    static desativarUser(callback,dados){
        pool.query(
            "UPDATE usuarios SET status= ? WHERE id_user = ?",
            ["DESATIVADO",dados.id],
            error=>{
                callback(error)
            }
        )
    }

    static updateUser(callback,dados){
        pool.query(
            "UPDATE usuarios SET username = COALESCE(?, username), email = COALESCE(?, email) ,password = COALESCE(?, password), status   = COALESCE(?, status), adm = COALESCE(?, adm) WHERE id_user = ?",
            [
                dados.username,
                dados.email,
                dados.password,
                dados.status,
                dados.adm,
                dados.id_user
            ],
             error=>{
                callback(error)
            }
        )
    }
}
const mysql = require("mysql2")
const dotenv = require ("dotenv").config()

const pool = mysql.createPool({
    host: process.env.host || "localhost",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10,
})

module.exports = class Mensagem{
    static createMensagem(callback,dados){
        pool.query(
            "INSERT INTO `mensagem`(id_user, id_canal,mensagem) VALUES (?,?,?)",
            [dados.id_user, dados.id_canal,dados.mensagem],
            (error)=>{
                callback(error)
            }
        )
    }

    static getMensagem(callback,dados){
        pool.query(
            "SELECT usuarios.username,mensagem.mensagem FROM `mensagem` JOIN usuarios on usuarios.id_user = mensagem.id_user WHERE mensagem.id_canal = ? and mensagem.status != 'APAGADO'",
            [dados.id_canal],
            (error,resultado)=>{
                callback(error,resultado)
            }
        )
    }

    static updateMensagem(callback,dados){
        pool.query(
            "UPDATE mensagem SET mensagem = COALESCE(?, mensagem) WHERE id_mensagem  = ?",
            [
                dados.mensagem,
                dados.id_mensagem 
            ],
             error=>{
                callback(error)
            }
        )
    }

    static desativarMensagem(callback,dados){
        pool.query(
            "UPDATE mensagem SET status = ? WHERE id_mensagem =?",
            ["APAGADA",dados.id_mensagem],
            error =>{
                callback(error)
            }
        )
    }
}
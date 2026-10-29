const mysql = require("mysql2")
const dotenv = require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.host || "localhost",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10,
})

module.exports = class Canais{
    static createCanais(callback,dados){
        pool.query(
            "INSERT INTO `canais`(id_servidor, nome, descricao) VALUES (?,?,?)",
            [dados.id_servidor, dados.nome,dados.descricao],
            (error)=>{
                callback(error)
            }
        )
    }

    static getCanais(callback,dados){
        pool.query(
            "SELECT nome,descricao FROM canais WHERE id_servidor = ? and status != 'DESATIVADO'",
            [dados.id_servidor],
            (error,resultado)=>{
                callback(error,resultado)
            }
        )
    }

    static updateCanais(callback,dados){
        pool.query(
            "UPDATE canais SET nome = COALESCE(?, nome), descricao = COALESCE(?, descricao) WHERE id_canal = ?",
            [
                dados.nome,
                dados.descricao,
                dados.id_canal
            ],
             error=>{
                callback(error)
            }
        )
    }

    static desativarCanais(callback,dados){
        pool.query(
            "UPDATE canais SET status = ? WHERE id_canal = ?",
            ["DESATIVADO", dados.id_canal],
            error => {
                callback(error)
            }
        )
    }
}
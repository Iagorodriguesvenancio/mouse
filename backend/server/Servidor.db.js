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

module.exports = class Servidor{

    static createServidor(callback,dados){
        pool.query(
            "INSERT INTO servidor (nome,descricao, proprietário_server) VALUES (?,?,?)",
            [dados.nome, dados.descricao, dados.id_user],
            (error)=>{
                callback(error)
            }
        )
    }

    static getServidor(callback){
        pool.query(
            "SELECT servidor.nome,servidor.descricao,usuarios.username  FROM `servidor` JOIN usuarios ON servidor.proprietário_server = usuarios.id_user",
            (error,resultado)=>{
                callback(error,resultado)
            }  
        )
    }
    
    static getServidorBusca(callback,nome){
        pool.query(
            "SELECT servidor.nome,servidor.descricao,usuarios.username  FROM `servidor` JOIN usuarios ON servidor.proprietário_server = usuarios.id_user WHERE servidor.nome like ?",
            [`%${nome}%`],
            (error,resultado) =>{
            
                callback(error,resultado)
            }
        )
    }

    static updateServidor(callback,dados){
        pool.query(
            "UPDATE servidor SET nome = COALESCE(?, nome), descricao = COALESCE(?, descricao), status = COALESCE(?, status) WHERE id_servidor = ?",
            [
                dados.nome,
                dados.descricao,
                dados.status,
                dados.id_servidor
            ],
             error=>{
                callback(error)
            }
        )
    }

     static desativarServidor(callback,dados){
        pool.query(
            "UPDATE servidor SET status= ? WHERE id_servidor = ?",
            ["DESATIVADO",dados.id_servidor],
            error=>{
                callback(error)
            }
        )
    }

    static ligacao(callback,dados){
        pool.query(
            "INSERT INTO `membros`(id_user, id_servidor) VALUES (?,?)",
            [dados.id_user, dados.id_servidor],
            (error,resultado)=>{
                callback(error,resultado)
            }
        )
    }
}
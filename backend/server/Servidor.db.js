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
            "INSERT INTO servidor (nome,descricao, proprietário_server, materia) VALUES (?,?,?,?)",
            [dados.nome, dados.descricao, dados.proprietário_server,dados.materia],
            (error)=>{
                callback(error)
            }
        )
    }

    static getServidor(callback){
        pool.query(
            "SELECT servidor.nome,servidor.descricao,usuarios.username,materias.nome as 'materia' FROM `servidor` LEFT JOIN usuarios ON servidor.proprietário_server = usuarios.id_user LEFT JOIN materias ON servidor.materia = materias.id_materia WHERE servidor.status != 'DESATIVADO'",
            (error,resultado)=>{
                callback(error,resultado)
            }  
        )
    }
    
    static getServidorBusca(callback,nome){
        pool.query(
            "SELECT servidor.nome ,servidor.descricao,usuarios.username,materias.nome as 'materia' FROM `servidor` JOIN usuarios ON servidor.proprietário_server = usuarios.id_user JOIN materias ON servidor.materia = materias.id_materia WHERE servidor.nome like ? and servidor.status != 'DESATIVADO'",
            [`%${nome}%`],
            (error,resultado) =>{
            
                callback(error,resultado)
            }
        )
    }

    static updateServidor(callback,dados){
        pool.query(
            "UPDATE servidor SET nome = COALESCE(?, nome), descricao = COALESCE(?, descricao), status = COALESCE(?, status) WHERE id_servidor = ? and proprietário_server = ?",
            [
                dados.nome,
                dados.descricao,
                dados.status,
                dados.id_servidor,
                dados.proprietário_server
            ],
             error=>{
                callback(error)
            }
        )
    }

     static desativarServidor(callback,dados){
        pool.query(
            "UPDATE servidor SET status = ? WHERE id_servidor = ?",
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
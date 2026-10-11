const mysql = require("mysql2")
const dotenv = require ("dotenv")
const data = new Date()
module.exports = class Canais{
    static connect(){
        const connection = mysql.createConnection({ //inica o coneção com o xampp
            user: process.env.user,       // padrão do XAMPP
            password: process.env.password,
            database: process.env.database //nome do banco de dados 
        })
        return connection
    }

    static createCanais(callback,dados){
        Canais.connect().query(
            "INSERT INTO `canais`(id_servidor, nome, descricao) VALUES (?,?,?)",
            [dados.id_servidor, dados.nome,dados.descricao],
            (error)=>{
                callback(error)
            }
        )
    }

    static getCanais(callback,dados){
        Canais.connect().query(
            "SELECT nome,descricao FROM canais WHERE id_servidor = ?",
            [dados.id_servidor],
            (error,resultado)=>{
                callback(error,resultado)
            }
        )
    }

    static updateCanais(callback,dados){
        Canais.connect().query(
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
}
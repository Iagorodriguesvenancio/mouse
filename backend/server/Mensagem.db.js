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

    static createMensagem(callback,dados){
        Mensagem.connect().query(
            "INSERT INTO `mensagem`(id_user, id_canal,mensagem) VALUES (?,?,?)",
            [dados.id_user, dados.id_canal,dados.mensagem],
            (error)=>{
                callback(error)
            }
        )
    }

    static getMensagem(callback,dados){
        Mensagem.connect().query(
            "SELECT id_user, mensagem FROM mensagem WHERE id_canal = ?",
            [dados.id_canal],
            (error,resultado)=>{
                callback(error,resultado)
            }
        )
    }

    static updateMensagem(callback,dados){
        Mensagem.connect().query(
            "UPDATE mensagem SET mensagem = COALESCE(?, mensagem) WHERE id = ?",
            [
                dados.mensagem,
                dados.id
            ],
             error=>{
                callback(error)
            }
        )
    }
}
const mysql = require("mysql2")
const dotenv = require ("dotenv")
const data = new Date()
module.exports = class User{
    static connect(){
        const connection = mysql.createConnection({ //inica o coneção com o xampp
            user: process.env.user,       // padrão do XAMPP
            password: process.env.password,
            database: process.env.database //nome do banco de dados 
        })
        return connection
    }

    static createUser(callback,dados){
        User.connect().query(
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
        User.connect().query(
            "SELECT id_user,cpf, password,adm FROM `usuarios` WHERE cpf = ?",
            [dados.cpf],
            (error,resultado) => {
                callback(error,resultado)
            }
        )
    }

    static getUser(callback){
        User.connect().query(
            "SELECT * FROM `usuarios`",
            (error,resultado) =>{
                callback(error,resultado)
            }
        )
    }

    static getUserId(callback,dados){
        User.connect().query(
            "SELECT * FROM `usuarios` WHERE id_user = ?",
            [dados.id],
            (error,resultado) => {
                callback(error,resultado)
            }
        )
    }

    static desativarUser(callback,dados){
        User.connect().query(
            "UPDATE usuarios SET status= ? WHERE id_user = ?",
            ["DESATIVADO",dados.id],
            error=>{
                callback(error)
            }
        )
    }

    static updateUser(callback,dados){
        User.connect().query(
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
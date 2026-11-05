const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.host || "localhost",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = class Servidor {
  static createServidor(callback, dados) {
     pool.query(
        "INSERT INTO servidor (nome, descricao, proprietário_server, materia) VALUES (?,?,?,?)",
        [dados.nome, dados.descricao, dados.proprietário_server, dados.materia],
        (error, resultado) => {
            if (error) {
                return callback(error);
            }

            const id_servidor = resultado.insertId;

            // Adiciona o criador como membro do servidor
            pool.query(
                "INSERT INTO membros (id_user, id_servidor) VALUES (?,?)",
                [dados.proprietário_server, id_servidor],
                (error, resultadoMembro) => {
                    if (error) {
                        return callback(error);
                    }

                    callback(null, {
                        id_servidor,
                        resultadoMembro
                    });
                }
            );
        }
    );
  }

  static getServidor(callback) {
    pool.query(
      "SELECT servidor.nome,servidor.descricao,usuarios.username,materias.nome as 'materia' FROM `servidor` LEFT JOIN usuarios ON servidor.proprietário_server = usuarios.id_user LEFT JOIN materias ON servidor.materia = materias.id_materia WHERE servidor.status != 'DESATIVADO'",
      (error, resultado) => {

        callback(error, resultado);
      },
    );
  }

  static getServidoresUser(callback,dados){
    pool.query(
        "SELECT servidor.id_servidor, servidor.nome, servidor.descricao, materias.nome AS materias FROM servidor JOIN membros ON membros.id_servidor = servidor.id_servidor JOIN materias ON materias.id_materia = servidor.materia WHERE servidor.status = 'ATIVO' AND membros.id_user = ?",
        [dados.id_user],
        (error,resultado) =>{
            callback(error, resultado);
        }
    )
  }

  static getServidorBusca(callback, nome) {
    pool.query(
      "SELECT servidor.nome ,servidor.descricao,usuarios.username,materias.nome as 'materia' FROM `servidor` JOIN usuarios ON servidor.proprietário_server = usuarios.id_user JOIN materias ON servidor.materia = materias.id_materia WHERE servidor.nome like ? and servidor.status != 'DESATIVADO'",
      [`%${nome}%`],
      (error, resultado) => {
        callback(error, resultado);
      },
    );
  }

  static updateServidor(callback, dados) {
    pool.query(
      "UPDATE servidor SET nome = COALESCE(?, nome), descricao = COALESCE(?, descricao), status = COALESCE(?, status) WHERE id_servidor = ? and proprietário_server = ?",
      [
        dados.nome,
        dados.descricao,
        dados.status,
        dados.id_servidor,
        dados.proprietário_server,
      ],
      (error) => {
        callback(error);
      },
    );
  }

  static desativarServidor(callback, dados) {
    pool.query(
      "UPDATE servidor SET status = ? WHERE id_servidor = ?",
      ["DESATIVADO", dados.id_servidor],
      (error) => {
        callback(error);
      },
    );
  }

  static ligacao(callback, dados) {
    pool.query(
      "INSERT INTO `membros`(id_user, id_servidor) VALUES (?,?)",
      [dados.id_user, dados.id_servidor],
      (error, resultado) => {
        callback(error, resultado);
      },
    );
  }
};

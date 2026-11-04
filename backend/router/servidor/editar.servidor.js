const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const Servidor = require('../../server/Servidor.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/",auth, async (req,res)=>{
    if (req.user.adm == 1) {
      let { nome, descricao, status,id_servidor } = req.body;
      Servidor.updateServidor((error) => {
        if (error) {
          return res.status(500).json({
            mensagem: "Erro ao atualizar servidor",
            erro: error.message,
          });
        }
        return res.status(201).json({
          mensagem: "Servidor atualizado com sucesso",
        });
      },{nome,descricao,status,id_servidor,proprietário_server:req.user.userId });
  }else{
     return res.status(403).json({ mensagem: "rota de adm" });
  }
})

module.exports = router;
const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const Servidor = require('../server/Servidor.db.js');
const auth = require('../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/",auth, async (req,res)=>{
  
    let { nome, descricao, status,id_servidor } = req.body;
    Servidor.updateServidor((error) => {
      if (error) {
        return res.status(500).json({
          men: "Erro ao atualizar servidor",
          erro: error.message,
        });
      }
      return res.status(201).json({
        men: "Servidor atualizado com sucesso",
      });
    },{nome,descricao,status,id_servidor});
})

module.exports = router;
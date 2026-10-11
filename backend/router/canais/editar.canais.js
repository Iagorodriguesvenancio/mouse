const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const Canais = require('../../server/Canais.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/",auth, async (req,res)=>{
  
    let { nome, descricao,id_canal } = req.body;
    Canais.updateCanais((error) => {
      if (error) {
        return res.status(500).json({
          men: "Erro ao atualizar Canais",
          erro: error.message,
        });
      }
      return res.status(201).json({
        men: "Canais atualizado com sucesso",
      });
    },{nome,descricao,id_canal});
})

module.exports = router;
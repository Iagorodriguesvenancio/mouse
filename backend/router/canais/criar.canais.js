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


router.post("/", auth,async (req, res) => {
   if (req.user.adm == 1) {
    const { id_servidor,nome, descricao } = req.body;
    if (!id_servidor || !nome || !descricao ) {
      return res.status(422).json({ mensagem: "todos os campos são obrigatorios" });
    }
    Canais.createCanais(
      (error) => {
        if (error) return res.status(500).json({ mensagem: "erro ao criar o canal", error: error });

        res.json({ mensagem: "canal criado"});
      },
      {id_servidor,nome, descricao},
    );
  }else{
     return res.status(403).json({ mensagem: "rota de adm" });
  }
});

module.exports = router;
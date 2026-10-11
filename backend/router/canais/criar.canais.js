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
  const { id_servidor,nome, descricao } = req.body;
  if (!id_servidor || !nome || !descricao ) {
    return res.status(500).json({ men: "todos os campos são obrigatorios" });
  }
  Canais.createCanais(
    (error) => {
      if (error) return res.status(500).json({ men: "erro ao criar o canal", error: error });

      res.json({ message: "canal criado"});
    },
    {id_servidor,nome, descricao },
  );
});

module.exports = router;
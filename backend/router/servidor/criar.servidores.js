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


router.post("/", auth,async (req, res) => {
  const { nome, descricao ,materia} = req.body;
  if (!nome || !descricao || !materia ) {
    return res.status(500).json({ mensagem: "todos os campos são obrigatorios" });
  }
  Servidor.createServidor(
    (error) => {
      if (error) return res.status(500).json({ mensagem: "erro ao criar servidor", error: error });

      res.json({ mensagem: "servidor criado"});
    },
    { nome, descricao, id_user: req.user.userId,materia },
  );
});

module.exports = router;
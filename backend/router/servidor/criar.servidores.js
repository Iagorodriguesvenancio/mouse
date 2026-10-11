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
  const { nome, descricao } = req.body;
  if (!nome || !descricao ) {
    return res.status(500).json({ men: "todos os campos são obrigatorios" });
  }
  Servidor.createServidor(
    (error) => {
      if (error) return res.status(500).json({ men: "erro ao criar servidor", error: error });

      res.json({ message: "servidor criado"});
    },
    { nome, descricao, id_user: req.user.userId },
  );
});

module.exports = router;
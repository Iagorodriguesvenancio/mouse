const express = require('express');


const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const Servidor = require('../server/Servidor.db.js');
const auth = require('../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser())


router.post("/", auth,async (req, res) => {
  const { id_servidor } = req.body;
  if (!id_servidor ) {
    return res.status(500).json({ men: "todos os campos são obrigatorios" });
  }
  Servidor.ligacao(
    (error, servidorId) => {
      if (error) return res.status(500).json({ men: "erro ao se juntar ao servidor", error: error });

      res.json({ message: "parabens por entrar no servidor" , servidorId: servidorId });
    },
    { id_user: req.user.userId, id_servidor},
  );
});

module.exports = router;
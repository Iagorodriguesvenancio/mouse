const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../../server/User.db.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());


router.post("/", async (req, res) => {
  const { username,email, cpf, password } = req.body;
  if (!username || !email || !cpf || !password) {
    return res.status(500).json({ mensagem: "todos os campos são obrigatorios" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedCPF = await bcrypt.hash(cpf, 10);

  User.createUser(
    (error, userId) => {
      if (error) return res.status(500).json({ mensagem: "erro ao criar usuario", error: error });

      const token = jwt.sign({ userId: userId, adm: 0 }, JWT_SECRET, {
        expiresIn: "24h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // HTTPS
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });
      return res.json({ mensagem: "usuario criado" });
    },
    { username, email, cpf:hashedCPF, password: hashedPassword },
  );
});

module.exports = router;
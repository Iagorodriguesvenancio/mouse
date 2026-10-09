const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../server/User.db.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/", async (req, res) => {
    const { cpf, password } = req.body;
    if (!cpf || !password) {
        return res.status(500).json({ men: "todos os campos são obrigatorios" });
    }
    User.logar(
        async (error, resultado) => {
            if (error) return res.status(500).json({ men: "erro ao logar", error: error });

            if (!resultado || resultado.length === 0) {
                return res.status(401).json({men: "CPF não encontrado"});
            }
            if (bcrypt.compareSync(password, String(resultado[0].password))) {
                const token = jwt.sign(
                    { userId: resultado[0].id_user, adm: resultado[0].adm },
                    JWT_SECRET,
                    { expiresIn: "24h" },
                );
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false, // HTTPS
                    sameSite: "strict",
                    maxAge: 60 * 60 * 1000,
                });
                res.json({ message: "Login realizado" });
            }
        },
        { cpf },
    );
})

module.exports = router;
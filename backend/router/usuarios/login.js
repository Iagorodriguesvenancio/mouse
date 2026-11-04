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
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({ mensagem: "todos os campos são obrigatorios" });
    }

    User.logar(
        async (error, resultado) => {
            if (error) return res.status(500).json({ mensagem: "erro ao logar", error: error });

            if (!resultado || resultado.length === 0) {
                return res.status(401).json({mensagem: "senha ou email errados"});
            }
            if (bcrypt.compareSync(password, String(resultado[0].password))) {
                const token = jwt.sign(
                    { userId: resultado[0].id_user, adm: resultado[0].adm },
                    JWT_SECRET,
                    { expiresIn: "1h" },
                );
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false, // HTTPS
                    sameSite: "strict",
                    maxAge: 60 * 60 * 1000,
                });
                console.log();
                
                return res.json({ message: "Login realizado" });
            }else{
                return  res.status(401).json({mensagem: "senha ou email errados"})
            }
        },
        { email },
    );
})

module.exports = router;
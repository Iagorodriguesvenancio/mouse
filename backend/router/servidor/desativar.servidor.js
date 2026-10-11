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

router.post("/", auth, (req, res) => {
    const { id_servidor } = req.body
    if (!id_servidor) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    Servidor.desativarServidor((error, resultado) => {
        if (error) res.status(500).json({ mensagem: "erro ao pegar servidores", error: error });

        return res.status(201).json({
            mensagem: "servidor deletado"
        });
    }, { id_servidor })

})

module.exports = router;
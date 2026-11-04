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
    if (req.user.adm == 1) {
        const { id_servidor } = req.body
        if (!id_servidor) {
            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios"
            });
        }
        
        Servidor.desativarServidor((error) => {
            if (error)return res.status(500).json({ mensagem: "erro ao pegar servidores", error: error });

            return res.status(201).json({
                mensagem: "servidor deletado"
            });
        }, { id_servidor })
    }else{
         return res.status(403).json({ mensagem: "rota de adm" });
    }
})

module.exports = router;
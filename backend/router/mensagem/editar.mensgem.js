const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const Mensagem = require('../../server/Mensagem.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/", (req, res) => {
    const { id_mensagem, mensagem } = req.body
    if (!mensagem) {
        return res.status(500).json({ men: "todos os campos são obrigatorios" });
    }

    Mensagem.updateMensagem((error) => {
        if (error) {
            return res.status(500).json({ men: "Erro ao editar as mensagens", erro: error.message, });
        }
        return res.status(201).json({
            men: "mensagem editada com sucesso",
        });
    },{mensagem,id_mensagem})

})

module.exports = router
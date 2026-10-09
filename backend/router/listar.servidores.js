const express = require('express');

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv').config();

const Servidor = require('../server/Servidor.db.js');
const auth = require('../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.get("/", (req, res) => {
    Servidor.getServidor((error, resultado) => {
        if (error)res.status(500).json({ mensagem: "erro ao pegar servidores", error: error });

        res.status(200).json(resultado);
    });
    
})

module.exports = router;
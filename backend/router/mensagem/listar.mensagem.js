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
    const {id_canal} = req.body
    Mensagem.getMensagem((error, resultado) => {
        if (error)res.status(500).json({ mensagem: "erro ao pegar as mensagems", error: error });

        res.status(200).json(resultado);
    },{id_canal});
    
})

module.exports = router;
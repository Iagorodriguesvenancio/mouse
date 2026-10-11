const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../../server/User.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/", auth, (req, res) => {
     const {id } = req.body
    if (!id) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }
    if (req.user.adm == 1) {
        User.desativarUser((error, resultado) => {
            if (error)res.status(500).json({ mensagem: "erro ao pegar usuarios", error: error });
            
             return res.status(201).json({
            mensagem: "usuario deletado"
        });
        },{id})
    }else{
         res.status(403).json({ men: "rota de adm" });
    }
})

module.exports = router;
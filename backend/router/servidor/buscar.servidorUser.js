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

router.get("/", auth,async (req, res) => {
    Servidor.getServidoresUser((error,resultado)=>{
        if (error) return res.status(500).json({ mensagem: "erro ao criar servidor", error: error });

        res.json(resultado);
    },{id_user:req.user.userId})
})

module.exports = router
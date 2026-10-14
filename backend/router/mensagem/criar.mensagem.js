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

router.post("/",auth,(req,res)=>{
    const {id_canal,mensagem} = req.body

    if(!id_canal || !mensagem){
        return res.status(500).json({ men: "todos os campos são obrigatorios" });
    }

    Mensagem.createMensagem((error) =>{
        if(error) return res.status("500").json({men:"erro ao enviar a mensagem", error:error})

        res.json({ message: " mensagem enviada"});
    },{ id_user: req.user.userId,id_canal,mensagem})
})

module.exports = router
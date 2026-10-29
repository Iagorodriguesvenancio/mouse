const express = require("express")

const cookieParser = require("cookie-parser")

const dotenv = require('dotenv').config();

const Canais = require('../../server/Canais.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());


router.post("/",auth,(req,res) =>{
    const {id_canal} = req.body

    Canais.desativarCanais((error)=>{
        if(error){
            return res.status(500).json({ 
                men: "Erro ao atualizar Canais",
                erro: error.message
            })
        }

        return res.status(201).json({
            men: "Canais desativado com sucesso",
        });
    },{id_canal})
})
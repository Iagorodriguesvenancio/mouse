const express = require("express")
const cookieParser = require("cookie-parser")

const doenv = require("dotenv").config()

const Mensagem = require('../../server/Mensagem.db.js');
const auth = require("../../auth/authLogin.js")

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/", (req,res) =>{
    const {id_mensagem} = req.body

    Mensagem.desativarMensagem((error) =>{
        if(error){
            return res.status(500).json({
                men: "Erro ao deletar as mensagens",
                erro: error.message
            })
        }

         return res.status(201).json({
            men: "mensagem deletada com sucesso",
        });
    })
})
const express = require('express');

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv').config();

const Servidor = require('../../server/Servidor.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/", auth, (req, res) => {
    const { nome } = req.body


    Servidor.getServidorBusca((error, resultado) => {
        if (error)
            res
                .status(500)
                .json({ mensagem: "erro ao pegar os servidores", error: error });
        res.status(200).json(resultado);
    }, nome);

})

module.exports = router;
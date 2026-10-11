const express = require('express');

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv').config();

const Canais = require('../../server/Canais.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/", (req, res) => {
    const { id_servidor } = req.body
    Canais.getCanais((error, resultado) => {
        if (error)res.status(500).json({ mensagem: "erro ao pegar canais", error: error });

        res.status(200).json(resultado);
    },{id_servidor} );
})

module.exports = router;
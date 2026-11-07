const express = require('express');

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const Mensagem = require('../../server/Mensagem.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

const { enviarParaCanal } = require('../../ws.js'); // ajuste o caminho conforme sua pasta

router.post("/", auth, (req, res) => {
    const { id_canal, mensagem } = req.body;

    if (!id_canal || !mensagem) {
        return res.status(422).json({ mensagem: "todos os campos são obrigatorios" });
    }

    Mensagem.createMensagem((error) => {
        if (error) return res.status(500).json({ mensagem: "erro ao enviar a mensagem", error });

        // <-- novo: manda para todos no canal
        enviarParaCanal(id_canal, {
            tipo: 'nova_mensagem',
            id_user: req.user.userId,
            id_canal,
            mensagem
        });

        res.json({ mensagem: "mensagem enviada" });
    }, { id_user: req.user.userId, id_canal, mensagem });
});
module.exports = router
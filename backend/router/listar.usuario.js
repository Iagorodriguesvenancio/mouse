const express = require('express');

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv').config();

const User = require('../server/User.db.js');
const auth = require('../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.get("/", auth, (req, res) => {
    if (req.user.adm == 1) {
        User.getUser((error, resultado) => {
            if (error)
                res
                    .status(500)
                    .json({ mensagem: "erro ao pegar usuarios", error: error });
            res.status(200).json(resultado);
        });
    } else {
        res.status(403).json({ men: "rota de adm" });
    }
})

module.exports = router;
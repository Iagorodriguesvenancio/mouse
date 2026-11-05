const express = require('express');

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv').config();

const User = require('../../server/User.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.get("/", auth, (req, res) => {
    User.getUserId((error, resultado) => {
        if (error)return res.status(500).json({ mensagem: "erro ao pegar usuarios", error: error });
        
        return res.status(200).json(resultado);
        },{id_user: req.user.userId});
})

module.exports = router;
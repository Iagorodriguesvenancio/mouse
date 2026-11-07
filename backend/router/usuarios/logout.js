const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../../server/User.db.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/", (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });
    console.log("q");
    

    return res.status(200).json({
        mensagem: "Logout realizado com sucesso."
    });

});

module.exports = router
const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../server/User.db.js');
const auth = require('../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/",auth, async (req,res)=>{
  if (req.user.adm == 1) {
    let { username, email, password, status, adm, id_user } = req.body;
    if(password !== null){
      const hashedPassword = await bcrypt.hash(password, 10);
    }else{
      const hashedPassword = null;
    }
    User.updateUser((error) => {
      if (error) {
        return res.status(500).json({
          logado: false,
          mensagem: "Erro ao atualizar usuário",
          erro: error.message,
        });
      }
      return res.status(201).json({
        logado: true,
        mensagem: "Usuário atualizado com sucesso",
      });
    },{username, email,hashedPassword,status,adm,id_user});
  } else {
    res.status(403).json({ men: "rota de adm" });
  }
})

module.exports = router;
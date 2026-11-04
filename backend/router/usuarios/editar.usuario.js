const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../../server/User.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/",auth, async (req,res)=>{
  let hashedPassword;
    let { username,descricao,pronome, email, password, status, adm } = req.body;
    if(password !== null){
       hashedPassword = await bcrypt.hash(password, 10);
    }else{
       hashedPassword = null;
    }
    User.updateUser((error) => {
      if (error) {
        return res.status(500).json({
          mensagem: "Erro ao atualizar usuário",
          erro: error.message,
        });
      }
      return res.status(201).json({
        mensagem: "Usuário atualizado com sucesso",
      });
    },{username,descricao,pronome, email,password:hashedPassword,status,adm,id_user:req.user.userId});
})

module.exports = router;
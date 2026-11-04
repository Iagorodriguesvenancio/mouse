const express = require("express");

const cookieParser = require("cookie-parser");

const dotenv = require("dotenv").config();

const Canais = require("../../server/Canais.db.js");
const auth = require("../../auth/authLogin.js");

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/", auth, (req, res) => {
  if (req.user.adm == 1) {
    const { id_canal } = req.body;
    Canais.desativarCanais(
      (error) => {
        if (error) return res.status(500).json({mensagem: "Erro ao atualizar o Canal",erro: error.message,});
        
        return res.status(201).json({
          mensagem: "Canal desativado com sucesso",
        });
      },
      { id_canal },
    );
  } else {
    return res.status(403).json({ mensagem: "rota de adm" });
  }
});

module.exports = router;
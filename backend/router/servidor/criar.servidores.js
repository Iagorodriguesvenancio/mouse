const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');

const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const Servidor = require('../../server/Servidor.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB por imagem
    },
    fileFilter: (req, file, callback) => {
        const tiposPermitidos = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ];

        if (tiposPermitidos.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Formato de imagem não permitido'));
        }
    }
});

router.post("/", auth,upload.fields([{ name: 'icon', maxCount: 1 },]),async (req, res) => {
  if (req.user.adm == 1) {
    const { nome, descricao ,materia} = req.body;
    if (!nome || !descricao || !materia ) {
      return res.status(500).json({ mensagem: "todos os campos são obrigatorios" });
    }

    const icon = req.files?.icon?.[0]?.buffer || null;

    Servidor.createServidor(
      (error) => {
        if (error) return res.status(500).json({ mensagem: "erro ao criar servidor", error: error });
        res.json({ mensagem: "servidor criado"});
      },
      { nome, descricao, icon,proprietário_server:req.user.userId,materia },
    );
  }else{
     return res.status(403).json({ mensagem: "rota de adm" });
  }
});

module.exports = router;
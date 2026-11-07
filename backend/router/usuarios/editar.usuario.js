const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');

const User = require('../../server/User.db.js');
const auth = require('../../auth/authLogin.js');

const router = express.Router();

router.use(cookieParser());

// Configuração do Multer
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

// Atualizar usuário
router.post(
    '/',
    auth,
    upload.fields([
        { name: 'icon', maxCount: 1 },
        { name: 'banner', maxCount: 1 }
    ]),
    async (req, res) => {
        try {
            const {
                username,
                descricao,
                pronome,
                email,
                password
            } = req.body;

            let hashedPassword = null;

            if (password && password.trim() !== '') {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            // Recuperar imagens como Buffer
            const icon = req.files?.icon?.[0]?.buffer || null;
            const banner = req.files?.banner?.[0]?.buffer || null;

            User.updateUser((error) => {
                if (error) {
                    return res.status(500).json({
                        mensagem: 'Erro ao atualizar usuário',
                        erro: error.message
                    });
                }

                return res.status(200).json({
                    mensagem: 'Usuário atualizado com sucesso'
                });

            }, {
                username,
                descricao,
                pronome,
                email,
                password: hashedPassword,
                icon,
                banner,
                id_user: req.user.userId
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao atualizar usuário',
                erro: error
            });
        }
    }
);

module.exports = router;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const cadastroRouter = require('./router/cadastro.js');
const loginRouter = require('./router/login.js');
const listarUsuarioRouter = require('./router/listar.usuario.js');
const editarUsuarioRouter = require('./router/editar.usuario.js');
const desativarUsuarioRouter = require('./router/desativar.usuario.js');

const app = express();
app.use(cors({
  origin: "*", // Permite qualquer origem
  methods: ["GET", "POST", "OPTIONS", "UPDATE"], // Métodos permitidos
  allowedHeaders: ["Content-Type"], // Cabeçalhos permitidos
}));

app.use('/cadastro', cadastroRouter);
app.use('/login', loginRouter);

// <-- rotas listar -->
app.use("/listar/usuarios", listarUsuarioRouter);

// <-- rotas editar --> 
app.use("/editar/usuarios", editarUsuarioRouter);

// <-- rotas desativar -->
app.use("/desativar/usuarios", desativarUsuarioRouter);


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
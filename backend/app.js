const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const cadastroRouter = require('./router/cadastro.js');
const loginRouter = require('./router/login.js');
const listarUsuarioRouter = require('./router/listar.usuario.js');
const editarUsuarioRouter = require('./router/editar.usuario.js');
const desativarUsuarioRouter = require('./router/desativar.usuario.js');

const criarServidorRouter = require('./router/criar.servidores.js');
const listarServidorRouter = require('./router/listar.servidores.js');
const editarServidorRouter = require('./router/editar.servidor.js');
const desativarServidorRouter = require('./router/desativar.servidor.js');

const app = express();
app.use(cors({
  origin: "*", // Permite qualquer origem
  methods: ["GET", "POST", "OPTIONS", "UPDATE"], // Métodos permitidos
  allowedHeaders: ["Content-Type"], // Cabeçalhos permitidos
}));

// <-- rotas cadastro e login -->
app.use('/cadastro', cadastroRouter);
app.use('/login', loginRouter);

// <-- rotas criar -->
app.use("/criar/servidores", criarServidorRouter);

// <-- rotas listar -->
app.use("/listar/usuarios", listarUsuarioRouter);
app.use("/listar/servidores", listarServidorRouter);

// <-- rotas editar --> 
app.use("/editar/usuarios", editarUsuarioRouter);
app.use("/editar/servidores", editarServidorRouter);

// <-- rotas desativar -->
app.use("/desativar/usuarios", desativarUsuarioRouter);
app.use("/desativar/servidores", desativarServidorRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const cadastroRouter = require('./router/usuarios/cadastro.js');
const loginRouter = require('./router/usuarios/login.js');
const listarUsuarioRouter = require('./router/usuarios/listar.usuario.js');
const buscarUsuarioRouter = require("./router/usuarios/buscar.usuarios.js")
const editarUsuarioRouter = require('./router/usuarios/editar.usuario.js');
const desativarUsuarioRouter = require('./router/usuarios/desativar.usuario.js');

const criarServidorRouter = require('./router/servidor/criar.servidores.js');
const listarServidorRouter = require('./router/servidor/listar.servidores.js');
const buscarServidorRouter = require("./router/servidor/buscar.servidor.js")
const editarServidorRouter = require('./router/servidor/editar.servidor.js');
const desativarServidorRouter = require('./router/servidor/desativar.servidor.js');

const ligacao = require("./router/ligacao.js")

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

// <-- rotas buscar -->
app.use("/buscar/usuarios", buscarUsuarioRouter)
app.use("/buscar/servidores", buscarServidorRouter)

// <-- rota ligacao-->
app.use("/ligacao", ligacao)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
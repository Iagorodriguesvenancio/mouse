const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Não autenticado" });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    console.log("Token verificado com sucesso:", req.user);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

module.exports = auth;
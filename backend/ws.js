// ws.js
const canais = new Map(); // id_canal -> Set de sockets

function iniciarWS(wss) {
  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data);
        if (msg.tipo === 'entrar_canal') {
          sair(ws);                          // sai do canal anterior
          ws.canal = String(msg.id_canal);
          if (!canais.has(ws.canal)) canais.set(ws.canal, new Set());
          canais.get(ws.canal).add(ws);
        }
      } catch (e) {}
    });

    ws.on('close', () => sair(ws));
  });
}

function sair(ws) {
  if (ws.canal && canais.has(ws.canal)) {
    canais.get(ws.canal).delete(ws);
  }
  ws.canal = null;
}

// envia para todos conectados no canal
function enviarParaCanal(id_canal, payload) {
  const sockets = canais.get(String(id_canal));
  if (!sockets) return;
  const texto = JSON.stringify(payload);
  sockets.forEach((s) => {
    if (s.readyState === 1) s.send(texto);
  });
}

module.exports = { iniciarWS, enviarParaCanal };
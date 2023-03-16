const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);

const WebSocket = require('ws');
const WebSocketServer = WebSocket.WebSocketServer;
const wss = new WebSocketServer({ port: 9090 });

wss.on('connection', (ws) => {
  // ws 就是一个接入的客户端
  ws.on('message', (msg) => {
    console.log('received: %s', msg);
    // 将消息转发给其他人
    wss.clients.forEach((client) => {
      // 遍历当前 WebSocket 服务的所有客户端
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        // 排除掉失活的客户端和当前客户端
        client.send(msg, { binary: false });
      }
    });
  });

  ws.send('欢迎来到聊天室');
});

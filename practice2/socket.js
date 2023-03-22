const WebSocket = require('ws');
const WebSocketServer = WebSocket.WebSocketServer;
const { verify } = require('./utils/JWT');

// 启动 WebSocketServer 服务，端口 3030
const wss = new WebSocketServer({ port: 3030 });

// 监听 WebSocketServer connection 事件，每当一个客户端接入都会触发
wss.on('connection', (ws, req) => {
  // ws 就是接入的客户端
  // req 就是 Node 原生的 request
  const url = new URL(req.url, req.headers.origin);
  const token = url.searchParams.get('token');
  const payload = verify(token);
  if (payload) {
    // 服务端向客户端发送消息
    ws.send(createMessage(MessageType.GroupChat, null, `欢迎 ${payload.username} 来到在线聊天室`));
    ws.auth = payload;
    // 一旦有客户端加入进来，就通知所有客户端刷新在线用户
    const clients = Array.from(wss.clients);
    const groups = clients.map((client) => {
      return {
        id: client.auth.id,
        username: client.auth.username
      };
    });
    clients.forEach((client) => {
      client.send(createMessage(MessageType.GroupList, null, groups));
    });
  } else {
    ws.send(createMessage(MessageType.Unauthorized, null, '无效的登录凭证或凭证已过期'));
  }

  // 监听客户端发送消息给服务端
  ws.on('message', (msg) => {
    const msgData = JSON.parse(msg);
    switch (msgData.type) {
      case MessageType.Unauthorized:
        break;
      case MessageType.Error:
        break;
      case MessageType.GroupList:
        const clients = Array.from(wss.clients);
        const groups = clients.map((client) => {
          return {
            id: client.auth.id,
            username: client.auth.username
          };
        });
        ws.send(createMessage(MessageType.GroupList, null, groups));
        break;
      case MessageType.GroupChat:
        break;
      case MessageType.SingleChat:
        break;
      default:
        break;
    }
  });
});

wss.on('listening', () => {
  console.log('WebSocketServer already listening on port 3030');
});

const MessageType = {
  Unauthorized: -1,
  Error: 0,
  GroupList: 1,
  GroupChat: 2,
  SingleChat: 3
};

const createMessage = (type, from, data) => {
  return JSON.stringify({
    type,
    from,
    data
  });
};

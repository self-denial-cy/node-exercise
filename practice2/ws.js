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
    // 一旦有客户端加入进来，就通知所有在线客户端刷新在线用户
    const clients = Array.from(wss.clients).filter((client) => client.readyState === WebSocket.OPEN);
    clients.forEach((client) => {
      const groups = [];
      clients.forEach((c) => {
        if (c.auth.id !== client.auth.id) {
          groups.push({
            id: c.auth.id,
            username: c.auth.username
          });
        }
      });
      client.send(createMessage(MessageType.GroupList, null, groups));
    });
  } else {
    ws.send(createMessage(MessageType.Unauthorized, null, '无效的登录凭证或凭证已过期'));
  }

  // 监听客户端发送消息给服务端
  ws.on('message', (msg) => {
    const msgData = JSON.parse(msg);
    const clients = Array.from(wss.clients).filter((client) => client.readyState === WebSocket.OPEN);
    const data = msgData.data;
    switch (msgData.type) {
      case MessageType.Unauthorized:
        break;
      case MessageType.Error:
        break;
      case MessageType.GroupList:
        const groups = [];
        clients.forEach((c) => {
          if (c.auth.id !== ws.auth.id) {
            groups.push({
              id: c.auth.id,
              username: c.auth.username
            });
          }
        });
        ws.send(createMessage(MessageType.GroupList, null, groups));
        break;
      case MessageType.GroupChat:
        clients.forEach((client) => {
          client.send(
            createMessage(
              MessageType.GroupChat,
              {
                id: ws.auth.id,
                username: ws.auth.username
              },
              data
            )
          );
        });
        break;
      case MessageType.SingleChat:
        ws.send(
          createMessage(
            MessageType.SingleChat,
            {
              id: ws.auth.id,
              username: ws.auth.username
            },
            {
              room: data.room,
              msg: data.msg
            }
          )
        );
        clients.forEach((client) => {
          if (client.auth.id === data.to) {
            client.send(
              createMessage(
                MessageType.SingleChat,
                {
                  id: ws.auth.id,
                  username: ws.auth.username
                },
                {
                  room: data.room,
                  msg: data.msg
                }
              )
            );
            return;
          }
        });
        break;
      default:
        break;
    }
  });

  ws.on('close', () => {
    // 一旦有客户端退出，就通知所有在线客户端刷新在线用户
    const clients = Array.from(wss.clients).filter((client) => client.readyState === WebSocket.OPEN);
    clients.forEach((client) => {
      const groups = [];
      clients.forEach((c) => {
        if (c.auth.id !== client.auth.id) {
          groups.push({
            id: c.auth.id,
            username: c.auth.username
          });
        }
      });
      client.send(createMessage(MessageType.GroupList, null, groups));
    });
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

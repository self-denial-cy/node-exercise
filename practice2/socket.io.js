const { verify } = require('./utils/JWT');

const MessageType = {
  Unauthorized: -1,
  Error: 0,
  GroupList: 1,
  GroupChat: 2,
  SingleChat: 3
};

module.exports = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    const token = socket.handshake.query.token;
    const payload = verify(token);
    if (payload) {
      socket.auth = payload;
      socket.emit(MessageType.GroupChat, null, `欢迎 ${payload.username} 来到在线聊天室`);
      const sockets = Array.from(io.sockets.sockets.values());
      for (const item of sockets) {
        const groups = [];
        for (const s of sockets) {
          if (s.auth.id !== item.auth.id) {
            groups.push({
              id: s.auth.id,
              username: s.auth.username
            });
          }
        }
        item.emit(MessageType.GroupList, null, groups);
      }
    } else {
      socket.emit(MessageType.Unauthorized, null, '无效的登录凭证或凭证已过期');
    }

    socket.on(MessageType.GroupChat, (msg) => {
      const sockets = Array.from(io.sockets.sockets.values());
      for (const item of sockets) {
        item.emit(
          MessageType.GroupChat,
          {
            id: socket.auth.id,
            username: socket.auth.username
          },
          msg
        );
      }
    });

    socket.on(MessageType.SingleChat, (data) => {
      socket.emit(
        MessageType.SingleChat,
        {
          id: socket.auth.id,
          username: socket.auth.username
        },
        {
          room: data.room,
          msg: data.msg
        }
      );
      const sockets = Array.from(io.sockets.sockets.values());
      sockets.forEach((item) => {
        if (item.auth.id === data.to) {
          item.emit(
            MessageType.SingleChat,
            {
              id: socket.auth.id,
              username: socket.auth.username
            },
            {
              room: data.room,
              msg: data.msg
            }
          );
          return;
        }
      });
    });

    socket.on('disconnect', () => {
      const sockets = Array.from(io.sockets.sockets.values());
      sockets.forEach((item) => {
        const groups = [];
        sockets.forEach((s) => {
          if (s.auth.id !== item.auth.id) {
            groups.push({
              id: s.auth.id,
              username: s.auth.username
            });
          }
        });
        item.emit(MessageType.GroupList, null, groups);
      });
    });
  });
};

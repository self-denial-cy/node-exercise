# Socket 编程

## WebSocket 介绍

应用场景：

- 弹幕
- 媒体聊天
- 协同编辑
- 基于位置的应用
- 体育实况更新
- 股票基金报价实时更新

WebSocket 并不是全新的协议，而是利用 HTTP 协议来建立连接

首先，WebSocket 连接必须由浏览器发起一个标准的 HTTP 请求：

```http
GET ws://localhost:3000/ws/chat HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Origin: http://localhost:3000
Ses-WebSocket-Key: client-random-string
Sec-WebSocket-Version: 13
```

该请求和普通的 HTTP 请求有几点不同：

1. GET 请求的地址不是类似 `/path/`，而是以 `ws://` 开头的地址；
2. 请求头 `Upgrade: websocket` 和 `Connection: Upgrade` 表示这个连接将要被转换为 WebSocket 连接；
3. `Sec-WebSocket-Key` 用于标识这个连接，并非用于加密数据；
4. `Sec-WebSocket-Version` 指定 WebSocket 的协议版本；

随后，服务端如果接受该请求，就会返回如下响应：

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string
```

该响应码 101 表示本次连接的 HTTP 协议即将被更改，更改后的协议就是 `Upgrade: websocket` 指定的 WebSocket 协议

版本号和子协议规定了双方能理解的数据格式，以及是否支持压缩等

如果仅使用 WebSocket 的 API，就不需要关注这些

现在，一个 WebSocket 连接就建立成功，浏览器和服务器就可以随时主动发送消息给对方；消息有两种，一种是文本，一种是二进制数据。通常，我们可以发送 JSON 格式的文本，这样浏览器处理起来就十分容易

为什么 WebSocket 连接可以实现全双工通信而 HTTP 连接不行呢？

实际上 HTTP 协议是建立在 TCP 协议之上的，TCP 协议本身就实现了全双工通信，但是 HTTP 协议的【请求-应答】机制限制了全双工通信。WebSocket 连接建立以后，其实只是简单规定了一下：接下来，咱们通信就不使用 HTTP 协议了，直接互相发数据吧。

安全的 WebSocket 连接机制和 HTTPS 类似：首先，浏览器用 `wss://xxx` 创建 WebSocket 连接时，会先通过 HTTPS 创建安全的连接，然后该 HTTPS 连接升级成 WebSocket 连接，底层通信走的仍然是安全的 SSL/TLS 协议

## ws 模块


const express = require('express');
const app = express();
const WebSocket = require('ws');
const serve = app.listen(3000,function () {
  console.log('server run 3000');
});
const ws = new WebSocket.Server({
  server: serve
});

let testData,clientsInfo = [],clientsUser = {};

app.get('/websocket/sendtoken', function(req, res){
  console.log('data',req.query.token);
  testData = req.query.token;
  res.json({
    msg: 'ok',
    token: req.query.token
  })
});

app.get('/websocket/clientsinfo', function(req, res){
  res.json({
    msg: 'ok',
    data: clientsInfo
  })
});

// 获取连接个数
function allConnections(ws) {
  let i = 0;
  ws.clients.forEach(function each() {
    i+=1
  });
  console.log(`[SERVER] : 共有${i}个连接`);
  return i;
}

// 广播方法
ws.broadcast = function broadcast(data) {
  let num = allConnections(ws);
  ws.clients.forEach(function each(client) {
    client.send('广播'+data +'共有'+ num +'个用户');
  });
  console.log(`[SERVER] 收到客户端消息: ${data},共有${num}个用户`);
}

// 删除用户方法
ws.removeClientInfo = function removeClientInfo(clientsInfo,client) {
  let clientName = client.userName;
  clientsInfo.forEach(function (item,index) {
    if (item.userName === clientName){
      clientsInfo.splice(index,1);
    }
  });
  return clientsInfo;
}

ws.on('connection', function (result) {
  console.log(`[SERVER] 客户端已连接`);
  result.on('message', function (message) {
    let res = JSON.parse(message);
    if (res.used === 'login'){
      // 用户登录后储存用户信息
      clientsUser[res.userName] = result;
      clientsInfo.push(res);
      result.send('from server' + res.userName + '已储存');
      console.log(res.userName + '已储存');
    }
    if(res.used === 'logout'){
      // 用户登出时删除用户信息
      delete clientsUser[res.userName];
      ws.removeClientInfo(clientsInfo,res);
      result.send('from server' + res.userName + '已删除');
      console.log(res.userName + '已删除');
    }
    // 管理端查看 发送当前连接数
    if(res.used === 'manage'){
      let currentClients = JSON.stringify(clientsInfo);
      result.send(currentClients);
      console.log(res.userName + '信息已发送');
    }
    // 管理端 发送websocket信息
    if (res.used === 'send'){
      let sendUser = clientsUser[res.userName];
      sendUser.send('hello,world!')
    }
    // 管理端 群发除了自己
    if (res.used === 'sendall'){
      console.log('接收到群发消息');
      ws.clients.forEach(function each(client) {
        if (client !== result) {
          client.send('广播消息');
        }
      });
    }
    // 广播
    // ws.broadcast(res.msg);
    // console.log(`[SERVER] 收到客户端消息: ${res.msg}`);
    // 单发
    // result.send(`ECHO: ${res.msg}`, (err) => {
    //   if (err) {
    //     console.log(`[SERVER] error: ${err}`);
    //   }else {
    //     console.log(`[SERVER] 收到客户端消息: ${res.msg}`);
    //   }
    // });

  })
  result.on('close', function (closeResult) {
    console.log(`[SERVER] 客户端${closeResult}连接已关闭`);
  });
});



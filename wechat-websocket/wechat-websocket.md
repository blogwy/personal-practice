---
title: "小程序WebSocket实践(心跳检测、断线重连)"
date: 2019-10-30
tags:
  - 小程序
  - WebSocket
---

我把小程序WebSocket的一些功能封装成一个类，里面包括建立连接、监听消息、发送消息、心跳检测、断线重连等等常用的功能。

[点击查看](https://github.com/blogwy/personal-practice/blob/master/wechat-websocket/wechat-websocket.js)

## 使用方法

在app.js里面引入，然后在onLaunch里面创建

```javascript
import websocket from './utils/wechat-websocket.js'

//app.js
App({
  onLaunch() {
    let _this = this;
    // 创建websocket对象
    this.websocket = new websocket({
      // true代表启用心跳检测和断线重连
      heartCheck: true,
      isReconnection: true
    });
    // 建立连接
    this.linkWebsocket();
    // 监听websocket状态
    this.websocket.onSocketClosed({
      url: this.globalData.websocketUrl,
      success(res) { console.log(res) },
      fail(err) { console.log(err) }
    })
    // 监听网络变化
    this.websocket.onNetworkChange({
      url: this.globalData.websocketUrl,
      success(res) { console.log(res) },
      fail(err) { console.log(err) }
    })
    // 监听服务器返回
    this.websocket.onReceivedMsg(result => {
      console.log('app.js收到服务器内容：' + result.data);
      // 要进行的操作
    })
  },
  onHide(){
    // 程序后台后的操作--关闭websocket连接
    this.websocket.closeWebSocket();
  },
  onShow(){
    // 程序从后台到前台的操作--建立连接
    this.linkWebsocket();
  }.
  linkWebsocket() {
    // 建立连接
    this.websocket.initWebSocket({
      url: this.globalData.websocketUrl,
      success(res) { console.log(res) },
      fail(err) { console.log(err) }
    })
  },
  getWebSocket() {
    // 向其他页面暴露当前websocket连接
    return this.websocket;
  },
  globalData: {
    websocketUrl: 'wss://xxx.com/websocket'
  }
})
```


export default class websocket {
  constructor({ heartCheck, isReconnection }) {
    // 是否连接
    this._isLogin = false;
    // 当前网络状态
    this._netWork = true;
    // 是否人为退出
    this._isClosed = false;
    // 心跳检测频率
    this._timeout = 3000;
    this._timeoutObj = null;
    // 当前重连次数
    this._connectNum = 0;
    // 心跳检测和断线重连开关，true为启用，false为关闭
    this._heartCheck = heartCheck;
    this._isReconnection = isReconnection;
    this._onSocketOpened();
  }
  // 心跳重置
  _reset() {
    clearTimeout(this._timeoutObj);
    return this;
  }
  // 心跳开始
  _start() {
    let _this = this;
    this._timeoutObj = setInterval(() => {
      wx.sendSocketMessage({
        // 心跳发送的信息应由前后端商量后决定
        data: JSON.stringify({
          "key": 'value'
        }),
        success(res) {
          console.log(res)
          console.log("发送心跳成功");
        },
        fail(err) {
          console.log(err)
          _this._reset()
        }
      });
    }, this._timeout);
  }
  // 监听websocket连接关闭
  onSocketClosed(options) {
    wx.onSocketClose(err => {
      console.log('当前websocket连接已关闭,错误信息为:' + JSON.stringify(err));
      // 停止心跳连接
      if (this._heartCheck) {
        this._reset();
      }
      // 关闭已登录开关
      this._isLogin = false;
      // 检测是否是用户自己退出小程序
      if (!this._isClosed) {
        // 进行重连
        if (this._isReconnection) {
          this._reConnect(options)
        }
      }
      
    })
  }
  // 检测网络变化
  onNetworkChange(options) {
    wx.onNetworkStatusChange(res => {
      console.log('当前网络状态:' + res.isConnected);
      if (!this._netWork) {
        this._isLogin = false;
        // 进行重连
        if (this._isReconnection) {
          this._reConnect(options)
        }
      }
    })
  }
  _onSocketOpened() {
    wx.onSocketOpen(res => {
      console.log('websocket已打开');
      // 打开已登录开关
      this._isLogin = true;
      // 发送心跳
      if (this._heartCheck) {
        this._reset()._start();
      }
      // 发送登录信息
      wx.sendSocketMessage({
        // 这里是第一次建立连接所发送的信息，应由前后端商量后决定
        data: JSON.stringify({
          "key": 'value'
        })
      })
      // 打开网络开关
      this._netWork = true;
    })
  }
  // 接收服务器返回的消息
  onReceivedMsg(callBack) {
    wx.onSocketMessage(msg => {
      if (typeof callBack == "function") {
        callBack(msg)
      } else {
        console.log('参数的类型必须为函数')
      }
    })
  }

  // 建立websocket连接
  initWebSocket(options) {
    let _this = this;
    if (this._isLogin) {
      console.log("您已经登录了");
    } else {
      // 检查网络
      wx.getNetworkType({
        success(result) {
          if (result.networkType != 'none') {
            // 开始建立连接
            wx.connectSocket({
              url: options.url,
              success(res) {
                if (typeof options.success == "function") {
                  options.success(res)
                } else {
                  console.log('参数的类型必须为函数')
                }
              },
              fail(err) {
                if (typeof options.fail == "function") {
                  options.fail(err)
                } else {
                  console.log('参数的类型必须为函数')
                }
              }
            })
          } else {
            console.log('网络已断开');
            _this._netWork = false;
            // 网络断开后显示model
            wx.showModal({
              title: '网络错误',
              content: '请重新打开网络',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        }
      })
    }
  }
  // 发送websocket消息
  sendWebSocketMsg(options) {
    wx.sendSocketMessage({
      data: options.data,
      success(res) {
        if (typeof options.success == "function") {
          options.success(res)
        } else {
          console.log('参数的类型必须为函数')
        }
      },
      fail(err) {
        if (typeof options.fail == "function") {
          options.fail(err)
        } else {
          console.log('参数的类型必须为函数')
        }
      }
    })
  }
  // 重连方法，会根据时间频率越来越慢
  _reConnect(options) {
    let timer, _this = this;
    if (this._connectNum < 20) {
      timer = setTimeout(() => {
        this.initWebSocket(options)
      }, 3000)
      this._connectNum += 1;
    } else if (this._connectNum < 50) {
      timer = setTimeout(() => {
        this.initWebSocket(options)
      }, 10000)
      this._connectNum += 1;
    } else {
      timer = setTimeout(() => {
        this.initWebSocket(options)
      }, 450000)
      this._connectNum += 1;
    }
  }
  // 关闭websocket连接
  closeWebSocket(){
    wx.closeSocket();
    this._isClosed = true;
  }
}
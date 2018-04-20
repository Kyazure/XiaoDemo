//app.js
App({

  ALL_PASS_COUNT: 4, //5道题通关

  REQ_SERVER: "http://localhost:8080/SpringMvcPx/",
  //REQ_SERVER: "https://www.coder10.net",
  
  //小程序启动的时候，执行这个函数
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          /**
           * 异步获取，不是同步；
           * 异步
           * 1、request 
           * 2、执行了；
           * 
           * 同步
           * 1、request
           * 2、1执行完成之后 2才执行
           */
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  //全局的数据
  globalData: {
    userInfo: null
  }

})


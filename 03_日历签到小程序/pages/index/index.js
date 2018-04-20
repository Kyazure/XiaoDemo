//index.js
//获取应用实例
const app = getApp()

Page({

  data: {

  },
  

  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo;
        //setData 页面和后台数据进行绑定的一个函数；
        this.setData({
          userInfo: res.userInfo,
          motto:'我是xiaodemo'
        })
      }
    })
  }

})

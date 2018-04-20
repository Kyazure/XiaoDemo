// pages/openid/openid.js

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //在进入页面的时候，或者进入app onlaunch的时候获取用户信息
    wx.getUserInfo({
      //授权，获取用户信息
      success: res => {
        console.log(res.userInfo);
        //用户信息
        this.setData({
          userInfo: res.userInfo
        });

        wx.login({
          success: res => {
            //从开发服务器获取openid
            var code = res.code;
            console.log("========= 授权成功 code = " + code);
            
            wx.request({
              url: app.REQ_SERVER + 'xcx/rest/getOpenid.htm',
              data: {
                jscode: code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: res => {
                console.log("======== openid = " + res.data);
              },
              fail: function (res) {
                console.log("jscode2session fail");
              },
            });
          }
        });
        
      },
      
      fail: res => {
        console.log("授权失败....");
      }
    });

  },
  
  //获取用户信息
  handleGetUserInfo: function(res){
    console.log(res);

    //
    wx.login({
      success: res => {
        //从开发服务器获取openid
        var code = res.code;
        console.log("========= handleGetUserInfo  授权成功 code = " + code);
      }
    });
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
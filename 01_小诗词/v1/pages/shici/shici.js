// pages/shici/shici.js
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
    //request server
    var question={
      title:"锄禾日当午"
    };
    var answers = [
      { title: "A. 汗滴禾下土"},
      { title: "B. 汉滴禾下土"},
      { title: "C. 汗滴禾吓土"},
      { title: "D. 汗滴禾下图"},
      { title: "E. 汗弟禾下图" }
    ];

    this.setData({
      question: question,
      answers: answers
    });
  },
  
  //按钮点击
  handleClick: function(e){
    console.log("===========================");
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
// pages/shici/shici.js
var sc = require("../../service/ShiCi.js");
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
    this.initData();
  },

  initData: function(){

    //一般是从服务器取；
    var cursorIndex = this.data.cursorIndex;
    if (!cursorIndex && cursorIndex != 0){
      cursorIndex = 0;
    }
    var that = this;
    var obj = sc.getAnswers(cursorIndex);//获取诗词答案
    var answers = obj.answers;
    var question = obj.question;
    this.setData({
      showIndex: cursorIndex,
      finishedFlag: false,
      question: question,
      answers: answers,
      failure:false,
      answerResult:""
    }); 
  },
  
  //按钮点击
  handleClick: function(e){
    if(this.data.finishedFlag){//已经结束了，我们return掉；
      return;
    }
    var id = e.currentTarget.dataset.id;
    var at = e.currentTarget.dataset.at;
    var item = this.getSelectAnswer(id);

    var answerResult = "回答正确";
    if(at === "warn"){//错误答案
      item.resultFlag = true;
      answerResult = "回答错误";
      this.setData({
        failure:true
      });
    }else{
      var that = this;
      var cursorIndex = that.data.cursorIndex; 
      if (!cursorIndex) {
        cursorIndex = 0;
      }

      //5道题全部答对就算通过；
      if (cursorIndex === app.ALL_PASS_COUNT){
        wx.showToast({
          title: '您已经通关！',
          icon: 'success',
          duration: 3000
        });
        return;
      }

      var content = this.data.question.content;
      wx.showModal({
        title: '答题成功',
        content: content,
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            that.setData({
              cursorIndex: cursorIndex+1
            });
            that.initData();
          } 
        }
      })
    }
    //当修改了前端展示的数据的时候，就必须要setData一下，让数据生效
    this.setData({
      finishedFlag:true,
      answers: this.data.answers,
      answerResult: answerResult
    });
  },

  //根据id获取选择的答案
  getSelectAnswer: function(id){
    var tmpItem = null;
    var answers = this.data.answers;
    for(var i = 0; i < answers.length; i++){
      var item = answers[i];
      if (item.answerType === "primary"){
        item.resultFlag = true;
      }
      if(item.id === id){
        tmpItem = item;
      }
    }
    return tmpItem;
  },

  //重新回答
  reAnswer : function(){
    this.initData();
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
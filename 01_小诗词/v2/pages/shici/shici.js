// pages/shici/shici.js
var sc = require("../../service/ShiCi.js");

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
    //request server
    var question = {
      title: "锄禾日当午"
    };
    var answers = sc.getAnswers();
    this.setData({
      question: question,
      answers: answers,
      failure:false,
      answerResult:""
    });
  },
  
  //按钮点击
  handleClick: function(e){
    var id = e.currentTarget.dataset.id;
    var at = e.currentTarget.dataset.at;
    var item = this.getSelectAnswer(id);

    var answerResult = "回答正确";
    if(at === "warn"){//错误答案
      item.success = true;
      answerResult = "回答错误";
      this.setData({
        failure:true
      });
    }
    //当修改了前端展示的数据的时候，就必须要setData一下，让数据生效
    this.setData({
      answers: this.data.answers,
      answerResult: answerResult
    });
  },

  //根据id获取选择的答案
  getSelectAnswer: function(id){
    var answers = this.data.answers;
    for(var i = 0; i < answers.length; i++){
      var item = answers[i];
      if (item.answerType === "primary"){
        item.success = true;
      }
      if(item.id === id){
        return item;
      }
    }
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
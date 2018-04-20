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
    //诗词
    var question = "锄禾日当午";
    var answer = "汗滴禾下土";
    var randomChars = ["汉", "第", "喝", "瞎", "图", "你", "好"];


    var tmpChars = answer.split("").concat(randomChars);
    
    //排序
    tmpChars.sort(function(){
      return 0.5 - Math.random();
    });

    //诗词的
    app.globalData.indexStack = [];

    //已选取
    var questionChars = [];
    for (var i = 0; i < question.length; i++) {
      var obj = { "num": 0, "char": "", "index": i };
      questionChars.push(obj);
      app.globalData.indexStack.unshift(i);//下标入栈
    }

    //待选取
    var answerChars = [];
    for (var i = 0; i < tmpChars.length; i++) {
      var obj = { "num": i, "char": tmpChars[i], "visiable": true, "disabled": false };
      answerChars.push(obj);
    }

    this.setData({
      question: question,
      answer: answer,
      questionChars: questionChars,
      answerChars: answerChars,
    }); 
  },

  //选中字符要将字符移动到上方
  selectChar: function (n, c) {
    var questionChars = this.data.questionChars;
    var curIndex = app.globalData.indexStack.pop();//出栈
    if (curIndex != undefined) {
      for (var i = 0; i < questionChars.length; i++) {
        var item = questionChars[i];
        if (curIndex === item.index) {
          item.num = n;
          item.char = c;
          this.setData({
            questionChars: questionChars
          });
          this.setToSelectCharVisiable(n, false);
          break;
        }
      }
      return false;
    } else {
      return true;
    }
  },

  //验证成语
  validWords: function () {
    var resultFlag = "continue";
    var questionChars = this.data.questionChars;
    if (app.globalData.indexStack.length === 0) {//已经都选中了
      var targetChars = "";
      for (var i = 0; i < questionChars.length; i++) {
        targetChars += questionChars[i].char;
      }
      if (targetChars === this.data.answer) {
        wx.showToast({
          title: '回答正确！',
          icon: 'success',
          duration: 3000
        });
      } else {
        wx.showToast({
          title: '回答错误！',
          icon: 'success',
          duration: 3000
        });
      }
    } else {
      resultFlag = "next";
    }
    return resultFlag;
  },

  //设置待选取字的可见性
  setToSelectCharVisiable: function (n, visiable) {
    var answerChars = this.data.answerChars;
    for (var i = 0; i < answerChars.length; i++) {
      var item = answerChars[i];
      if (item.num === n) {
        item.visiable = visiable;
        item.disabled = !visiable;
        this.setData({
          answerChars: answerChars
        });
        break;
      }
    }
  },
  
  //按钮点击
  handleClick: function(e){
    var c = e.target.dataset.c; //按钮文字
    var n = e.target.dataset.n; //按钮数字
    
    //选中字
    this.selectChar(n, c);
    //验证词语
    this.validWords();
  },

  //点击选中字触发事件
  handleClickSelected: function (e) {
    var c = e.target.dataset.c; //按钮文字
    var n = e.target.dataset.n;//num
    if (c === "") {
      return;
    }
    if (c && c != "") {
      var curIndex = e.target.dataset.i; //按钮在栈中的下标
      var questionChars = this.data.questionChars;
      app.globalData.indexStack.push(curIndex);//入栈
      for (var i = 0; i < questionChars.length; i++) {
        var item = questionChars[i];
        if (curIndex === item.index) {
          item.num = 0;
          item.char = "";
          this.setData({
            questionChars: questionChars
          });
          this.setToSelectCharVisiable(n, true);
          break;
        }
      }
      //重新入栈
      var question = this.data.question;
      if (app.globalData.indexStack.length === question.length) {
        app.globalData.indexStack = [];
        for (var i = 0; i < question.length; i++) {
          app.globalData.indexStack.unshift(i);//重新入栈
        }
      }
      //排序，然后倒序
      app.globalData.indexStack.sort().reverse();
    }
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
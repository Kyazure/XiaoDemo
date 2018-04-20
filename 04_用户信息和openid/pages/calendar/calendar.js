// pages/daka/daka.js
var Calendar = require("../../service/Calendar.js");

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
    var nowDate = new Date();
    this.initCalendar(nowDate);
  },

  //初始化日历
  initCalendar: function (paramDate, signDates){
    if (!signDates){
      //根据paramDate 可以从服务器取每个月的签到日期
      signDates = [2, 3, 4, 5];
    }

    //当前年月日
    var now = new Date();//当前时间
    var nowMonth = now.getMonth();
    var nowYear = now.getFullYear();

    var showSign = false;//是否显示签到按钮
    if (nowMonth === paramDate.getMonth() 
      && nowYear === paramDate.getFullYear()){
      showSign = true;
      }
    
    //未来签到日期设置为空
    if (nowMonth < paramDate.getMonth() 
      && nowYear <= paramDate.getFullYear()){
      signDates=[];
      }

    //星期
    var days = ["日", "一", "二", "三", "四", "五", "六"];
    //签到日历
    var calendars = Calendar.getSignCalendar(paramDate, signDates);
    
    this.setData({
      signDates: signDates,
      year: paramDate.getFullYear(),
      month: paramDate.getMonth() + 1,
      calendars: calendars,
      days: days,
      preMonth: "<",   //大于、小于号不可以直接写在wxml中
      nextMonth: ">",
      showSign:showSign
    });
  },

  //上个月
  preMonth: function(){
    var dataYear = this.data.year;
    var dataMonth = this.data.month - 2;//月是从0开始的
    var paramDate = Calendar.parseDate(dataYear, dataMonth);
    this.initCalendar(paramDate);
  },

  //下个月
  nextMonth: function(){
    var dataYear = this.data.year;
    var dataMonth = this.data.month;
    var paramDate = Calendar.parseDate(dataYear, dataMonth);
    this.initCalendar(paramDate);
  },

  //签到
  doSign: function(){
    var now = new Date();//当前时间
    var date = now.getDate();
    var signDates = this.data.signDates;
    signDates.push(date);
    this.initCalendar(now, signDates);

    // todo 调用服务器端，实现签到入库
    // 可以用微信小程序的 缓存；
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
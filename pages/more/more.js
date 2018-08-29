// pages/more/more.js
const openIdUrl = require('./../../config').testpath;
var app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more_img: "",
    more_title_img:'../images/code_bg.png'
  
  },
  
   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var scene_img = openIdUrl+'bizbase/images/download_page_info.png' //这里添加图片的地址    
    that.setData({
      more_img: scene_img
    })
    console.log(scene_img + "scene_img")
  },
  previewImage: function (e) {
    wx.previewImage({
     
      urls: this.data.more_img.split(',')
    
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
    })
    
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
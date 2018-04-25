const openIdUrl = require('./../../config').testpath;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    shareData: {
      title: '国安数据微服务',
      desc: '国安数据微服务',
      path: '/pages/home/home'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.longitude + ',' + app.globalData.latitude);
    this.setData({
      url: openIdUrl+'app_webview/store_round.html?target=2&centerPosition=' + app.globalData.longitude + ',' + app.globalData.latitude
    })
  
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return this.data.shareData
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
  
  }
})
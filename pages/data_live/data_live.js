const openIdUrl = require('./../../config').testpath;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: openIdUrl + 'crm/221.html?su=984c0eca5f5e22325d1308dd9a762ed0',
    shareData: {
      title: '国安数据微服务',
      desc: '国安数据微服务',
      path: ''
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    console.log('onReady');

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow数据直播间');
    this.onLoad();



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
    // var that = this

    // //判断页面栈里面的页面数是否大于2
    // if (getCurrentPages().length > 2) {
    //   //获取页面栈
    //   let pages = getCurrentPages()
    //   //给上一个页面设置状态
    //   let curPage = pages[pages.length - 2];
    //   let data = curPage.data;
    //   curPage.setData({ 'isBack': true });
    // }


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

})
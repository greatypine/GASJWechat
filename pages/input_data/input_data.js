// pages/input_data/input_data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goal_img: "../images/icon1.png",
    more_img: "../images/icon5.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  // 跳转到消息页面
  goto_cityValue: function () {
    wx.navigateTo({
      url: '../city_value/city_value'
    })
  },
  goto_moredata:function(){
    wx.showToast({
      title: '更多填报敬请期待...',
      icon: 'none',
      duration: 2000,
      mask: true
    })
    // wx.navigateTo({
    //   url: '../input_more/input_more'
    // })
    // wx.navigateToMiniProgram({
    //   appId: 'wxb240d771bd777f14',
    //   path: 'pages/home/home',
    //   extraData: {
    //   },
    //   envVersion: 'develop',
    //   success(res) {
    //     // 打开成功
    //   }
    // })
  }
})
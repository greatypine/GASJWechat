// pages/week_data/week_data.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    network_img: "../images/icon7.png",
    store_img: "../images/icon4.png",
    bigdata_img: "../images/icon6.png",
    store_bg: "../images/store_bg.png"
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
  // 线下网络体系周报
  goto_view1: function () {
    if (app.globalData.zw_code != null && app.globalData.zw_code != '' && app.globalData.zw_code != undefined) {

      if (app.globalData.zw_code.slice(0, 2) == 'ZB' || app.globalData.zw_code.slice(0, 2) == 'CS') {
        wx.navigateTo({
          url: '../offline_network/offline_network'
        })

      } else {
        wx.showToast({
          title: '您没有此权限...',
          icon: 'none',
          duration: 2000,
          mask: true
        })

      }

    } else {
      wx.showToast({
        title: '您没有此权限...',
        icon: 'none',
        duration: 2000,
        mask: true
      })

    }
 
  },
  // 门店运营周报
  goto_view2: function () {
    wx.showToast({
      title: '正在建设敬请期待...',
      icon: 'none',
      duration: 2000,
      mask: true
    })
   
  },
  //大数据月报
  goto_view3: function () {
    wx.showToast({
      title: '正在建设敬请期待...',
      icon: 'none',
      duration: 2000,
      mask: true
    })
   
  },
  //门店租赁
  goto_view4: function () {
    if (app.globalData.zw_code != null && app.globalData.zw_code != '' && app.globalData.zw_code != undefined) {

      if (app.globalData.zw_code.slice(0, 2) == 'ZB') {
        wx.navigateTo({
          url: '../store_lease/store_lease'
        })

      } else {
        wx.showToast({
          title: '您没有此权限...',
          icon: 'none',
          duration: 2000,
          mask: true
        })

      }

    } else {
      wx.showToast({
        title: '您没有此权限...',
        icon: 'none',
        duration: 2000,
        mask: true
      })

    }

  },
})
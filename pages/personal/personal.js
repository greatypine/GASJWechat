const openIdUrl = require('./../../config').testpath;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumb: '',
    nickiphone: '',
    shareData: {
      title: '国安数据微服务',
      desc: '国安数据微服务',
      path: '/pages/home/home'
    },
    user_name: '--',
    employee_id: '--',
    zw: '--',
    inviteCode:"--"
  
  },
  copy_btn:function(){
    let that = this
    wx.setClipboardData({
      data: that.data.inviteCode,
      success() {
        // that.setData({
        //   inviteCode: that.data.inviteCode
        // })
        console.log('success')
      }
    })
    wx.getClipboardData({
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }
  ,
  exit_logon:function(){
    wx.showModal({
      title: '提示',
      content: '是否确认退出登录',
      success: function (res) {
        if (res.confirm) {
        
          app.globalData.code=null;
          app.globalData.employeeId=null;
          app.globalData.name=null;
          app.globalData.zw=null;
          app.globalData.id = null;
          app.globalData.code = null;
          app.globalData.zw_code = null;
          app.globalData.employee=null;
          app.globalData.user_id = null;
          app.globalData.employee_phone ='--';
          app.globalData.login_statu=true;
          app.globalData.showDataTV=false;
          app.globalData.showInput = false;
          app.globalData.isLogin=null;
          wx.setStorage({
            key: 'login_style',
            data: ''
          });
          wx.setStorage({
            key: 'isLogin',
            data: ''
          });
          wx.navigateBack({
            delta: 2
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return this.data.shareData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.inviteCode+"00000")
    var that=this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          thumb: res.userInfo.avatarUrl,
          nickiphone: app.globalData.iphone_num == null ? app.globalData.employee_phone : app.globalData.iphone_num
        })
      },fail:function(){
        that.setData({
          thumb: "../images/guoanmen.png",
          nickiphone: '未授权'
        })

      }
    })
    that.setData({
      employee_id: (app.globalData.employeeId == null || app.globalData.employeeId == '' || app.globalData.employeeId == undefined) ? '--' : app.globalData.employeeId,
      user_name: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == undefined) ? '--' : app.globalData.name,
      zw: (app.globalData.zw == null || app.globalData.zw == '' || app.globalData.zw == undefined) ? '--' : app.globalData.zw,
      inviteCode: (app.globalData.inviteCode == null || app.globalData.inviteCode == '' || app.globalData.inviteCode == undefined) ? '暂无数据' : app.globalData.inviteCode
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
  
  }
})
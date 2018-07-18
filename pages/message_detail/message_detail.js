const openIdUrl = require('./../../config').testpath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:"",
      content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title,
      content:options.content
    })
    this.changeNewsState(options.id);
    console.log(JSON.stringify(options));
    // wx.setNavigationBarTitle({
    //   title: data[i].title
    // })
  },
 changeNewsState: function(e){
   console.log(e+"000000")
   // 更新消息读取状态
   var param = Object();
   param.managerName = "MessageNewManager";
   param.methodName = "readMessage";
   var that = this;
   var po = Object();
   po.id = e;
   po.isRead = 1;
   param.parameters = [JSON.stringify(po)];
   var paramdata = JSON.stringify(param);
   console.log(JSON.stringify(paramdata));
   wx.request({
     url: openIdUrl + 'dispatcher.action?',
     data: "requestString=" + encodeURIComponent(paramdata),
     method: 'post',
     header: {
       'content-type': 'application/x-www-form-urlencoded' // 默认值
     },
     success: function (res) {
       console.log(JSON.stringify(res.data));
       var code = res.data.result;
       var message = res.data.message;

       //  返回200登录成功跳转页面
       if (code == true) {
         console.log("已读")
       } else {
         wx.showModal({
           title: '',
           content: message,
           showCancel: false,
           confirmText: "确定"
         })
       }

     },
     fail: function () {
       wx.showToast({
         icon: 'loading',
         title: '拼死联网中',
       })
     }
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
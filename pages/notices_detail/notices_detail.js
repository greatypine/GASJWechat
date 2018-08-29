const openIdUrl = require('./../../config').testpath;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    filePath:"",
    filePath2: "",
    filePath3: "",
    filename:"",
    filename2: "",
    filename3: "",
    showView1:false,
    showView2: false,
    showView3: false,
    showView4: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      content: options.content,
      filePath: options.filePath,
      filePath2: options.filePath2,
      filePath3: options.filePath3,
      filename: options.filename,
      filename2: options.filename2,
      filename3: options.filename3
    })
  
    if (options.filename != null && options.filename != "null"){
      
      this.setData({
        showView1:true
      })
    }
    if (options.filename2 != null && options.filename2 != "null") {
      this.setData({
        showView2: true
      })
    }
    // debugger
    if (options.filename3 != null && options.filename3 != "null") {
      this.setData({
        showView3: true
      })
    }

    if (!this.data.showView1 && !this.data.showView2 && !this.data.showView3) {
      this.setData({
        showView4: true
      })
    }
    
    console.log(this.data.showView4)
    // debugger
    this.changeNewsState(options.noticeNo)
    console.log(JSON.stringify(options));
    // wx.setNavigationBarTitle({
    //   title: data[i].title
    // })
  },
  changeNewsState: function (e) {
    console.log(e + "000000")
    // 更新公告读取状态
    var param = Object();
    param.managerName = "NoticeReciverManager";
    param.methodName = "updateNoticeReciverIsRead";
    var that = this;
    // var po = Object();
    // po.noticeNo = e;
    // var notice = Object();
    
    // notice.employeeNo = app.globalData.employeeId;
    var noticeNo=e;
    var employeeNo = app.globalData.employeeId;
    param.parameters = [noticeNo, employeeNo];
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
        // debugger
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
  downFile1: function () {
    var that=this;
    console.log(that.data.filePath);
    var urlStr = that.data.filePath;
    var suffix = urlStr.substring(urlStr.lastIndexOf(".")).toLowerCase()
    if (suffix != ".png" && suffix != ".jpeg" && suffix != ".bmp" && suffix != ".jpg" && suffix != ".gif") {
      const downloadTask = wx.downloadFile({
        url: that.data.filePath,
        success: function (res) {
          var filePath = res.tempFilePath;
          wx.openDocument({
            filePath: filePath,
            // fileType:
            success: function (res) {
              console.log('打开文档成功')
              wx.hideLoading();
            },
            fail: function (res) {
              console.log('打开文档失败')
              wx.hideLoading();
              wx.showToast({
                icon: "none",
                title: "暂不支持当前文件类型预览",
              })

            }
          })
        },
        fail: function (res) {
          wx.hideLoading();
          console.log("下载失败")
          wx.showToast({
            icon: "none",
            title: "下载失败",
          })
        }
      })
      downloadTask.onProgressUpdate((res) => {
        console.log('下载进度', res.progress)
        wx.showLoading({
          title: res.progress + '%',
        })
        if (res.progress == 100) {
          wx.hideLoading();
        }
        console.log('已经下载的数据长度', res.totalBytesWritten)
        console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      })
    // downloadTask.abort()
    }else{
      // 是图片则预览
      wx.previewImage({
        current: that.data.filePath, // 当前显示图片的http链接
        urls: [that.data.filePath]
      })
    }
   
  },
  downFile2: function () {
    var that = this;
    console.log(that.data.filePath2 +"filePath2");
    var urlStr = that.data.filePath2;
    var suffix = urlStr.substring(urlStr.lastIndexOf(".")).toLowerCase()
    if (suffix != ".png" && suffix != ".jpeg" && suffix != ".bmp" && suffix != ".jpg" && suffix != ".gif") {
      const downloadTask = wx.downloadFile({
        url: that.data.filePath2,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
              wx.hideLoading();
            },
            fail: function (res) {
              console.log('打开文档失败')
              wx.hideLoading();
              wx.showToast({
                icon: "none",
                title: "暂不支持当前文件类型预览",
              })

            }
          })
        },
        fail: function (res) {
          wx.hideLoading();
          console.log("下载失败")
          wx.showToast({
            icon: "none",
            title: "下载失败",
          })
        }
      })
      downloadTask.onProgressUpdate((res) => {
        console.log('下载进度', res.progress)
        wx.showLoading({
          title: res.progress + '%',
        })
        if (res.progress == 100) {
          wx.hideLoading();
        }
        console.log('已经下载的数据长度', res.totalBytesWritten)
        console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      })
    // downloadTask.abort()
    }else{
      // 是图片则预览
      wx.previewImage({
        current: that.data.filePath2, // 当前显示图片的http链接
        urls: [that.data.filePath2]
      })
    }
   
  },
  downFile3: function () {
    var that = this;
    console.log(that.data.filePath3 + "filePath3");
    var urlStr = that.data.filePath3;
    var suffix = urlStr.substring(urlStr.lastIndexOf(".")).toLowerCase()
    if (suffix != ".png" && suffix != ".jpeg" && suffix != ".bmp" && suffix != ".jpg" && suffix != ".gif") {
      
      const downloadTask = wx.downloadFile({
        url: that.data.filePath3,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
              wx.hideLoading();
            },
            fail: function (res) {
              wx.hideLoading();
              console.log('打开文档失败')
              wx.showToast({
                icon: "none",
                title: "暂不支持当前文件类型预览",
              })

            }
          })
        },
        fail: function (res) {
          wx.hideLoading();
          console.log("下载失败")
          wx.showToast({
            icon: "none",
            title: "下载失败",
          })
        }
      })
      downloadTask.onProgressUpdate((res) => {
        console.log('下载进度', res.progress)
        wx.showLoading({
          title: res.progress + '%',
        })
        if (res.progress == 100) {
          wx.hideLoading();
        }
        console.log('已经下载的数据长度', res.totalBytesWritten)
        console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      })
    // downloadTask.abort()
    }else{
      // 是图片则预览
      wx.previewImage({
        current: that.data.filePath3, // 当前显示图片的http链接
        urls: [that.data.filePath3]
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
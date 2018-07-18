const openIdUrl = require('./../../config').testpath;
import util from './../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareData: {
      title: '国安数据微服务',
      desc: '国安数据微服务',
      path: '/pages/home/home'
    },
    reservelist: [],
    currentPage: 1,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
    delBtnWidth: 180, //删除按钮宽度单位（rpx）
    readId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return this.data.shareData
  },

  fetchData: function () {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    var param = Object();
    param.managerName = "NoticeReciverManager";
    param.methodName = "selectNoticeReciver";
    var message = Object();
    message.employeeNo = app.globalData.employeeId;
    console.log('----' + message.employeeNo);
    var pageInfo = Object();
    // pageInfo.currentPage = 0;
    pageInfo.recordsPerPage = 10;
    pageInfo.totalRecords = 0;
    pageInfo.tooManySearchReturn = false;
    pageInfo.currentPage = that.data.currentPage;
    var m = JSON.stringify(message);
    var p = JSON.stringify(pageInfo);
    param.parameters = [m, p];
    var paramdata = JSON.stringify(param);

    function timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      console.log(Y + M + D + h + m + s);
      return Y + M + D;
    }
    wx.request({
      url: openIdUrl + 'dispatcher.action?',
      data: "requestString=" + encodeURIComponent(paramdata),
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var jsonData = JSON.parse(res.data.data);
        var code = jsonData.code;
        var message = jsonData.message;
        var data = jsonData.data;
        console.log(JSON.stringify(data)+"公告");
        const newlist = [];
        //返回200登录成功跳转页面
        if (code == 200) {
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              newlist.push({
                "id": data[i].id,
                "title": data[i].title,
                "time": timestampToTime(data[i].create_time),
                "content": data[i].content,
                "imgurl": "../images/notice.png",
                "isRead": data[i].isRead,
                "noticeNo": data[i].noticeNo,
                "fileName": data[i].fileName,
                "fileName2": data[i].fileName2,
                "fileName3": data[i].fileName3,
                "filePath": data[i].filePath,
                "filePath2": data[i].filePath2,
                "filePath3": data[i].filePath3,
                
              })
            }
            if (data.length < 10) {
              that.setData({
                searchLoadingComplete: true,   //把"上拉加载"的变量设为false，显示               
                searchLoading: false
              })
            }
            that.setData({
              reservelist: that.data.reservelist.concat(newlist),
            })
          } else {
            that.setData({
              searchLoadingComplete: true, //把“没有数据”设为true，显示  
              searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
            });
          }

        } else {
          wx.showModal({
            title: '',
            content: message,
            showCancel: false,
            confirmText: "确定"
          })

        }

      }
    })
  },
  //滚动到底部触发事件  
  searchScrollLower: function () {
    let that = this;
    that.setData({
      currentPage: that.data.currentPage + 1,  //每次触发上拉事件，把searchPageNum+1    
    });
    console.log(1111111111222222);
    that.fetchData();
  },
  onPullDownRefresh: function () { //下拉刷新
    this.setData({
      currentPage: 1,
      searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
      searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏 
      reservelist: []
    })
    this.fetchData();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  onReachBottom: function () {
    console.log(this.data.searchLoading);
    var that = this
    
    setTimeout(function () {
      that.setData({
        currentPage: that.data.currentPage + 1,
        searchLoading: true
      })
      that.fetchData();
    }, 1000)

  },
  
  scrollLoading: function () { //滚动加载
    this.setData({
      currentPage: this.data.currentPage + 1,
      searchLoading: true
    })
    console.log(3434343434);
    this.fetchData();
  },
  // 跳转详细页
  openpage: function (e) {
    var title = e.currentTarget.dataset.title;
    var content = e.currentTarget.dataset.content;
    var isRead = e.currentTarget.dataset.isread;
    var id = e.currentTarget.id;
    var noticeNo = e.currentTarget.dataset.noticeno;
    var filename = e.currentTarget.dataset.filename;
    var filename2 = e.currentTarget.dataset.twofilename;
    var filename3 = e.currentTarget.dataset.threefilename;
    var filePath = e.currentTarget.dataset.filepath;
    var filePath2 = e.currentTarget.dataset.twofilepath;
    var filePath3 = e.currentTarget.dataset.threefilepath;
    console.log(JSON.stringify(e) + "ddddddd")
    var id = e.currentTarget.id;
    var dataList = this.data.reservelist;
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].id == id && dataList[i].isRead == 0) {
        dataList[i].isRead = 1;
        this.setData({
          readId: e.currentTarget.id,
          reservelist: dataList
        })
        break;
      }
    }
    // debugger
    wx.navigateTo({
      url: '../notices_detail/notices_detail?title=' + title + '&content=' + content + '&noticeNo=' + noticeNo + '&filename=' + filename + '&filename2=' + filename2 + '&filename3=' + filename3 + '&filePath=' + filePath + '&filePath2=' + filePath2 + '&filePath3=' + filePath3,
    })
  },

})

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
    // height: 0,
    swipeCheckX: 35, //激活检测滑动的阈值
    swipeCheckState: 0, //0未激活 1激活
    maxMoveLeft: 185, //消息列表项最大左滑距离
    correctMoveLeft: 175, //显示菜单时的左滑距离
    thresholdMoveLeft: 75,//左滑阈值，超过则显示菜单
    lastShowMsgId: '', //记录上次显示菜单的消息id
    moveX: 0,  //记录平移距离
    showState: 0, //0 未显示菜单 1显示菜单
    touchStartState: 0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
    swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动
    scrollY: true,//滚动位置
    readId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      // this.fetchData();
    
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
    param.managerName = "MessageNewManager";
    param.methodName = "queryMessageOfHistory";
    var message = Object();
    message.receiveId = app.globalData.employeeId;
    console.log('----' + message.receiveId);
    message.isRead = 2;
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
    // this.pixelRatio = app.data.deviceInfo.pixelRatio;
    // var windowHeight = app.data.deviceInfo.windowHeight;
    // var height = windowHeight;
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
        console.log(JSON.stringify(data));
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
                "imgurl": "../images/news.png",
                "isRead": data[i].isRead,
              })

            }
    // debugger
            if (data.length < 10) {
              that.setData({
                searchLoadingComplete: true,   //把"上拉加载"的变量设为false，显示               
                searchLoading: false
              })
            }
            that.setData({
              reservelist: that.data.reservelist.concat(newlist)
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
    // if (!that.data.searchLoadingComplete) {
    this.setData({
      currentPage: that.data.currentPage + 1,  //每次触发上拉事件，把searchPageNum+1    
    });
    console.log(1111111111222222);
    this.fetchData();
    // }
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
    console.log("222222");
    var that = this
    // if (that.data.searchLoading && !that.data.searchLoadingComplete) {  
    setTimeout(function () {
      that.setData({
        currentPage: that.data.currentPage + 1,
        searchLoading: true
      })
      that.fetchData();
    }, 1000)
    // }

  },
  scrollLoading: function () { //滚动加载
    this.setData({
      currentPage: this.data.currentPage + 1,
      searchLoading: true
    })
    console.log(3434343434);
    this.fetchData();
  },

  // ---------------------
  ontouchstart: function (e) {
    var that = this.data;
    if (that.showState === 1) {
      that.touchStartState = 1;
      that.showState = 0;
      that.moveX = 0;
      this.translateXMsgItem(that.lastShowMsgId, 0, 200);
      that.lastShowMsgId = "";
      return;
    }
    that.firstTouchX = e.touches[0].clientX;
    that.firstTouchY = e.touches[0].clientY;
    if (that.firstTouchX > that.swipeCheckX) {
      that.swipeCheckState = 1;
    }
    that.lastMoveTime = e.timeStamp;
  },

  ontouchmove: function (e) {
    var that = this.data;
    if (that.swipeCheckState === 0) {
      return;
    }
    //当开始触摸时有菜单显示时，不处理滑动操作
    if (that.touchStartState === 1) {
      return;
    }
    var moveX = e.touches[0].clientX - that.firstTouchX;
    var moveY = e.touches[0].clientY - that.firstTouchY;
    //已触发垂直滑动，由scroll-view处理滑动操作
    if (that.swipeDirection === 2) {
      return;
    }
    //未触发滑动方向
    if (that.swipeDirection === 0) {
      console.log(Math.abs(moveY));
      //触发垂直操作
      if (Math.abs(moveY) > 4) {
        that.swipeDirection = 2;

        return;
      }
      //触发水平操作
      if (Math.abs(moveX) > 4) {
        that.swipeDirection = 1;
        this.setData({ scrollY: false });
      }
      else {
        return;
      }

    }
    //禁用垂直滚动
    // if (this.data.scrollY) {
    //   this.setData({scrollY:false});
    // }

    that.lastMoveTime = e.timeStamp;
    //处理边界情况
    if (moveX > 0) {
      moveX = 0;
    }
    //检测最大左滑距离
    if (moveX < -that.maxMoveLeft) {
      moveX = -that.maxMoveLeft;
    }
    that.moveX = moveX;
    console.log(e.currentTarget.id + "ss");
    this.translateXMsgItem(e.currentTarget.id, moveX, 0);
  },
  ontouchend: function (e) {
    var that = this.data;
    that.swipeCheckState = 0;
    var swipeDirection = that.swipeDirection;
    that.swipeDirection = 0;
    if (that.touchStartState === 1) {
      that.touchStartState = 0;
      this.setData({ scrollY: true });
      return;
    }
    //垂直滚动，忽略
    if (swipeDirection !== 1) {
      return;
    }
    if (that.moveX === 0) {
      that.showState = 0;
      //不显示菜单状态下,激活垂直滚动
      this.setData({ scrollY: true });
      return;
    }
    if (that.moveX === that.correctMoveLeft) {
      that.showState = 1;
      console.log(e.currentTarget.id + "end");
      that.lastShowMsgId = e.currentTarget.id;
      return;
    }
    if (that.moveX < -that.thresholdMoveLeft) {
      that.moveX = -that.correctMoveLeft;
      that.showState = 1;
      that.lastShowMsgId = e.currentTarget.id;
    }
    else {
      that.moveX = 0;
      that.showState = 0;
      //不显示菜单,激活垂直滚动
      this.setData({ scrollY: true });
    }
    this.translateXMsgItem(e.currentTarget.id, that.moveX, 500);
    //this.translateXMsgItem(e.currentTarget.id, 0, 0);
  },
  onDeleteMsgTap: function (e) {
    this.deleteMsgItem(e);
  },
  onDeleteMsgLongtap: function (e) {
    console.log(e);
  },
  onMarkMsgTap: function (e) {
    console.log(e);
  },
  onMarkMsgLongtap: function (e) {
    console.log(e);
  },
  getItemIndex: function (id) {
    var msgList = this.data.reservelist;
    for (var i = 0; i < msgList.length; i++) {

      if (msgList[i].id.toString() === id) {
        return i;
      }
    }
    return -1;
  },
  deleteMsgItem: function (e) {
    var animation = wx.createAnimation({ duration: 200 });
    animation.height(0).opacity(0).step();
    this.animationMsgWrapItem(e.currentTarget.id, animation);
    var s = this;
    setTimeout(function () {
      var index = s.getItemIndex(e.currentTarget.id);
      s.data.reservelist.splice(index, 1);
      s.deleteMeaage(e);
      s.setData({ reservelist: s.data.reservelist });
    }, 200);
    this.showState = 0;
    this.setData({ scrollY: true });
  },
  translateXMsgItem: function (id, x, duration) {
    var animation = wx.createAnimation({ duration: duration });
    animation.translateX(x).step();
    this.animationMsgItem(id, animation);
  },
  animationMsgItem: function (id, animation) {
    var index = this.getItemIndex(id);
    console.log(index + "333333333");
    var param = {};
    var indexString = 'reservelist[' + index + '].animation';
    param[indexString] = animation.export();
    this.setData(param);
  },
  animationMsgWrapItem: function (id, animation) {
    var index = this.getItemIndex(id);
    var param = {};
    var indexString = 'reservelist[' + index + '].wrapAnimation';
    param[indexString] = animation.export();
    this.setData(param);
  },
  openpage: function (e) {
    var title = e.currentTarget.dataset.title;
    var content = e.currentTarget.dataset.content;
    var isRead = e.currentTarget.dataset.isread;
    var id = e.currentTarget.id;
    console.log(JSON.stringify(e)+"ddddddd")
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
    wx.navigateTo({
      url: '../message_detail/message_detail?title=' + title + '&content=' + content + '&id=' + e.currentTarget.id,
    })
  },
  // -------------侧滑删除消息接口
  deleteMeaage: function (e) {
    var param = Object();
    param.managerName = "MessageNewManager";
    param.methodName = "delateMessage";
    var that = this;
    var po = Object();
    po.id = e.currentTarget.id;
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
          wx.showModal({
            title: '',
            content: '删除成功',
            showCancel: false,
            confirmText: "确定"
          })

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
  }

})

const openIdUrl = require('./../../config').testpath;
var common = require('./../../utils/conversion_utils.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeArray:["上周","本周","下周"],
    cityArray:[],
    cityListArray:[],
    time_index: 0,
    city_index:0,
    startTime:common.getLastWeekStartDate(),
    endTime:common.getLastWeekEndDate(),
    checkNum:"",
    finishNum:"",
    passNum:"",
    cooperateNum:"",
    selfNum:"",
    cityNo:"",
    // 时间区间组合字符串
    statistical_time_period: common.getLastWeekStartDate() + "~" + common.getLastWeekEndDate(),
    cityname:"",
    preposition_task:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getCitylist();
   console.log(this.data.statistical_time_period + "111111111111");
  },
  bindTimeChange: function (e) {
    console.log('时间发送选择改变，携带值为', e.detail.value)
    this.setData({
      time_index: e.detail.value
    })
    if (e.detail.value==0){
// 上周
     this.setData({
       startTime: common.getLastWeekStartDate(),
       endTime: common.getLastWeekEndDate()
     })
    
    } else if (e.detail.value == 1){
// 本周
      this.setData({
        startTime: common.getWeekStartDate(),
        endTime: common.getWeekEndDate()
      })
    } else if (e.detail.value == 2){
// 下周
      this.setData({
        startTime: common.getNextWeekStartDate(),
        endTime: common.getNextWeekEndDate()
      })
    }
    this.setData({
      statistical_time_period: this.data.startTime + "~" + this.data.endTime
    })
    console.log(this.data.statistical_time_period+"212dccdcdcd");
  },
  bindCityChange: function (e) {
    console.log('城市发送选择改变，携带值为', this.data.cityListArray[e.detail.value].cityno)
    this.setData({
      city_index: e.detail.value,
      cityNo: this.data.cityListArray[e.detail.value].cityno,
      cityname: this.data.cityListArray[e.detail.value].cityname
    })
  },
  //获取勘察数量
  getCheckNum: function (e) {
    this.setData({
      checkNum: e.detail.value
    })
  },
  //获取签约数量
  getFinishNum: function (e) {
    this.setData({
      finishNum: e.detail.value
    })
  },
  // 获取会议通过数量
  getPassNum: function (e) {
    this.setData({
      passNum: e.detail.value
    })
  },
  // 获取2018合作店任务目标数量
  getCooperateNum: function(e) {
    this.setData({
      cooperateNum: e.detail.value
    })
  },
  // 获取2018自营店任务目标数量
  getSelfNum: function (e) {
    this.setData({
      selfNum: e.detail.value
    })
  },
  // 获取2018前置仓任务目标
  getPreposition_task:function(e){
    this.setData({
      preposition_task: e.detail.value
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
  
  },

  // 获取城市列表
 getCitylist:function(){
   var param = Object();
   param.managerName = "InterManager";
   param.methodName = "getCurrentUserCity";
   var that = this;
  //  var user=Object();
   var userId = app.globalData.id;
   param.parameters = [JSON.stringify(userId)];
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
      //  debugger
       var jsonData = JSON.parse(res.data.data);
       console.log(JSON.stringify(jsonData))
       var code = res.data.result
       var message = res.data.message;
       const citylist = [];
       const cityListArray = [];
      //  返回200登录成功跳转页面
       if (code == true) {
          for(var i=0;i<jsonData.data.length;i++){
            
            cityListArray.push({
              "cityno": jsonData.data[i].cityno,
              "cityname": jsonData.data[i].cityname
            })
            
            citylist.push(jsonData.data[i].cityname)
          }
          that.setData({
            cityArray: citylist,
            cityListArray: cityListArray,
            cityNo: jsonData.data[0].cityno,
            cityname: jsonData.data[0].cityname
            
          })
          console.log(JSON.stringify(jsonData.data[0].cityno)+"121243431");
         
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
//  提交填写目标值接口
 doSave: function () {
   if (this.data.checkNum == null || this.data.checkNum == '' || this.data.checkNum.replace(/(^\s*)|(\s*$)/g, "").length==0) {
     wx.showModal({
       title: '提示',
       content: '勘察商铺数量不能为空',
       showCancel: false,
       success: function (res) {
         if (res.confirm) {


         }
       }
     })
     return;
   }
   if (this.data.finishNum == null || this.data.finishNum == '' || this.data.finishNum.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
     wx.showModal({
       title: '提示',
       content: '完成签约数量不能为空',
       showCancel: false,
       success: function (res) {
         if (res.confirm) {
           console.log(res.confirm);

         }
       }
     })
     return;
   }
   if (this.data.passNum == null || this.data.passNum == '' || this.data.passNum.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
     wx.showModal({
       title: '提示',
       content: '总部上会通过数量不能为空',
       showCancel: false,
       success: function (res) {
         if (res.confirm) {
           console.log(res.confirm);

         }
       }
     })
     return;
   }
  //  if (this.data.selfNum == null || this.data.selfNum == '' || this.data.selfNum.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
  //    wx.showModal({
  //      title: '提示',
  //      content: '合作店任务目标数量不能为空',
  //      showCancel: false,
  //      success: function (res) {
  //        if (res.confirm) {
  //          console.log(res.confirm);

  //        }
  //      }
  //    })
  //    return;
  //  }
  //  if (this.data.finishNum == null || this.data.finishNum == '' || this.data.finishNum.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
  //    wx.showModal({
  //      title: '提示',
  //      content: '自营店任务目标数量不能为空',
  //      showCancel: false,
  //      success: function (res) {
  //        if (res.confirm) {
  //          console.log(res.confirm);

  //        }
  //      }
  //    })
  //    return;
  //  }

   var param = Object();
   param.managerName = "InterManager";
   param.methodName = "saveOrUpdateOfficeNetwork";
   var po = Object();
   po.statistical_time_period = this.data.statistical_time_period;
;
po.survey_quantity = this.data.checkNum;
   po.contract_quantity = this.data.finishNum;
   po.through_quantity = this.data.passNum;
  //  po.self_support_task = this.data.selfNum;
  //  po.cooperative_task = this.data.cooperateNum;
   po.cityname = this.data.cityname;
   po.start_time = this.data.startTime;
   po.end_time = this.data.endTime;
   po.cityno = this.data.cityNo;
  //  po.preposition_task = this.data.preposition_task;
   param.parameters = [JSON.stringify(po)];
   var paramdata = JSON.stringify(param);
   console.log(paramdata+"9090909090")

   var that = this;
   wx.request({
     url: openIdUrl + 'dispatcher.action?',
     data: "requestString=" + encodeURIComponent(paramdata),
     method: 'post',
     header: {
       'content-type': 'application/x-www-form-urlencoded' // 默认值
     },
     success: function (res) {
       console.log(JSON.stringify(res.data)+"09090909");
       var jsonData = JSON.parse(res.data.data);
       var code = jsonData.code
       var message = jsonData.message;

       //返回200登录成功跳转页面
       if (code == 200) {
         wx.showModal({
           title: '',
           content: message,
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
 },
})
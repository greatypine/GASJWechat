var WXBizDataCrypt = require('utils/RdWXBizDataCrypt.js');
var AppId = "wxcdd8ef7d3ae06c50";
// var AppSecret = "933f595576275a25a51448955ae56c1a";
//app.js
const openIdUrl = require('./config').testpath
App({
  data:{
    deviceInfo: {}
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 获取屏幕大小
    this.data.deviceInfo = wx.getSystemInfoSync();
    wx.getStorage({
      key: 'login_style',
      success: function (res) {
        
        if (res.data =='account_login'){
        
          that.globalData.login_statu = false;
          // that.globalData.code = '200';
          wx.getStorage({
            key: 'employee',
            success: function(res) {
              
              that.globalData.employeeId = res.data.user.employeeId;
              that.globalData.password = res.data.user.password;
              that.globalData.id = res.data.user.id;
              that.globalData.code = res.data.code;
              that.globalData.zw_code = res.data.user.usergroup.code;
              that.globalData.employee = res.data.user;
              that.globalData.name = res.data.user.name;
              that.globalData.zw = res.data.user.zw;
              that.globalData.employee_phone = (res.data.user.mobilephone == null || res.data.user.mobilephone == '' || res.data.user.mobilephone == undefined) ? '--' : res.data.user.mobilephone;
            },
          })
       


        } else if (res.data == 'wx_login'){
        
          that.globalData.login_statu = false;
          wx.getStorage({
            key: 'employee',
            success: function (res) {

              that.globalData.code = res.data.code;
              that.globalData.employeeId = res.data.data.employeeId;
              that.globalData.name = res.data.data.name;
              that.globalData.zw_code = res.data.data.usergroupname;
              that.globalData.zw = res.data.data.zw;
              that.globalData.employee_phone = (res.data.data.mobilephone == null || res.data.data.mobilephone == '' || res.data.data.mobilephone == undefined) ? '--' : res.data.data.mobilephone;
            },
          })
        

        }else{
        
          // 小程序初始化
          wx.login({
            success: res => {
              console.log('res.code==:', res.code)
              var param = Object();
              param.managerName = "InterManager";
              param.methodName = "requestWxApi";


              param.parameters = [res.code];
              var paramdata = JSON.stringify(param);
              console.log(paramdata);
              
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
             
              wx.request({
                url: openIdUrl + 'dispatcher.action?',
                data: "requestString=" + encodeURIComponent(paramdata),
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (res) {
                  var jsonData = JSON.parse(JSON.parse(res.data.data).toString());
                  console.log(jsonData.session_key + "getkey");
                  var pc = new WXBizDataCrypt(AppId, jsonData.session_key)
                  that.globalData.sessionkey = jsonData.session_key;
                  that.globalData.openId = jsonData.openid;
                  console.log('解密后openId: ', jsonData.openid);

                  // wx.getUserInfo({
                  //   success: function (res) {

                  //     var data = pc.decryptData(res.encryptedData, res.iv)
                  //     that.globalData.openId = data.openId;
                  //     console.log('解密后openId: ', data.openId)
                  //   }
                  // })
                },
                fail: function (res) {
                  wx.showToast({
                    icon: 'loading',
                    title: '拼死联网中',
                  })

                },
                complete: function (res) {

                }
              });
            }
          })

        }
        
      },fail:function(){
        
      
        // 小程序初始化
        wx.login({
          success: res => {
            console.log('res.code==:', res.code)
            var param = Object();
            param.managerName = "InterManager";
            param.methodName = "requestWxApi";


            param.parameters = [res.code];
            var paramdata = JSON.stringify(param);
            console.log(paramdata);
           
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            
            wx.request({
              url: openIdUrl + 'dispatcher.action?',
              data: "requestString=" + encodeURIComponent(paramdata),
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (res) {
                var jsonData = JSON.parse(JSON.parse(res.data.data).toString());             
                console.log(JSON.stringify(res.data)+"11111");
                var pc = new WXBizDataCrypt(AppId, jsonData.session_key);
                that.globalData.pc = pc;
                that.globalData.sessionkey = jsonData.session_key;
                that.globalData.openId = jsonData.openid;
                wx.setStorage({
                  key: 'session_key',
                  data: jsonData.session_key
                });
                wx.setStorage({
                  key: 'openid',
                  data: jsonData.openid
                });
              
                console.log('解密后openId: ', jsonData.openid);

                // wx.getUserInfo({
                //   success: function (res) {

                //     var data = pc.decryptData(res.encryptedData, res.iv)
                //     that.globalData.openId = data.openId;
                //     console.log('解密后openId: ', data.openId)
                //   }
                // })
              },
              fail: function (res) {
                wx.showToast({
                  icon: 'loading',
                  title: '拼死联网中',
                })

              },
              complete: function (res) {

              }
            });
          }
        })
        
      }
    });

  

   
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
        
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo;
    //           this.globalData.nick_name = res.userInfo.nickName;
      
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // }),
      // 获取经纬度
      
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          that.globalData.latitude = latitude;
          that.globalData.longitude = longitude;

        }
      }),
      wx.checkSession({
        success: function () {
          //session_key 未过期，并且在本生命周期一直有效
          // console.log("登录未过期");
        },
        fail: function () {
          // session_key 已经失效，需要重新执行登录流程
          // wx.login() //重新登录
          // console.log("登录已经过期");


        }
      }),
      wx.onNetworkStatusChange(function (res) {
        console.log(res.isConnected)
        console.log(res.networkType)
        if (res.networkType == "none" && res.isConnected == false) {
          wx.showModal({
            title: '提示',
            content: '当前网络异常，请检查网络',
            showCancel: false
          })
        }
      })
  },
  globalData: {
    userInfo: null,
    sessionkey: null,
    employeeId: null,
    password: null,
    id: null,
    code: null,
    zw_code:null,
    login_statu:true,
    employee:null,
    iphone_num:null,
    openId:null,
    latitude:null,
    longitude:null,
    zw:null,
    user_id:null,
    name:null,
    employee_phone:'--',
    nick_name:'',
    showDataTV:false,
    showInput:false,
    inviteCode:null,
    isLogin:null
   
  }


})
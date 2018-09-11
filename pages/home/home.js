var WXBizDataCrypt = require('./../../utils/RdWXBizDataCrypt.js');
const openIdUrl = require('./../../config').testpath;
const app = getApp();
var AppId = "wxcdd8ef7d3ae06c50";
Page({
  data: {
    count: 60,
    thumb: '',
    nickname: '',
    getValidCode: "getValidCode",
    color: "white",
    backgroundcolor: "#595959",
    src_user: "../images/app_img3.png",
    src_message: "../images/message_img.png",
    src_input:"../images/input_bg.png",
    src_store: "../images/store_img.png",
    src_men: "../images/men_img.png",
    src_thing: "../images/tv_img.png",
    src_tv: "../images/thing_img.png",
    weekdata: "../images/weekdata_img.png",
    moreData: "../images/icon2.png",
    notice: "../images/icon3.png",
    service_img: "../images/icon_bg.png",
    src_hzs:"../images/hzs.jpeg",
    src_zbj:"../images/221bg.jpg",
    showModalStatus: app.globalData.login_statu,
    showLoginView: false,
    showWxView: false,
    showInput: app.globalData.showInput,
    showDataTV: app.globalData.showDataTV,
    showDataTV_1: app.globalData.showDataTV_1,
    phoneNo: "",
    ValidCode: "",
    userName: '',
    userPwd: '',
    user_name: '--',
    employee_id: '--',
    zw: '--',
    wx_employeeId: "--",
    wx_username: "--",
    wx_zw: "--",
    user_id: '',
    unNoticeCount:"0",
    unMessageCount:"",
    shareData: {
      title: '国安数据微服务',
      desc: '国安数据微服务',
      path: '/pages/home/home'
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return this.data.shareData
  },
  // 跳转到运营周报页面
  goto_monthdata: function () {
    // wx.showToast({
    //   title: '正在建设敬请期待...',
    //   icon: 'none',
    //   duration: 2000,
    //   mask: true
    // })
    wx.navigateTo({
      url: '../week_data/week_data'
    })
  },
  // 跳转到个人中心页面
  goto_personal: function () {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  // 跳转到消息页面
  goto_message: function () {
    wx.navigateTo({
      url: '../user_message/user_message'
    })
  },
  // 跳转到录入页面
  goto_input: function () {
    // wx.showToast({
    //   title: '正在建设敬请期待...',
    //   icon: 'none',
    //   duration: 2000,
    //   mask: true
    // })
    wx.navigateTo({
      url: '../input_data/input_data'
    })
  },
  // 跳转到附近门店页面
  goto_store: function () {
    wx.navigateTo({
      url: '../nearby_store/nearby_store'
    })
  },
  // 跳转到附近国安侠页面
  goto_men: function () {
    wx.navigateTo({
      url: '../nearby_men/nearby_men'
    })
  },
  // 跳转到社区服务
  goto_shequ: function () {
    wx.navigateTo({
      url: '../community_service/community_service'
    })
  },
  // 跳转到待处理事项页面
  goto_thing: function () {
    wx.navigateTo({
      url: '../wait_thing/wait_thing'
    })
  },
  // 跳转到待处理事项页面
  goto_notices: function () {
    wx.navigateTo({
      url: '../notices/notices'
    })
  },
  // 跳转到更多服务页面
  goto_more: function () {
    wx.navigateTo({
      url: '../more/more'
    })
  },
  // 跳转到数据直播间
  goto_tvlive: function () {
    if (app.globalData.zw_code != null && app.globalData.zw_code != '' && app.globalData.zw_code != undefined) {

      if (app.globalData.zw_code.slice(0, 2) == 'ZB') {
        wx.navigateTo({
          url: '../data_live/data_live'
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
  // 跳转到安心合作社
  goto_cooperative:function(){
    // wx.showToast({
    //   title: '敬请期待...',
    //   icon: 'none',
    //   duration: 2000,
    //   mask: true
    // })
    if (app.globalData.zw_code != null && app.globalData.zw_code != '' && app.globalData.zw_code != undefined) {

      if (app.globalData.zw_code.slice(0, 2) == 'ZB' || app.globalData.zw_code.slice(0, 2) == 'CS') {
        wx.navigateTo({
          url: '../cooperative/cooperative'
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
  // 跳转到数据走势图
  goto_dataK: function () {
    if (app.globalData.zw_code != null && app.globalData.zw_code != '' && app.globalData.zw_code != undefined) {

      if (app.globalData.zw_code.slice(0, 2) == 'ZB') {
        wx.navigateTo({
          url: '../data_K/data_K'
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
  // 跳转到数据大屏页面
  goto_tvdata: function () {
    if (app.globalData.zw_code != null && app.globalData.zw_code != '' && app.globalData.zw_code != undefined) {

      if (app.globalData.zw_code.slice(0, 2) == 'ZB' || app.globalData.zw_code.slice(0, 2) == 'CS') {
        wx.navigateTo({
          url: '../tv_data/tv_data'
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

  // 判断是否弹出登录框
  goto_login: function () {
    if (app.globalData.code == null) {
      this.setData({
        showModalStatus: true
      })
    } else {
      wx.navigateTo({
        url: '../personal/personal'
      }) 

    }


  },

  onLoad() {
    // this.getuser();
 
  },
  onShow: function (options) {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      console.log('新的版本下载失败');
    })
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
            var pc = new WXBizDataCrypt(AppId, jsonData.session_key);
          
            app.globalData.sessionkey = jsonData.session_key;
            app.globalData.openId = jsonData.openid;
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
    });


    var that = this
  
    if (app.globalData.zw_code != null && app.globalData.zw_code != '' && app.globalData.zw_code != undefined) {
      if (app.globalData.zw_code.slice(0, 2) == 'ZB') {
        app.globalData.showDataTV = true;
        app.globalData.showDataTV_1 = true;

        that.setData({
          showDataTV: true,
          showDataTV_1: true
        })
      }
      if (app.globalData.zw_code.slice(0, 2) == 'CS') {
        app.globalData.showInput = true;
        app.globalData.showDataTV_1 = true;

        that.setData({
          showInput: true,
          showDataTV_1: true
        })
      }
    }
    // 授权获取用户基本信息
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == undefined) ? res.userInfo.nickName : app.globalData.name
          
        })
        app.globalData.nick_name = res.userInfo.nickName;

      },fail: function () {
       that.setData({ 
          thumb: "../images/guoanmen.png",
          nickname: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == undefined) ? '游客' : app.globalData.name
        })

      }
      
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        app.globalData.latitude = latitude;
        app.globalData.longitude = longitude;

      }
    })

    wx.getStorage({
      key: 'userName',
      success: function (res) {
        that.setData({ userName: res.data });
      }
    });
  
    
    that.setData({
      showModalStatus: app.globalData.login_statu,
      nickname: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == undefined) ? app.globalData.nick_name : app.globalData.name,
      showDataTV: app.globalData.showDataTV,
      showDataTV_1: app.globalData.showDataTV_1,
      showInput: app.globalData.showInput
    })




    wx.getStorage({
      key: 'userPassword',
      success: function (res) {

        that.setData({ userPwd: res.data });
      }
    });
    wx.getStorage({
      key: 'session_key',
      success: function (res) {
        app.globalData.sessionkey=res.data;
        
      }
    });
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        app.globalData.openId = res.data;

      }
    });
    wx.getStorage({
      key: 'isLogin',
      success: function (res) {
        app.globalData.isLogin = res.data;

      }
    });
    if (app.globalData.employeeId!=null){
      console.log(app.globalData.employeeId +"onshow员工号不为空");
     that.getNoticeCount();
     that.getMessageCount();
   }else{
      console.log(app.globalData.employeeId + "onshow员工号为空");
     that.setData({
       unNoticeCount: "0",
       unMessageCount: "",
     })
   }
    

  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            showLoginView: false,
            showWxView: false

          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  //  微信授权获取手机号
  getPhoneNumber: function (e) {
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
     
     
      // 解密手机号
      if (e.detail.encryptedData != null && e.detail.iv != null && app.globalData.sessionkey != null){
     
        var pc = new WXBizDataCrypt(AppId, app.globalData.sessionkey);
        var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
        app.globalData.iphone_num = data.phoneNumber;
        
        this.setData({
          phoneNo: data.phoneNumber
        })
       
      }else{
        wx.showToast({
          icon: 'loading',
          title: '拼死联网中',
        })
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
                var pc = new WXBizDataCrypt(AppId, jsonData.session_key);
                
                app.globalData.sessionkey = jsonData.session_key;
                app.globalData.openId = jsonData.openid;
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
        return;

      }
    
     

      // 验证手机号是否绑定国安数据账号
      var param = Object();
      param.managerName = "InterManager";
      param.methodName = "wxAuthUser";
      var po = Object();
      po.mobilephone = this.data.phoneNo;
      po.wx_code = app.globalData.openId;
      param.parameters = [JSON.stringify(po)];
      var paramdata = JSON.stringify(param);
     

      var that = this;
      wx.request({
        url: openIdUrl + 'dispatcher.action?',
        data: "requestString=" + encodeURIComponent(paramdata),
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          var jsonData = JSON.parse(res.data.data);
          console.log("已经绑定直接登录"+JSON.stringify(jsonData));
          var code = jsonData.code
          var message = jsonData.message;
         


          if (code == 200) {

            wx.showToast({
              title: '登录成功',
            })
            wx.setStorage({
              key: 'employee',
              data: jsonData
            });
            wx.setStorage({
              key: 'isLogin',
              data: 'isLogin'
            });
            app.globalData.employee = jsonData.data;
            app.globalData.code = code;
            app.globalData.employeeId = jsonData.data.employeeId;
            app.globalData.name = jsonData.data.name;
            app.globalData.zw_code = jsonData.data.usergroupname;
            app.globalData.zw = jsonData.data.zw;
            app.globalData.login_statu = false;
            app.globalData.inviteCode = jsonData.data.inviteCode;
            wx.setStorage({
              key: 'inviteCode',
              data: jsonData.data.inviteCode,
            })
            app.globalData.isLogin="islogin";
            app.globalData.employee_phone = (jsonData.data.mobilephone == null || jsonData.data.mobilephone == '' || jsonData.data.mobilephone == undefined) ? '--' : jsonData.data.mobilephone;

            if (app.globalData.employeeId != null) {
              console.log(app.globalData.employeeId + "微信登录员工号不为空");
              that.getNoticeCount();
              that.getMessageCount();
            } else {
              console.log(app.globalData.employeeId + "微信登录员工号为空");
              that.setData({
                unNoticeCount: "0",
                unMessageCount: "",
              })
            }



            if (jsonData.data.usergroupname != null && jsonData.data.usergroupname != '' && jsonData.data.usergroupname != undefined) {
              if (jsonData.data.usergroupname.slice(0, 2) == 'ZB') {
                app.globalData.showDataTV=true;
                app.globalData.showDataTV_1 = true;

                that.setData({
                  showDataTV: true,
                  showDataTV_1: true
                })
              }
              if (jsonData.data.usergroupname.slice(0, 2) == 'CS') {
                app.globalData.showInput = true;
                app.globalData.showDataTV_1 = true;

                that.setData({
                  showInput: true,
                  showDataTV_1: true
                })
              }
            }

            that.setData({
              // showWxView: false,
              showModalStatus: false,
              nickname: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == undefined) ? this.data.nickname : app.globalData.name
              // showLoginView: false,
              // employee_id: (app.globalData.employeeId == null || app.globalData.employeeId == '' || app.globalData.employeeId == undefined) ? '--' : app.globalData.employeeId,
              // user_name: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == undefined) ? '--' : app.globalData.name,
              // zw: (app.globalData.zw == null || app.globalData.zw == '' || app.globalData.zw == undefined) ? '--' : app.globalData.zw
            })
            wx.setStorage({
              key: 'login_style',
              data: 'wx_login'
            });


          } else if (code == 1000004) {
            wx.showModal({
              title: '',
              content: message,
              showCancel: false,
              confirmText: "确定"
            })
            that.setData({
              showWxView: false,
              showModalStatus: true
            })


          } else if (code == 1000005) {
            var name = jsonData.data.name;
            var employeeId = jsonData.data.employeeId;
            var zw = jsonData.data.zw;
            var wx_id = jsonData.data.zw;

            that.setData({

              wx_username: (name == null || name == '' || name == undefined) ? '--' : name,
              wx_employeeId: (employeeId == null || employeeId == '' || employeeId == undefined) ? '--' : employeeId,
              wx_zw: (zw == null || zw == '' || zw == undefined) ? '--' : zw,
              showModalStatus: false,
              showWxView: true,
              user_id: jsonData.data.id
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
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  // 跳转到账号登录页面
  goLogin: function () {
    this.setData({
      showModalStatus: false,
      showLoginView: true
    })
  },
  // 登录按钮接口
  loginbtn: function () {
    if (this.data.userName == null || this.data.userName == '') {
      wx.showModal({
        title: '提示',
        content: '登录名不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            

          }
        }
      })
      return;
    }
    if (this.data.userPwd == null || this.data.userPwd == '') {
      wx.showModal({
        title: '提示',
        content: '密码不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log(res.confirm);

          }
        }
      })
      return;
    }

    var param = Object();
    param.managerName = "UserManager";
    param.methodName = "saveTokenAndLogin";
    var po = Object();
    po.code = this.data.userName;
    po.password = this.data.userPwd;
    po.os = "";
    po.client_id = "";
    po.token = "";
    param.parameters = [JSON.stringify(po)];
    var paramdata = JSON.stringify(param);

    console.log(JSON.stringify(paramdata)+"990909090909")
    wx.setStorage({
      key: 'userName',
      data: this.data.userName
    });
    wx.setStorage({
      key: 'userPassword',
      data: this.data.userPwd
    });
    var that = this;
    wx.request({
      url: openIdUrl + 'dispatcher.action?',
      data: "requestString=" + encodeURIComponent(paramdata),
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {

        var jsonData = JSON.parse(res.data.data);
        var code = jsonData.code
        var message = jsonData.message;
         console.log(JSON.stringify(jsonData)+"111111");
        //返回200登录成功跳转页面
        if (code == 200) {
          var employee = jsonData.user;
          var usergroup = jsonData.user.usergroup;


          wx.showToast({
            title: '登录成功',
          })
          wx.setStorage({
            key: 'login_style',
            data: 'account_login'
          });
          wx.setStorage({
            key: 'employee',
            data: jsonData
          });
          wx.setStorage({
            key: 'isLogin',
            data: "isLogin"
          });
          
          app.globalData.employeeId = employee.employeeId;
          app.globalData.password = employee.password;
          app.globalData.id = employee.id;
          app.globalData.code = code;
          app.globalData.zw_code = usergroup.code;
          app.globalData.employee = employee;
          app.globalData.name = employee.name;
          app.globalData.zw = employee.zw;
          app.globalData.login_statu = false;
          app.globalData.inviteCode = employee.inviteCode;
          wx.setStorage({
            key: 'inviteCode',
            data: jsonData.data.inviteCode,
          })
          app.globalData.isLogin = "islogin";
          app.globalData.employee_phone = (employee.mobilephone == null || employee.mobilephone == '' || employee.mobilephone == undefined) ? '--' : employee.mobilephone;
          if (usergroup.code != null && usergroup.code != '' && usergroup.code != undefined) {
            if (usergroup.code.slice(0, 2) == 'ZB') {
              app.globalData.showDataTV = true;
              app.globalData.showDataTV_1 = true;
              that.setData({
                showDataTV: true,
                showDataTV_1: true
              })
            }
            if (usergroup.code.slice(0, 2) == 'CS') {
              app.globalData.showInput = true;
              app.globalData.showDataTV_1 = true;
              that.setData({
                showInput: true,
                showDataTV_1: true
              })
            }
          }
          if (app.globalData.employeeId != null) {
            console.log(app.globalData.employeeId + "员工号不为空");
            that.getNoticeCount();
            that.getMessageCount();
          } else {
            console.log(app.globalData.employeeId + "员工号为空");
            that.setData({
              unNoticeCount: "0",
              unMessageCount: "",
            })
          }

          that.setData({
            showLoginView: false,
            nickname: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == undefined) ? this.data.nickname : app.globalData.name
            // employee_id: (app.globalData.employeeId== null || app.globalData.employeeId== '' || app.globalData.employeeId == undefined) ? '--' : app.globalData.employeeId,
            // user_name: (app.globalData.name == null || app.globalData.name == ''|| app.globalData.name == ' ' || app.globalData.name == undefined) ? '--' : app.globalData.name,
            //  zw: (app.globalData.zw == null || app.globalData.zw == '' || app.globalData.zw == ' ' || app.globalData.zw == undefined) ? '--' : app.globalData.zw
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
  //  获取手机验证码
  getValidCode: function () {
    var that = this;
    that.tick();

    // 发送验证码
    var param = Object();
    param.managerName = "InterManager";
    param.methodName = "wxSendMessage";
    param.parameters = [this.data.phoneNo];
    var paramdata = JSON.stringify(param);
    wx.request({
      url: openIdUrl + 'dispatcher.action?',
      data: "requestString=" + encodeURIComponent(paramdata),
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var jsonData = JSON.parse(res.data.data);
        var code = jsonData.code
        var message = jsonData.message;

        if (code == 200) {
          wx.showToast({
            title: '验证码发送成功',
          })


        } else {
          wx.showModal({
            title: '提示',
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
  tick: function () {
    var vm = this
    if (vm.data.count > 0) {
      vm.setData({
        count: vm.data.count - 1,
        color: "#e8e8e8",
        backgroundcolor: "#acacac",
        getValidCode: ""
      });
      setTimeout(function () {
        return vm.tick()
      }, 1000)
    } else {
      vm.setData({
        count: 60,
        color: "white",
        backgroundcolor: "#595959",
        getValidCode: "getValidCode"
      });
    }
  },

  //获取用户输入的验证码
  getCode: function (e) {
    this.setData({
      ValidCode: e.detail.value
    })
  },
  // 通过验证码登录
  validCodeLogin: function () {
    if (this.data.ValidCode == null || this.data.ValidCode == '') {
      wx.showModal({
        title: '提示',
        content: '验证码不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log(res.confirm);

          }
        }
      })
      return;
    }
    // 验证码绑定微信号
    var param = Object();
    param.managerName = "InterManager";
    param.methodName = "wxLogin";
    var po = Object();
    po.mobilephone = this.data.phoneNo;
    po.password = this.data.ValidCode;
    po.real_name = app.globalData.openId;
    po.nickname = this.data.nickname;
    po.user_id = this.data.user_id;

    param.parameters = [JSON.stringify(po)];
    var paramdata = JSON.stringify(param);

    var that = this;
    wx.request({
      url: openIdUrl + 'dispatcher.action?',
      data: "requestString=" + encodeURIComponent(paramdata),
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var jsonData = JSON.parse(res.data.data);
        console.log("绑定成功"+JSON.stringify(jsonData));
        var code = jsonData.code
        var message = jsonData.message;
        if (code == 200) {
          wx.showToast({
            title: '绑定成功',
          })
          wx.setStorage({
            key: 'login_style',
            data: 'wx_login'
          });
          wx.setStorage({
            key: 'employee',
            data: jsonData
          });
          wx.setStorage({
            key: 'isLogin',
            data: "isLogin"
          });
          app.globalData.employee =jsonData.data;
          app.globalData.code = code;
          app.globalData.employeeId = jsonData.data.employeeId;
          app.globalData.name = jsonData.data.name;
          app.globalData.zw_code = jsonData.data.usergroupname;
          app.globalData.zw = jsonData.data.zw;
          app.globalData.login_statu = false;
          app.globalData.inviteCode = jsonData.data.inviteCode;
          wx.setStorage({
            key: 'inviteCode',
            data: jsonData.data.inviteCode,
          })
          app.globalData.isLogin = "islogin";
          app.globalData.employee_phone = (jsonData.data.mobilephone == null || jsonData.data.mobilephone == '' || jsonData.data.mobilephone == undefined) ? '--' : jsonData.data.mobilephone;

          if (jsonData.data.usergroupname != null && jsonData.data.usergroupname != '' && jsonData.data.usergroupname != undefined) {
            if (jsonData.data.usergroupname.slice(0, 2) == 'ZB') {
              app.globalData.showDataTV = true;
              app.globalData.showDataTV_1 = true;
              that.setData({
                showDataTV: true,
                showDataTV_1: true

              })
            }
            if (jsonData.data.usergroupname.slice(0, 2) == 'CS') {
              app.globalData.showInput = true;
              app.globalData.showDataTV_1 = true;
              that.setData({
                showInput: true,
                showDataTV_1: true
              })
            }
          }
          if (app.globalData.employeeId != null) {
            console.log(app.globalData.employeeId + "绑定登录员工号不为空");
            that.getNoticeCount();
            that.getMessageCount();
          } else {
            console.log(app.globalData.employeeId + "绑定登录员工号为空");
            that.setData({
              unNoticeCount: "0",
              unMessageCount: "",
            })
          }


          that.setData({
            showWxView: false,
            nickname: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == undefined) ? this.data.nickname : app.globalData.name
            // employee_id: (app.globalData.employeeId == null || app.globalData.employeeId == '' || app.globalData.employeeId == undefined) ? '--' : app.globalData.employeeId,
            // user_name: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == ' ' || app.globalData.name == undefined) ? '--' : app.globalData.name,
            // zw: (app.globalData.zw == null || app.globalData.zw == '' || app.globalData.zw == ' ' || app.globalData.zw == undefined) ? '--' : app.globalData.zw
          })

        } else {
          wx.showModal({
            title: '提示',
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

  getuser:function(){
    var self = this;
    // 授权获取用户基本信息
    wx.getUserInfo({
      success: function (res) {
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
        app.globalData.nick_name = res.userInfo.nickName;

      }, fail: function () {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                    wx.getUserInfo({
                      success: function (res) {

                        self.setData({
                          thumb: res.userInfo.avatarUrl,
                          nickname: res.userInfo.nickName
                        })

                      }, fail: function () {
                    

                      }
                    })

                  }
                }
              })
            }else{
              self.setData({
                thumb: "../images/guoanmen.png",
                nickname: (app.globalData.name == null || app.globalData.name == '' || app.globalData.name == undefined) ? '游客' : app.globalData.name
              })

            }
          }
        })


      }
    })


  },
  // 获取公告未读数量
  getNoticeCount:function(){
    var that=this;
    var param = Object();
    param.managerName = "NoticeReciverManager";
    param.methodName = "getUnReadNotice";
    param.parameters = [app.globalData.employeeId];
    var paramdata = JSON.stringify(param);
    console.log(paramdata+  "hahahah");
    wx.request({
      url: openIdUrl + 'dispatcher.action?',
      data: "requestString=" + encodeURIComponent(paramdata),
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(JSON.stringify(res.data) +"getNoticeCount000000");
      //  debugger
       if(res.data.result==true){
         var jsonData=res.data.data;
          that.setData({
            unNoticeCount:jsonData
          })
       }
       
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
  },
  // 获取未读消息总数
  getMessageCount: function () {
    var that = this;
    var param = Object();
    param.managerName = "MessageNewManager";
    param.methodName = "getUnReadMessageAmount";
    var message = Object();
    message.receiveId = app.globalData.employeeId;
    param.parameters = [JSON.stringify(message)];
    var paramdata = JSON.stringify(param);
    console.log(paramdata);
    wx.request({
      url: openIdUrl + 'dispatcher.action?',
      data: "requestString=" + encodeURIComponent(paramdata),
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(JSON.stringify(res.data) +"getMessageCount");
        //  debugger
        if (res.data.result == true) {
          var jsonData = res.data.data;
          that.setData({
            unMessageCount: jsonData
            
          })
        }

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
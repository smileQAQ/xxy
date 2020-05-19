//app.js
import regeneratorRuntime  from "./packages/regenerator-runtime/runtime"
import {request} from "/utils/request";

App({
  onLaunch: function (options) {
    // if (options.scene == 1007 || options.scene == 1008) {
    //   this.globalData.share = true
    // } else {
    //   this.globalData.share = false
    // };

    wx.login({
      success: res => {
        this.globalData.code = res.code
      }
    })

    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight+6;
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }

        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true){
          //未授权
          wx.showModal({
            title: '',
            content: '需要先授权才能获取您的位置信息',
            success: function (res) {
              if (res.cancel) {
                //取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                //确定授权，通过wx.openSetting发起授权请求
                wx.openSetting({
                  success: function (res) {
                    if (res.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      _this.goAddress();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          wx.getLocation({
            success: res=>{
              console.log(res)
            }
          })
        }
        else {
          wx.getLocation({
            success: res=>{
              console.log(res)
            }
          })
        }
      }
    })
  },
  globalData: {
    picBaseUrl: "https://www.xiaoyy.net.cn/wximage/",
    userInfo: null,
    code: null,
    share: false,  
    height: 0,
  }
})
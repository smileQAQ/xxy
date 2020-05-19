//index.js

let app = getApp();

import {request} from "../../utils/request";
// [{org_id:1,org_name:"aaaa",org_logo_addr:"/dist/image/orgicon.png",org_type:"课外辅导",distance:"1000"},{org_id:1,org_name:"aaaa",org_logo_addr:"/dist/image/orgicon.png",org_type:"课外辅导",distance:"1000"},{org_id:1,org_name:"aaaa",org_logo_addr:"/dist/image/orgicon.png",org_type:"课外辅导",distance:"1000"},{org_id:1,org_name:"aaaa",org_logo_addr:"/dist/image/orgicon.png",org_type:"课外辅导",distance:"1000"},{org_id:1,org_name:"aaaa",org_logo_addr:"/dist/image/orgicon.png",org_type:"课外辅导",distance:"1000"},{org_id:1,org_name:"aaaa",org_logo_addr:"/dist/image/orgicon.png",org_type:"课外辅导",distance:"1000"}]
Page({
  data: {
    distList:[{text: "教育机构",url:'/dist/image/orgicon.png'},{text: "优惠活动",url:'/dist/image/activityicon.png'},{text: "教育信息",url:'/dist/image/teachicon.png'}],
    nvabarData: {
      title: '校营盈', 
    },
    height: app.globalData.height * 2 + 20 , 
    currentData: 0,
    show: false,
    snodeol:[],
    artil:[],
    actiol:[],
    fisrt_image_addr: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: async function () {
    let data = {
      mtxcode: "wxfirst",
      latitude: "22.835088",
      longitude: "113.262586"
    }
    let homeData = await request({data: data, method: "post", header: {"Content-Type": "application/x-www-form-urlencoded"}})

    this.setData({
      fisrt_image_addr: app.globalData.picBaseUrl+homeData.fisrt_image_addr,
      snodeol: [...this.data.snodeol,...homeData.snodeol],
      artil: [...this.data.artil,...homeData.artil],
      actiol: [...this.data.actiol,...homeData.actiol]
    })
    console.log(this.data)
    

    // let userRes = await wx.getUserInfo({
    //   success: async res =>{
    //   }
    // })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  open: function () {
    this.setData({
        show: true
    })
  },
  buttontap(e) {
    console.log(e.detail.item.value)
      if(e.detail.item.value){
        wx.login({
          success: (res) => {
            console.log(res)          
          },
        })
      }else{
        
      }
      this.setData({
        show: false
    })
  },
  checkCurrent(e){
    if (this.data.currentData == e.currentTarget.dataset.current){
        return false;
    }else{
      this.setData({
        currentData: e.currentTarget.dataset.current
      })
    }
  },
  bindGetUserInfo(res){
    if(res.detail.errMsg === 'getUserInfo:ok'){
      wx.navigateTo({
        url: '/pages/user-info/user-info',
      })
    }
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
//页面触底
  onReachBottom(){

  }
})

// pages/org-introduction.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    activeTab: 0,
    activeColor: '#22A1FF',
    nvabarData: {
      title: '我的主页', 
      showback: true
    },
    height: app.globalData.height * 2 + 20
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const titles = ['简介', '资质', '师资', '班级']
    const tabs = titles.map(item => ({title: item}))
    this.setData({tabs})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  }
})
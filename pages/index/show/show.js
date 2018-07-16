// pages/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpser: 'https://vip.chplaza.com.cn/public',
    selected: true,
    selected1: false,
    selected2: false
  },
  selected: function (e) {
    this.setData({
      selected2: false,
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.request({
      url: 'https://vip.chplaza.com.cn/api/detail?id='+e.id,
      success: function (res) {
        that.setData({
          show: res.data,
        })
        // 设置头
        wx.setNavigationBarTitle({
          title: res.data.company,
        })
      }
    })
  },


  
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '光热会员俱乐部',
      path: '/pages/index/show/show?id='+e.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  
})
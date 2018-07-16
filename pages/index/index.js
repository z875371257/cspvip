Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    httpser: 'https://vip.chplaza.com.cn/public',
    toView: 'inToView01',
    lists: 'none',
    ts: 'none',
    zimu: 'A',
    banner: '../../images/banner.png',
    codess: '',
    loadings: getApp().globalData.loadings,
    loads: getApp().globalData.loads
  },

  scrollToViewFn: function (e) {
    var that = this
    var _id = e.target.dataset.id;
    var _az = e.target.dataset.az
    this.setData({
      toView: 'inToView' + _id,
      ts: 'black',
      zimu: _az
    })

    setTimeout(function () {
      that.setData({
        ts: 'none',
        zimu: 'A'
      })
    }, 800);
  },


  /* 点击跳转 */
  showdetail: function(event){
    wx.navigateTo({
      url : 'show/show?id='+event.target.id
    })
  },
  searchbind: function(event){
    wx.navigateTo({
      url: 'search/search',
    })
  },
  binds: function(res){
    this.setData({
      heis: '102%'  
    })
    if(res.detail.scrollTop > 500 ){
      this.setData({
        lists: 'black',      
      })
    }else{
      this.setData({
        lists: 'none'
      })
    }
  },  
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    
    }
    return {
      title: '光热会员俱乐部',
      path: '/pages/index/index',
      success: function (res) {
      
      },
      fail: function (res) {

      }
    }
  },
  
  onLoad: function (options) {
    var that = this;

    /* 会员列表API */
    wx.request({
      url: 'https://vip.chplaza.com.cn/api',
      success: function (res) {
        that.setData({
          codess: res.data
        })
      }
    })

    /* 最新会员API 按添加时间排序 */
    wx.request({
      url: 'https://vip.chplaza.com.cn/api/newmember',
      success: function (res) {
        that.setData({
          news: res.data
        })
      }
    })

    /* 推荐会员API recommend=1通过修改时间进行排序 */
    wx.request({
      url: 'https://vip.chplaza.com.cn/api/hotsmember',
      success: function (res) {
        that.setData({
          hots: res.data
        })
      }
    })

    wx.request({
      method: 'POST',
      data: {
        id: 1
      },
      url: 'https://vip.chplaza.com.cn/api/slide',
      success: function (res) {
        that.setData({
          banner: 'https://vip.chplaza.com.cn/public' + res.data.image
        })
      }
    })

  },
  onReady: function (e) {
   
  },
  
})  
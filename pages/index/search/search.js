Page({
  data: {
    inputValue: '',
    labhide: false,
    listhide: true,
    err: true,
    httpser: 'https://vip.chplaza.com.cn/public'
  },
  /* 表单输入事件 */
  bindInput: function(e){
    this.setData({
      inputValue: e.detail.value,
    })
  },

  cancels: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  /* input关键字搜索 */
  bindchange: function (e) {
    
    var that = this
    if(e.detail.value != ''){
      wx.request({
        method: 'POST',
        data: {
          stat: 'keyword',
          kw :e.detail.value
        },
        url: 'https://vip.chplaza.com.cn/api/search',
        success: function(res){
      
            if(res.data.codes == 0){
              that.setData({
                err:false,
                listhide: true
              })
            } else {
              that.setData({
                member: res.data,
                listhide: false,
                err: true
              })
            }
        },
        
      })
    }
  },
  /* 表单搜索 */
  bindlabel: function(e) {
    var that = this
    wx.request({
      method: 'POST',
      data: {
        stat: 'label',
        kw: e.target.id
      },
      url: 'https://vip.chplaza.com.cn/api/search',
      success: function (res) {
        that.setData({
          member: res.data,
          listhide: false
        })
      }
    })
  },
  /* 点击跳转 */
  showdetail: function (event) {
    wx.navigateTo({
      url: '../show/show?id=' + event.target.id
    })
  },
  
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://vip.chplaza.com.cn/api/label',
      success: function (res) {
        that.setData({
          label: res.data
        })
      }
    })
  }
  
})
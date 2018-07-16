Page({

  /**
   * 页面的初始数据
   */
  data: {
    hints: true,
    hinttext: ''
  },
  tels:function(){
    wx.makePhoneCall({
      phoneNumber: '010-85618022' //仅为示例，并非真实的电话号码
    })
  },
  /* 表单提交 */
  formSubmit: function (res) {
    var that = this;

    var company = res.detail.value.company
    var truename = res.detail.value.truename
    var tel = res.detail.value.tel
    var wechats = res.detail.value.wechats
    if (company == "") {
      this.setData({
        hints: false,
        hinttext: '请填写单位名称！'
      })
      setTimeout(function () {
        that.setData({
          hints: true
        })
      }, 3000);
      return false;

    } else if (truename == "") {
      this.setData({
        hints: false,
        hinttext: '请填写姓名！'
      })
      setTimeout(function () {
        that.setData({
          hints: true
        })
      }, 3000);
      return false;
    } else if( tel == ''){
      this.setData({
        hints: false,
        hinttext: '电话号码不能为空'
      })
      setTimeout(function () {
        that.setData({
          hints: true
        })
      }, 3000);
      return false;
    } else if (tel.length != 11) {
      this.setData({
        hints: false,
        hinttext: '请正确填写11位数字的手机号码！'
      })
      setTimeout(function () {
        that.setData({
          hints: true
        })
      }, 3000);
      return false;
    } else if (wechats == "") {
      this.setData({
        hints: false,
        hinttext: '请填写微信号！'
      })
      setTimeout(function () {
        that.setData({
          hints: true
        })
      }, 3000);
      return false;
    }
    /* 通过POST将表单内容提交到服务器 */
    wx.request({
      method: 'POST',
      data: {
        company: company,
        truename: truename,
        tel: tel,
        wechats: wechats
      },
      url: 'https://vip.chplaza.com.cn/api/join',
      success: function (res) {
        if (res.data = 1) {
          that.setData({
            hints: false,
            hinttext: '提交成功！稍后我们将与您联系！'
          })
          setTimeout(function () {
            that.setData({
              hints: true
            })
          }, 3000);
        } else {
          that.setData({
            hints: false,
            hinttext: '您已提交成功，我们稍后就会与您联系！'
          })
          setTimeout(function () {
            that.setData({
              hints: true,
            })
          }, 3000);
        }
      }
    })
  },

  onLoad: function(){
    var that = this
    /* 设置头 */
    wx.setNavigationBarTitle({
      title: '光热会员提交申请'
    })

    wx.request({
      method: 'POST',
      data: {
        id: 3
      },
      url: 'https://vip.chplaza.com.cn/api/slide',
      success: function (res) {
        that.setData({
          zx: 'https://vip.chplaza.com.cn/public' + res.data.image
        })
      }
    })
    wx.request({
      method: 'POST',
      data: {
        id: 4
      },
      url: 'https://vip.chplaza.com.cn/api/slide',
      success: function (res) {
        that.setData({
          dh: 'https://vip.chplaza.com.cn/public' + res.data.image
        })
      }
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
  
  }
})
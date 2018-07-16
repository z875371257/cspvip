// pages/product/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hints: true,
    hinttext: '',
    index:1,
    totalprice: '',
    content: '',
  },

  // 商品数据减事件
  bindMinus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    // 如果只有1件了，就不允许再减了
    if (index <= 1) {
      return false
    } else {
      index--
      this.setData({
        index: index,
        totalprice: index * this.data.pro.price + '.00'
      })
    }
  },
  
  // 商品数据增加事件
  bindPlus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    index++
    this.setData({
      index: index,
      totalprice: index * this.data.pro.price + '.00'
    })
  },

  bindManual: function (e) {
    var index = parseInt(e.detail.value);
    this.setData({
      index: index,
      totalprice: index * this.data.pro.price + '.00'
    })
  },
  tap: function () {
    // console.log(tap)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    var that = this
    wx.request({
      url: 'https://vip.chplaza.com.cn/api/ProductShow?id=1',
      success: function (res) {
        
        var content = res.data.content
        res.data.content = content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
        
        that.setData({
          pro: res.data,
          totalprice: res.data.price
        })
       
      }
    })
  },

  formSubmit: function (res) {

    var that = this;
    var truename = res.detail.value.truename  // 姓名
    var tel = res.detail.value.tel      //电话
    var address = res.detail.value.address  //地址
    var remark = res.detail.value.remark  //备注
    var pnum = res.detail.value.pnum  //总数
    var price = this.data.pro.price  //单价
    var pid = this.data.pro.pid   //产品ID
    var totalprice = this.data.totalprice  //总价

    // 判断必填项是否填写 未填写出提示并结束执行
    if (truename == "") {
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

    } else if (tel == '') {
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
    } else if (address == "") {
      this.setData({
        hints: false,
        hinttext: '请填写详细收货地址'
      })
      setTimeout(function () {
        that.setData({
          hints: true
        })
      }, 3000);
      return false;
    }

    // 信息填写正确后获取用户的Openid
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: '' + 'https://vip.chplaza.com.cn/api/Getopenid',
            data: {
              code: res.code
            },
            success: function (data) {
              //获取到OpenId后进行下面请求支付方法
              that.Pay(truename, tel, address, remark, pnum, price, pid, totalprice, data.data)
            }
          })
        }
      }
    })
  },

  // 请求支付方法  将用户提交的信息及openid获取
  Pay: function (truename, tel, address, remark, pnum, price, pid, totalprice, openid){
    var that = this

    // 请求后台获取微信支付接口需要的参数，将OpenId 和商品总价传过去
    wx.request({
      method: 'POST',
      data: {
        totalprice: totalprice,
        openid: openid
      },
      url: 'https://vip.chplaza.com.cn/api/pay',
      success: function (res) {

        // 信息获取成功后调用微信支付接口
        wx.requestPayment({
          'timeStamp': '' + res.data.timeStamp,   
          'nonceStr': '' + res.data.nonceStr,
          'package': '' + res.data.package,
          'signType': '' + res.data.signType,
          'paySign': '' + res.data.paySign,
          'success': function (ress) { 
            // 支付成功后调用下面的PayOrder接口将订单信息写入数据库内 并出现提示
            that.PayOrder(truename, tel, address, remark, pnum, price, pid, totalprice, openid, 0)
            that.setData({
              hints: false,
              hinttext: '您的订单已提交成功，将在三日内快递给您，请注意查收！谢谢！'
            })
            setTimeout(function () {
              that.setData({
                hints: true
              })
            }, 5000);
            
          },
          'fail': function (ress) { 
      
          },
          'complete': function (ress) { }
        })
    
      }
    })
  },

  // 将数据存入服务器数据库中
  PayOrder: function (  truename, tel, address, remark, pnum, price, pid, totalprice, openid, status) {

    wx.request({
      url: 'https://vip.chplaza.com.cn/api/order',
      data: {
        truename: truename,
        tel: tel,
        address: address,
        remark: remark,
        pnum: pnum,
        price: price,
        pid: pid,
        totalprice: totalprice,
        openid: openid,
        status: status
      },
      success: function (e) {
        return e
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
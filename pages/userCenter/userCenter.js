//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo:null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../side/userAgree'
    })
    wx.navigateTo({
      url: '../babyback/babyback'
    })
  },
  onLoad: function () {
    console.log(getApp().globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  modalcnt: function () {
    let that = this;

    wx.showModal({
      title: '提示',
      content: '绑定手机号可以帮助你快速使用小程序,提高微信安全性。',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../side/iponeLogin'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  agreement: function(){
    wx.navigateTo({
      url: '../side/userAgree'
    })
  },

  
  fingerpost: function () {
    wx.navigateTo({
      url: '../fingerpost/fingerpost'
    })
  },

  wallet: function () {
    wx.navigateTo({
      url: '../babyback/babyback'
    })
  },
  
  order:function(){
    wx.navigateTo({
      url: '../userOrder/userOrder'
    })
  }
})
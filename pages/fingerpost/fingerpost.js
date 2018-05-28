//index.js

Page({
  data: {

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../side/userAgree'
    })
  },
  fingerpost01: function () {
    wx.navigateTo({
      url: '../fingerpost01/fingerpost01'
    })
  },
  fingerpost02: function () {
    wx.navigateTo({
      url: '../fingerpost02/fingerpost01'
    })
  },
  fingerpost03: function () {
    wx.navigateTo({
      url: '../fingerpost03/fingerpost01'
    })
  },
})
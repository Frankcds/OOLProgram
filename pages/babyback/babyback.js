// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //事件处理函数
  bindViewTap: function () {

  },
  wallet:function(){
    wx.navigateTo({
      url: '../wallet/wallet'
    })
  },

  formSubmit: function (e) {

    if (e.detail.value.userName.length == 0 || e.detail.value.orderNumber.length == 0) {

      wx.showToast({

        title: '信息不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } else {

      wx.request({

        url: 'https://test.test.com/home/Login/register',

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        },

        method: "POST",

        data: { userName: e.detail.value.userName, orderNumber: e.detail.value.orderNumber },

        success: function (res) {

          if (res.data.status == 0) {

            wx.showToast({

              title: res.data.info,

              icon: 'loading',

              duration: 2000

            })

          } else {

            wx.showToast({

              title: res.data.info,//这里打印出登录成功

              icon: 'success',

              duration: 1000

            })

          }

        }

      })

    }

  },


})
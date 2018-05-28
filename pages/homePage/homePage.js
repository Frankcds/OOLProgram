// pages/homePage/homePage.js
var base64 = require("../../utils/Base64.js");


//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgUrl:"url('http://api.ool.vc/chargerbaby-admin-server-api/oolPropram/homePage/homePageBg.png')",
    userLogs:'img/userLogs.png',
    scanBtn:"img/scanCodeBtn.png",
    shareBoxWhether:false,
    openFailWhether:false,
    failCodeWheter:false,
    storageWhether:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    // var base = new base64_decode()

    var token = app.globalData.token ;
    var that = this;
    if (token) {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
          })
        },
        fail: function () {
          // fail
          console.log("获取失败！")
        },
        complete: function () {
          // complete
          console.log("获取用户信息完成！")
        }
      })
    } else {
      wx.login({
        success: function (res) {
          console.log(res.code)
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (res_user) {
                wx.request({
                  //后台接口地址
                  url: 'http://api.ool.vc/chargerbaby-app-server-test/wechatSmall/checkCode',
                  data: {
                    code: res.code,
                    encryptedData: res_user.encryptedData,
                    iv: res_user.iv
                  },
                  method: 'POST',
                  dateType: JSON,
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    // this.globalData.userInfo = JSON.parse(res.data);
                    console.log("request success");
                    that.setData({
                      nickName: res_user.userInfo.nickName,
                      avatarUrl: res_user.userInfo.avatarUrl,
                    })
                    app.globalData.token = res.data.datas.token;
                  },
                  fail:function(err){
                    console.log("err--------:",err);
                  }

                })
              }, fail: function () {
                wx.showModal({
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                            wx.login({
                              success: function (res_login) {
                                if (res_login.code) {
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success: function (res_user) {
                                      wx.request({
                                        url: 'http://api.ool.vc/chargerbaby-app-server-test/wechatSmall/checkCode',
                                        data: {
                                          code: res_login.code,
                                          encryptedData: res_user.encryptedData,
                                          iv: res_user.iv
                                        },
                                        method: 'POST',
                                        dateType: JSON,
                                        header: {
                                          'content-type': 'application/json'
                                        },
                                        success: function (res) {
                                          that.setData({
                                            nickName: res_user.userInfo.nickName,
                                            avatarUrl: res_user.userInfo.avatarUrl,
                                          })
                                       
                                          app.globalData.token = res.data.datas.token;
                                        }
                                      })
                                    }
                                  })
                                }
                              }
                            });
                          }
                        }, fail: function (res) {

                        }
                      })

                    }
                  }
                })
              }, complete: function (res) {


              }
            })
          }
        }
      })

    }


  },


  ab2hex: function (buffer) {
    var hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return hexArr.join('');
  },

  /*自定义按钮扫码*/ 
  scanCode: function () {
    let that = this;
    wx.getLocation({
      success: function (locationRes) {

        wx.scanCode({
          success: (scanRes) => {
            that.deviceOpen(scanRes);
          },
          fail: (err) => {
            wx.showModal({
              title: "5.00",
              content: "这是一个模拟弹框",
              cancelText: "取消",
              confirmText: "支付",
              success: function (res) {
                console.log(res);
              }
            })
          }
        })
      },
      fail:function(err){
        console.log("点击了拒绝授权地理位置");
      }
    })
    
  },


  /*扫码打开接口*/ 
  deviceOpen: function (scanRes) {
   let uuid = scanRes.result.substring(scanRes.result.length - 12, scanRes.result.length);

   var url = "http://api.ool.vc/chargerbaby-app-server-test/device/open?token=" + app.globalData.token;
   wx.request({
     url: url,
     data: {
       "uuid": base64.decode(uuid),
       "longitude": locationRes.longitude,
       "latitude": locationRes.latitude
     },
     method: "POST",
     dateType: JSON,
     header: {
       'content-type': 'text/html'
     },
     success: function (scanCodeRes) {

       console.log("接口调用成功:---------", scanCodeRes.data);
     },
     fail: function (err) {
       console.log("接口调用失败:---------", err.data);
     }
   })
 },


    // let that = this;
    // let ab2hex = that.ab2hex
    // wx.openBluetoothAdapter({
    //   success:function(res){
    //     wx.showModal({
    //       title:"蓝牙适配器初始化成功"
    //     })
    //     wx.getBluetoothAdapterState({
    //       success:function(res){
    //         wx.showModal({
    //           title:"蓝牙适配器状态",
    //           content: res.available + "蓝牙适配器是否可用--" + res.discovering +"是否正在搜索设备",

    //         })
    //         if(res.available == true){
    //           wx.startBluetoothDevicesDiscovery({
    //             success:function(res){
    //               wx.showModal({
    //                 title:"蓝牙是否正在搜索:",
    //                 content:res.errMsg
    //               })
    //               console.log(res.errMsg);
    //               if (res.errMsg == "startBluetoothDevicesDiscovery:ok"){
    //                 let interval = setTimeout(function(){
    //                   wx.getBluetoothDevices({
    //                     success: function (res) {

    //                       for (let i = 0; i < res.devices.length; i++) {
    //                         console.log("获取到的蓝牙设备名称:" + res.devices[i].name);
    //                         console.log("获取到的蓝牙设备的id:" + res.devices[i].deviceId);
    //                         console.log("当前蓝牙设备强度:" + res.devices[i].RSSI);
    //                         console.log("ab2hex:", ab2hex(res.devices[i].advertisData).substring(ab2hex(res.devices[i].advertisData).length - 12, ab2hex(res.devices[i].advertisData).length));
    //                       }

    //                       // console.log("获取到的蓝牙设备名称:"+res.devices[0].name);
    //                       // console.log("获取到的蓝牙设备的id:"+res.devices[0].deviceId);
    //                       // console.log("当前蓝牙设备强度:"+res.devices[0].RSSI);
    //                     }
    //                   }),
    //                     wx.onBluetoothDeviceFound(function (devices) {
    //                       console.log("devices:", devices.devices[0].advertisServiceUUIDs[0]);
    //                     })

    //                 },3000)

    //               }
    //             }
    //           })
    //         }
    //       }
    //     })
    //   },
    //   fail:function(res){
    //     wx.showModal({
    //       title:"蓝牙适配器初始化失败"
    //     })
    //   }
    // })
  userCenter:function(){
    wx.navigateTo({
      url: '../userCenter/userCenter',
    })
  }
})

globalData: {
  userInfo: null
}
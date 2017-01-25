App({
  // 应用程序启动时触发一次
  onLaunch: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx003b9756954779f5&secret=13b007849f7a55c154f2ceb11972901d&grant_type=authorization_code&js_code=' + res.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.openid)
            }
          })
        }
      }
    });
  },
  onLoad: function () {

  },
  // 获取用户数据库信息
  getUser: function () {
    var that = this
    var person = {}
    person.address = '金祝南路2号号(省行政中心9号楼北楼216)'
    person.username = '孙雨春'
    person.phone = '13867820265'
    person.postcode = '310000'
    that.globalData.user = person
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  // 全局数据对象
  globalData: {
    userInfo: null,
    user: null
  }
})
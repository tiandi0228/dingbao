App({
  // 应用程序启动时触发一次
  onLaunch: function () {
  },
  onLoad: function () {

  },
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
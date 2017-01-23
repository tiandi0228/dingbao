var app = getApp()
Page({
    data: {
        phone: '',
        username: '',
        address: ''
    },
    onLoad: function () {
        app.getUser()
        this.setData({
            phone: app.globalData.user.phone,
            username: app.globalData.user.username,
            address: app.globalData.user.address
        })
    }
})
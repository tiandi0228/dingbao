var app = getApp()
Page({
    data: {
        total: '',
        num: '',
        date: '',
        phone: '',
        username: '',
        postcode: '',
        address: '',
        time: '',
        order: ''
    },
    onLoad: function () {
        app.getUser()
        this.setData({
            num: wx.getStorageSync('num'),
            total: wx.getStorageSync('total'),
            date: wx.getStorageSync('date'),
            time: wx.getStorageSync('time'),
            order: wx.getStorageSync('order'),
            phone: app.globalData.user.phone,
            username: app.globalData.user.username,
            postcode: app.globalData.user.postcode,
            address: app.globalData.user.address
        })
    }
})
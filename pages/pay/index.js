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
    primary: function () {
        console.log(1111111)
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
var app = getApp()
var util = require('../../utils/util.js')
Page({
    data: {
        num: 1,
        year: '',
        price: 220,
        total: '',
        time: util.formatTime(new Date()),
        dates: ['全年', '上半年', '下半年', '1-3月', '4-6月', '7-9月', '10-12月'],
        date: 0,
        username: '',
        address: '',
        phone: '',
        postcode: ''
    },
    // 减少
    bindReduce: function () {
        if (this.data.num <= 1) {
            // 弹窗
            wx.showModal({
                title: '提示',
                content: '数量不能小于1份',
                showCancel: false
            })
        } else {
            this.setData({
                num: this.data.num - 1,
            })
            if (this.data.num >= 1) {
                this.date(this.data.date, this.data.num, this.data.price, false)
            }
        }
    },
    // 增加
    bindPlus: function () {
        this.setData({
            num: this.data.num + 1
        })
        if (this.data.num !== 1) {
            this.date(this.data.date, this.data.num, this.data.price, false)
        }
    },
    // 输入份数
    bindNumber: function (e) {
        this.date(this.data.date, e.detail.value, this.data.price, true)
    },
    // 时间选择
    bindPickerChange: function (e) {
        this.setData({
            date: e.detail.value
        })
        if (e.detail.value === '1' || e.detail.value === '2') {
            this.setData({
                total: (this.data.num * this.data.price / 2).toFixed(2)
            })
        } else if (e.detail.value === '3' || e.detail.value === '4' || e.detail.value === '5' || e.detail.value === '6') {
            this.setData({
                total: (this.data.num * this.data.price / 3).toFixed(2)
            })
        } else {
            this.setData({
                total: (this.data.num * this.data.price).toFixed(2)
            })
        }
    },
    // 结算
    bindPayment: function () {
        if (this.data.num < 1) {
            // 弹窗
            wx.showModal({
                title: '提示',
                content: '数量不能小于1份',
                showCancel: false
            })
        } else {
            // 清除缓存
            wx.clearStorageSync()
            // 存储本地缓存
            wx.setStorageSync('num', this.data.num)
            wx.setStorageSync('total', this.data.total)
            wx.setStorageSync('date', this.data.date)
            wx.setStorageSync('time', util.formatTime(new Date()))
            wx.setStorageSync('order', util.orderNumber())
            // 判断个人信息是否完整
            if (!this.data.address || !this.data.username || !this.data.phone || !this.data.postcode) {
                wx.showModal({
                    title: '提示',
                    content: '对不起，个人信息不完整，请先补充完整。',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                            // 跳转到个人信息页面
                            wx.navigateTo({
                                url: '../deliveryAddress/index'
                            })
                        }
                    }
                })
                return
            }
            // 弹窗
            wx.showModal({
                title: '提示',
                content: '确认购买' + this.data.num + '份报纸吗？共计' + this.data.total + '元',
                success: function (res) {
                    if (res.confirm) {
                        // 跳转到核对信息页面
                        wx.redirectTo({
                            url: '../pay/index'
                        })
                    }
                }
            })
        }
    },
    onLoad: function () {
        if (this.data.time.substr(5, 5) >= '12/01') {
            this.setData({
                year: parseInt(this.data.time.substr(0, 4)) + 1
            })
        } else {
            this.setData({
                year: parseInt(this.data.time.substr(0, 4))
            })
        }
        app.getUser()
        this.setData({
            total: (this.data.num * this.data.price).toFixed(2),
            phone: app.globalData.user.phone,
            username: app.globalData.user.username,
            address: app.globalData.user.address,
            postcode: app.globalData.user.postcode
        })
    },
    // 根据订阅日期计算金额
    date: function (date, num, price, boolean) {
        if (date) {
            if (date === '1' || date === '2') {
                if (boolean) {
                    this.setData({
                        num: parseInt(num),
                        total: (parseInt(num) * price / 2).toFixed(2)
                    })
                } else {
                    this.setData({
                        total: (num * price / 2).toFixed(2)
                    })
                }
            } else if (date === '3' || date === '4' || date === '5' || date === '6') {
                if (boolean) {
                    this.setData({
                        num: parseInt(num),
                        total: (parseInt(num) * price / 3).toFixed(2)
                    })
                } else {
                    this.setData({
                        total: (num * price / 3).toFixed(2)
                    })
                }
            } else {
                if (boolean) {
                    this.setData({
                        num: parseInt(num),
                        total: (parseInt(num) * price).toFixed(2)
                    })
                } else {
                    this.setData({
                        total: (num * price).toFixed(2)
                    })
                }
            }
        } else {
            if (boolean) {
                this.setData({
                    num: parseInt(num),
                    total: (parseInt(num) * price).toFixed(2)
                })
            } else {
                this.setData({
                    total: (num * price).toFixed(2)
                })
            }
        }
    }
})
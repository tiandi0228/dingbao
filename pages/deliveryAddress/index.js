var app = getApp()
var tcity = require("../../utils/citys.js")
Page({
    data: {
        phone: '',
        username: '',
        address: '',
        id: '',
        provinces: [],
        province: '',
        citys: [],
        city: '',
        countys: [],
        county: '',
        value: [0, 0, 0],
        values: [0, 0, 0],
        condition: false,
        postcode: ''
    },
    // 姓名
    bindUserName: function (e) {

    },
    // 联系电话
    bindPhone: function (e) {

    },
    // 省市区联动
    bindChange: function (e) {
        var val = e.detail.value
        var t = this.data.values
        var cityData = this.data.cityData
        // 省份
        if (val[0] != t[0]) {
            const citys = [];
            const countys = [];
            for (let i = 0; i < cityData[val[0]].sub.length; i++) {
                citys.push(cityData[val[0]].sub[i].name)
            }
            for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
                countys.push(cityData[val[0]].sub[0].sub[i].name)
            }
            this.setData({
                province: this.data.provinces[val[0]],
                city: cityData[val[0]].sub[0].name,
                citys: citys,
                county: cityData[val[0]].sub[0].sub[0].name,
                countys: countys,
                values: val,
                value: [val[0], 0, 0]
            })
            return;
        }
        // 城市
        if (val[1] != t[1]) {
            const countys = [];
            for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
                countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
            }
            this.setData({
                city: this.data.citys[val[1]],
                county: cityData[val[0]].sub[val[1]].sub[0].name,
                countys: countys,
                values: val,
                value: [val[0], val[1], 0]
            })
            return;
        }
        // 区域
        if (val[2] != t[2]) {
            this.setData({
                county: this.data.countys[val[2]],
                values: val
            })
            return;
        }
    },
    open: function () {
        this.setData({
            condition: !this.data.condition
        })
    },
    // 保存
    formSubmit: function (e) {
        console.log(e.detail.value.username + '-' + e.detail.value.phone + '-' + this.data.province + '-' + this.data.city + '-' + this.data.county + '-' + e.detail.value.postcode + '-' + e.detail.value.address)
        wx.navigateBack({
            delta: 1
        })
    },
    onLoad: function (options) {
        app.getUser()
        this.setData({
            id: options.id,
            phone: app.globalData.user.phone,
            username: app.globalData.user.username,
            address: app.globalData.user.address,
            postcode: app.globalData.user.postcode
        })
        var that = this;
        tcity.init(that);
        var cityData = that.data.cityData;
        const provinces = [];
        const citys = [];
        const countys = [];
        for (let i = 0; i < cityData.length; i++) {
            provinces.push(cityData[i].name);
        }
        for (let i = 0; i < cityData[0].sub.length; i++) {
            citys.push(cityData[0].sub[i].name)
        }
        for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
            countys.push(cityData[0].sub[0].sub[i].name)
        }
        that.setData({
            'provinces': provinces,
            'citys': citys,
            'countys': countys,
            'province': cityData[0].name,
            'city': cityData[0].sub[0].name,
            'county': cityData[0].sub[0].sub[0].name
        })
    }
})
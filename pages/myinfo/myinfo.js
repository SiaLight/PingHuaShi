const util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    hasLogout: false,
    ispage_num: 0,
    adtag: 0,
    advice_text: "未知",
    hasidenti: false,
    stu_id: null,
    stu_pwd: null,
    my_comment: [],
    my_praise: [],
    my_message: [],
    user: null,
    isCard: true,
    course: [
      {
        title: "我的评价",
        jump: "jumpto1",
      },
      {
        title: "我的赞",
        jump: "jumpto2",
      },
      {
        title: "我的消息",
        jump: "jumpto3",
      },
      {
        title: "意见反馈",
        jump: "jumpto4",
      },
    ],

    advice: [
      {
        title: "小程序闪退",
        jump: "jumpto11",
        tag: 11,
      },
      {
        title: "卡顿",
        jump: "jumpto12",
        tag: 12,
      },
      {
        title: "黑屏",
        jump: "jumpto13",
        tag: 13,
      },
      {
        title: "界面错位",
        jump: "jumpto14",
        tag: 14,
      },
      {
        title: "加载过慢",
        jump: "jumpto15",
        tag: 15,
      },
      {
        title: "其他异常",
        jump: "jumpto16",
        tag: 16,
      },
      {
        title: "意见与建议",
        jump: "jumpto17",
        tag: 17,
      },

    ],


  },

  onShow: function (e) {
    if (app.globalData.isLogin == true) {
      console.log(app.globalData.user_detail)
      this.setData({
        hasLogout: false,
        user: app.globalData.user_detail
      })
      if (app.globalData.user_detail.role == 2)
        this.setData({
          hasidenti: true,
        })
    }

  },

  jumpto1: function (e) {
    this.setData({
      ispage_num: 1,
    })
    var that = this
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/comment/my_comment',
      method: 'POST',
      data: {
        user_id: app.globalData.user_detail.user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        that.setData({
          my_comment: res.data.data
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          content: 'ERROR: 响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },
  jumpto2: function (e) {
    this.setData({
      ispage_num: 2,
    })
    var that = this
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/comment/my_approval',
      method: 'POST',
      data: {
        user_id: app.globalData.user_detail.user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        that.setData({
          my_praise: res.data.data
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          content: 'ERROR: 响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },
  jumpto3: function (e) {
    this.setData({
      ispage_num: 3,
    })
    var that = this
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/comment/my_news',
      method: 'POST',
      data: {
        user_id: app.globalData.user_detail.user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        that.setData({
          my_message: res.data.data
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          content: 'ERROR: 响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },
  jumpto4: function (e) {
    this.setData({
      ispage_num: 4,
    })
  },

  jumpto11: function (e) {
    this.setData({
      ispage_num: 11,
    })
  },
  jumpto12: function (e) {
    this.setData({
      ispage_num: 12,
    })
  },
  jumpto13: function (e) {
    this.setData({
      ispage_num: 13,
    })
  },
  jumpto14: function (e) {
    this.setData({
      ispage_num: 14,
    })
  },
  jumpto15: function (e) {
    this.setData({
      ispage_num: 15,
    })
  },
  jumpto16: function (e) {
    this.setData({
      ispage_num: 16,
    })
  },
  jumpto17: function (e) {
    this.setData({
      ispage_num: 17,
    })
  },

  jumpreturn: function (e) {
    this.setData({
      ispage_num: 0,
    })
  },

  jumpreturn_last: function (e) {
    this.setData({
      ispage_num: 4,
    })
  },

  logout: function () {
    app.globalData.hasLogout = true
    app.globalData.isLogin = false
    app.globalData.user_detail = {}
    this.setData({
      ispage_num: 0,
      adtag: 0,
      advice_text: "未知",
      hasidenti: false,
      stu_id: null,
      stu_pwd: null,
      user: null,
      hasLogout: true,
    })
    wx.redirectTo({
      url: '../login/login',
    })
  },
  get_advice: function (e) {
    this.setData({
      advice_text: e.detail.value,
      adtag: ispage_num
    })
  },

  commiton: function (e) {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 3000
    });
    this.setData({
      ispage_num: 4
    })
  },

  identifi: function () {
    if (this.data.hasidenti)
      return
    this.setData({
      ispage_num: 5
    })
  },

  get_stu_id: function (e) {
    this.setData({
      stu_id: e.detail.value,
    })
  },

  get_stu_pwd: function (e) {
    this.setData({
      stu_pwd: e.detail.value,
    })
  },

  //提交身份鉴定信息
  auth_submit: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/user/auth',
      method: 'POST',
      data: {
        id: app.globalData.user_detail.user_id,
        stu_id: that.data.stu_id,
        pwd: that.data.stu_pwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        if (res.data.code == 0) {
          wx.showToast({
            title: '认证成功',
            icon: 'success',
            duration: 3000
          })
          app.globalData.user_detail.role = 2
          that.setData({
            hasidenti: true
          })
          that.jumpreturn()
        }
        else {
          wx.hideLoading()
          wx.showModal({
            content: res.data.msg,
            showCancel: false,
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          content: 'ERROR: 响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },
  

});
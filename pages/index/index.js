//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    title_msg: '登录成功',
    userInfo: {},
    stu_id: null,
    stu_pwd: null,
    hasUserInfo: false,
    page_num: 0,
    array: ['所有热评', '课程热评', '教师热评'],
    index: 0,
    choose_index: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isCard: true,
    comment: [],
    cmt_type: '所有',
    scrollHeight: wx.getSystemInfoSync().windowHeight+25,
    visual: false
  },

  onLoad: function () {
    
  },

  

  onShow: function (e) {
    this.showHotComment();
  },

  refresh: function () {
    this.showHotComment();
  },

  showHotComment:function(e){
    var that = this;
    that.setData({
      comment: [],
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/comment/hot_comment',
      method: 'POST',
      data: {
        cmt_type: that.data.cmt_type,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 0)
          that.setData({
            comment: res.data.data.comment_info,
          })
        else {
          that.setData({
            comment: [],
          })
          wx.showToast({
            title: '无记录',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          title: 'ERROR',
          content: '响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },

  bindPickerChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      comment: [],
      index: e.detail.value,
      choose_index: e.detail.value
    })
    wx.showLoading({
      title: '加载中',
    })
    if (that.data.choose_index == 0)
      that.setData({
        cmt_type: '所有'
      })
    if (that.data.choose_index == 1)
      that.setData({
        cmt_type: '课程'
      })
    if (that.data.choose_index == 2)
      that.setData({
        cmt_type: '教师'
      })

    that.setData({
      comment: [],
    })
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/comment/hot_comment',
      method: 'POST',
      data: {
        cmt_type: that.data.cmt_type,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data)
        if(res.data.code == 0)
          that.setData({
            comment: res.data.data.comment_info,
          })
        else{
          that.setData({
            comment: [],
          })
          wx.showToast({
            title: '无记录',
            icon: 'none',
            duration: 2000
          })
        }  
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          title:'ERROR',
          content: '响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },
  /*
    get_open_id: function (e) {
      if(app.globalData.openid != null)
        return
      this.setData({
        open_id: e.detail.value,
      })
      var re;
      re = /[a-zA-Z0-9]{6,16}/; //匹配6-16个字符，只能是数字或字母，不包括下划线的正则表达式
      if(re.test(this.data.open_id)){
        this.setData({
          islegal_id: true,
          error_msg: ''
        })
      }
      else{
        this.setData({
          error_msg: '账号长度为6-16个字符，只能是数字或字母，不包括下划线'
        })
      }
    },
  */
  
  scrollToTop() {
    this.setData({
      scrollTop: 0
    })
  },
  scrolling(e) {
    let scrollTop = e.detail.scrollTop
    if (scrollTop < (this.data.scrollHeight-30 ) / 2) {
      this.setData({
        visual: false
      })
    } else {
      this.setData({
        visual: true
      })
    }
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh();
  }
})


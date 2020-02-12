//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    //islegal_id: false,
    //error_msg: '',
    title_msg: '登录成功',
    userInfo: {},
    stu_id: null,
    stu_pwd: null,
    hasUserInfo: false,
    //hasIdentifi: false,
    //hasLogout: app.globalData.hasLogout,
    page_num: 0,
    array: ['所有热评', '课程热评', '教师热评'],
    index: 0,
    choose_index: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isCard: true,
    comment: [],
    cmt_type: '所有',
  },

  onLoad: function () {
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/comment/more_comment',
      method: 'POST',
      data: {
        //cmt_type: that.data.cmt_type,
        res_id: 1165,
        res_type: '教师'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          content: 'ERROR: 响应失败', //响应失败输出信息
          showCancel: false,
          //duration: 3000
        })
      }
    })
  },

  onShow: function (e) {
    if (app.globalData.isLogin == false){
      this.setData({
        page_num: 0,
        hasUserInfo: false,
        title_msg: '登录成功',
        userInfo: {},
        stu_id: null,
        stu_pwd: null,
        index: 0,
        choose_index: 0,
        isCard: true,
        cmt_type: '所有'
        //hasIdentifi: false,
      })
    }
    var that = this;
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
        console.log(res.data)
        that.setData({
          comment: res.data.data.comment_info,
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          content: 'ERROR: 响应失败', //响应失败输出信息
          showCancel: false,
          //duration: 3000
        })
      }
    })
  },

  //用户登录
  login: function (e) {
    console.log(app.globalData.openid)
    var that = this
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/user/login',
      method: "POST",
      data: {
        openid: app.globalData.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.code == 0) {
          app.globalData.isLogin = true
          app.globalData.user_detail = res.data.data
          wx.showToast({
            title: that.data.title_msg,
            icon: 'success',
            duration: 3000
          })
          that.setData({
            page_num: 3, //切换到首页热评
          })
        }
        else {
          app.globalData.isLogin = false
          app.globalData.user_detail = {}
          /*wx.showModal({
            content: res.data.msg, //登录失败输出信息
            showCancel: false,
          }) */
          that.setData({
            page_num: 1, //切换到注册界面
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
    console.log(that.data.page_num)
  },

  //首页获取用户信息并尝试登录
  getUserInfo: function (e) {
    var that = this
    //获取头像、昵称
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //获取openid
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/user/getOpenid',
      method: "POST",
      data: {
        js_code: app.globalData.js_code,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        if (app.globalData.is_init == false){
          app.globalData.is_init = true
          if (res.data.data.openid != null)
            app.globalData.openid = res.data.data.openid
          else /************************测试阶段无法登录时以下openid二选一******************************/
            app.globalData.openid = 'oLeWu4vfwiAvPIHrh6oHuaM-ychg'   //wjh的微信openid
            //app.globalData.openid = 'oNgc_5cCqIf4jiPpxX-5Jk0kZ3uI'   //zjh的微信openid
        } //全局信息存储
        that.login()
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          content: 'ERROR: 响应失败', //响应失败输出信息
          showCancel: false,
          //duration: 3000
        })
      }
    })

  },

  //提交注册信息
  register: function (e) {
    var that = this
    //console.log(app.globalData.openid)
    //console.log(that.data.userInfo.avatarUrl)
    //console.log(that.data.userInfo.nickName)
    //防止传空值
    if (!app.globalData.openid || !that.data.userInfo.avatarUrl || !that.data.userInfo.nickName) {
      wx.showModal({
        content: 'ERROR: 请求参数非法', //注册失败输出信息
        showCancel: false,
      });
      return
    }

    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/user/create',
      method: 'POST',
      data: {
        openid: app.globalData.openid,
        nick_name: that.data.userInfo.nickName,
        avatar_url: that.data.userInfo.avatarUrl
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        if (res.data.code == 0) {
          wx.hideLoading()
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 3000
            })
          app.globalData.user_id = res.data.data.user_id
          that.setData({
            page_num: 2, //注册成功进入身份认证界面
          })
        }
        else {
          wx.hideLoading(),
            wx.showModal({
              content: res.data.msg, //注册失败输出信息
              showCancel: false,
            });
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          content: 'ERROR: 响应失败', //响应失败输出信息
          showCancel: false,
          //duration: 3000
        })
      }
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
        id: app.globalData.user_id,
        stu_id: that.data.stu_id,
        pwd: that.data.stu_pwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data)
        if (res.data.code == 0) {
          that.setData({
            title_msg: '认证成功'
          })
          that.login() //登录
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
          //duration: 3000
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
    //console.log(this.data.index)
    //console.log(this.data.choose_index)
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
        console.log(res.data)
        that.setData({
          comment: res.data.data.comment_info,
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          content: 'ERROR: 响应失败', //响应失败输出信息
          showCancel: false,
          //duration: 3000
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
  jumpreturn_last: function (e) {
    this.setData({
      page_num: this.data.page_num - 1
    })
  },

  tourist: function (e) {
    this.login()
  }

})


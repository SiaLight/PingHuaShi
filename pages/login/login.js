// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    stu_id: null,
    stu_pwd: null,
    hasUserInfo: false,
    isTourist: true,
    page_num: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.hasLogout == true)
      return;
    var that = this
    try {
      var value = wx.getStorageSync('openid')
      console.log(value)
      if (value) {
        /*if (app.globalData.is_init == false)
          app.globalData.is_init = true;*/
        app.globalData.openid = value
        that.login();  
        return;
      }
    }
    catch (e) {
      wx.showToast({
        title: '获取本地缓存openid失败',
        icon: 'none',
        duration: 2000
      })
    }
    wx.login({
      success: res => {
        console.log(res.code)
        //获取openid
        wx.request({
          url: 'http://www.ecnucs.club:8000/service/user/getOpenid',
          method: "POST",
          data: {
            js_code: res.code,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            console.log(res.data)
            //if (app.globalData.is_init == false) {
              //app.globalData.is_init = true
              if (res.data.data.openid != null) {
                app.globalData.openid = res.data.data.openid
                wx.setStorage({
                  key: 'openid',
                  data: res.data.data.openid,
                })
              }
              else /************************测试阶段无法登录时以下openid二选一******************************/
                app.globalData.openid = 'TestOpenid'   //wjh的微信openid
                //app.globalData.openid = 'oNgc_5cCqIf4jiPpxX-5Jk0kZ3uI'   //zjh的微信openid
            //} //全局信息存储
            that.login()
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
      }
    })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.isLogin == false) {
      this.setData({
        page_num: 0,
        hasUserInfo: false,
        userInfo: {},
        stu_id: null,
        stu_pwd: null,
        isTourist: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //用户登录
  login: function (e) {
    console.log(app.globalData.openid)
    var that = this
    wx.showLoading({
      title: '登录中',
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
        console.log(res.data)
        wx.hideLoading()
        if (res.data.code == 0) {
          app.globalData.isLogin = true
          app.globalData.user_detail = res.data.data
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 3000
          })
          wx.switchTab({
            url: '../index/index',
          })
        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon:'none',
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

  //首页获取用户信息并尝试登录
  getUserInfo: function (e) {
    var that = this
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      },
      fail: res => {
        wx.showToast({
          title: '请授权获取个人信息',
          icon: 'none',
          duration: 2000
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
        title: 'ERROR',
        content: '用户信息获取失败', //注册失败输出信息
        showCancel: false,
      });
      return;
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
          if(that.data.isTourist == false)
            that.setData({
              page_num: 1
            })
          else
            that.login()
        }
        else {
          wx.hideLoading(),
          wx.showToast({ //注册失败输出信息
            title: res.data.msg,
            icon:'none',
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

  //提交身份鉴定信息
  auth_submit: function () {
    var that = this
    wx.showLoading({
      title: '认证中',
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
          wx.showToast({
            title: '认证成功',
            duration: 2000
          })
          that.login() //登录
        }
        else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
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

  student:function(e){
    if (app.globalData.hasLogout == true){
      this.setData({
        page_num: 1
      })
    }
    else{
      this.setData({
        isTourist: false
      })
      this.register()
    }
      
  },

  tourist: function (e) {
    if (app.globalData.hasLogout == true)
      this.login()
    else
      this.register()
  }


})
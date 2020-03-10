//logs.js
const util = require('../../utils/util.js')
var app=getApp();
Page({
  data: {
      teachers:[],
      image:"../../images/tea.png",
      serachTeacher:[],
      len:0
  },
  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
    var that = this;
      that.setData({
          inputVal: e.detail.value
      });
      wx.request({
        url: 'http://www.ecnucs.club:8000/service/teacher/listTeacher', /*修改more_coursecmt即可*/
        method: 'POST',
        data: { /*根据接口需要选择需要POST的数据*/
          name: that.data.inputVal
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            serachTeacher: res.data.data.teachers,
            len: res.data.data.count
          })
          console.log(that.data.serachTeacher);
        }
      })
  },
  onLoad: function(options){
    console.log(options);
    var that = this;
    that.setData({
      id: options.id
    })
    that.listTeacher();
  },

  listTeacher:function(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/teacher/listTeacher', /*修改more_coursecmt即可*/
      method: 'POST',
      data: { /*根据接口需要选择需要POST的数据*/
        deptId: that.data.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        console.log(res.data);
        that.setData({
          teachers: res.data.data.teachers
        })
        if (res.data.data.teachers.length == 0)
          wx.showToast({
            title: '无记录',
            icon: 'none'
          })
        console.log(that.data.teachers);
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

  onPullDownRefresh: function () {
    this.listTeacher();
  },

  change: function(e){
    wx.navigateTo({
      url:'../teacherDetail/teacherDetail?id='+e.currentTarget.dataset.id
    })
  }

});

//logs.js
const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    course: [],
    image: "../../images/course.png",
    serachCourse: [],
    len: 0,
    pid: 0,
    professions: [],
    index: 0
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
    this.setData({
      inputVal: e.detail.value
    });
    let index = that.data.index
    let data
    if (index == 0) {
      data = {
        course_name: that.data.inputVal,
        course_type: that.data.type
      }
    }
    else {
      data = {
        course_name: that.data.inputVal,
        course_type: that.data.type,
        course_proId: [that.data.professions[index].id]
      }
    }
    wx.request({
      url: app.globalData.rootDomain + '/service/course/listCourse', /*修改more_coursecmt即可*/
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          serachCourse: res.data.data.courses,
          len: res.data.data.count
        })
        console.log(that.data.serachCourse);
      }
    })
  },
  courseList: function () {
    wx.navigateTo({
      url: '../courseList/courseList'
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      type: options.type,
      index: options.pindex,
      pid: options.pid,
    })
    that.getAllType();
    that.listCourse();
  },

  onPullDownRefresh: function () {
    this.listCourse();
  },

  listCourse: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    let data
    if (that.data.index == 0 || that.data.type == '计算机类' || that.data.type == '英语类' || that.data.type == '思政类' || that.data.type == '体育类' || that.data.type == '其他类别课程' ) {
      data = {
        course_type: that.data.type
      }
    }
    else {
      data = {
        course_type: that.data.type,
        course_proId: [that.data.pid]
      }
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.rootDomain + '/service/course/listCourse', /*修改more_coursecmt即可*/
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        that.setData({
          course: res.data.data.courses
        })
        if (res.data.data.courses.length == 0)
          wx.showToast({
            title: '无记录',
            icon: 'none'
          })
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

  change: function (e) {
    wx.navigateTo({
      url: '../courseDetail/courseDetail?courseId=' + e.currentTarget.dataset.courseId
    })
  },
  getAllType: function () {
    let self = this
    if (self.data.type == '计算机类' || self.data.type == '英语类' || self.data.type == '思政类' || self.data.type == '体育类' || self.data.type == '其他类别课程' ){
      let professions = [
        {
          name: '不限专业',
          id: 0
        }
      ]
      self.setData({
        professions: professions
      })
      return
    }
    wx.request({
      url: app.globalData.rootDomain + '/service/teacher/listProfession',
      method: 'POST',
      success: function (res) {
        let professions = res.data.data.professions
        let all = {
          name: '不限专业',
          id: 0
        }
        professions.splice(0, 0, all)
        self.setData({
          professions: professions
        })
      },
      fail: function (err) {
      }

    })

  },
  typeChange: function (e) {
    var that = this
    let index = e.detail.value
    this.setData({
      index: index,
      pid: that.data.professions[index].id
    })
   that.listCourse()

  }

});

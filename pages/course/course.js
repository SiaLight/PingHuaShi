//logs.js
const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    serachCourse: [],
    len: 0,
    course: [
      {
        title: "专业必修课程",
        image: "../../images/course.png"
      },
      {

        title: "专业选修课程",
        image: "../../images/course.png"
      },
      {
        title: "通识必修课程",
        image: "../../images/course.png"
      },
      {
        title: "通识精品课程",
        image: "../../images/course.png"
      },
      {
        title: "通识选修课程",
        image: "../../images/course.png"
      },
      {
        title: "体育类课程",
        image: "../../images/course.png"
      },


    ]
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
      url: 'http://www.ecnucs.club:8000/service/course/listCourse', /*修改more_coursecmt即可*/
      method: 'POST',
      data: { /*根据接口需要选择需要POST的数据*/
        course_name: that.data.inputVal
      },
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
  move: function (e) {
    wx.navigateTo({
      url: '../courseList/courseList?type=' + e.currentTarget.dataset.type,
    });
  },
  change: function (e) {
    wx.navigateTo({
      url: '../courseDetail/courseDetail?courseId=' + e.currentTarget.dataset.id
    })
  }
});

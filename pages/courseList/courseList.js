//logs.js
const util = require('../../utils/util.js')
var app=getApp();
Page({
  data: {
      course:[],
      image:"../../images/course.png",
      serachCourse:[],
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
      this.setData({
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
  courseList: function(){
    wx.navigateTo({
      url: '../courseList/courseList'
     })
  },
  onLoad: function(options){
    console.log(options);
    var that = this;
    that.setData({
      type: options.type
    })
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/course/listCourse', /*修改more_coursecmt即可*/
      method: 'POST',
      data: { /*根据接口需要选择需要POST的数据*/
        course_type: that.data.type,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          course: res.data.data.courses
        })
        console.log(that.data.course);
      }
    })
  },
  change: function(e){
    wx.navigateTo({
      url:'../courseDetail/courseDetail?courseId='+e.currentTarget.dataset.courseId
    })
  }

});

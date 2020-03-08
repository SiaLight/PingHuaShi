const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    colleage: [],
    image: "../../images/xueyuan.png",
    serachTeacher: [],
    len: 0
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
  collegeList: function () {
    wx.navigateTo({
      url: '../courseList/courseList'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://www.ecnucs.club:8000/service/teacher/listDept', /*修改more_coursecmt即可*/
      method: 'POST',
      data: { /*根据接口需要选择需要POST的数据*/

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          colleage: res.data.data.depts
        })
        console.log(that.data.colleage);
      }
    })
  },
  move: function (e) { /************函数名改动**************/
    wx.navigateTo({
      url: '../teacherList/teacherList?id=' + e.currentTarget.dataset.id
    })
  },
  change: function (e) { /************函数名改动**************/
    wx.navigateTo({
      url: '../teacherDetail/teacherDetail?id=' + e.currentTarget.dataset.id
    })
  }

});
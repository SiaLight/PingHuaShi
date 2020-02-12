//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
      teachers:[],
      image:"../../images/course.png"
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
      this.setData({
          inputVal: e.detail.value
      });
  },
  onLoad: function(options){
    console.log(options);
    var that = this;
    that.setData({
      id: options.id
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
        console.log(res.data);
        that.setData({
          teachers: res.data.data.teachers
        })
        console.log(that.data.teachers);
      }
    })
  },
  change: function(e){
    wx.navigateTo({
      url:'../teacherDetail/teacherDetail?id='+e.currentTarget.dataset.id
    })
  }

});

//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
      inputShowed: false,
      inputVal: "",
      colleage:[],
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
  collegeList: function(){
    wx.navigateTo({
      url: '../courseList/courseList'
     })
  },
  onLoad: function(){
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
  change: function(e){
    wx.navigateTo({
      url:'../teacherList/teacherList?id='+e.currentTarget.dataset.id
    })
  }
});

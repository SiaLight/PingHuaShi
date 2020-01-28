//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
      inputShowed: false,
      inputVal: "",
      course:[
        {
          title: "软件工程",
          image:"../../images/course.png"
        },
        {
          title: "信息学部",
          image:"../../images/course.png"
        },
        {
          title: "通识精品课程",
          image:"../../images/course.png"
        },  
        {
          title: "通识选修课程",
          image:"../../images/course.png"
        }, 
         {
          title: "体育类课程课程",
          image:"../../images/course.png"
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
      this.setData({
          inputVal: e.detail.value
      });
  },
  collegeList: function(){
    wx.navigateTo({
      url: '../courseList/courseList'
     })
  }
});

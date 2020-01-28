//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
      course:[
        {
          title: "操作系统",
          image:"../../images/course.png"
        },
        {
          title: "编译原理",
          image:"../../images/course.png"
        },
        {
          title: "计算机网络",
          image:"../../images/course.png"
        },  
        {
          title: "人工智能",
          image:"../../images/course.png"
        }, 
         {
          title: "数据库系统原理",
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
  courseList: function(){
    wx.navigateTo({
      url: '../courseList/courseList'
     })
  }
});

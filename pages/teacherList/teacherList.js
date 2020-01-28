//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
      course:[
        {
          title: "彭超",
          image:"../../images/course.png"
        },
        {
          title: "张静",
          image:"../../images/course.png"
        },
        {
          title: "卜天明",
          image:"../../images/course.png"
        },  
        {
          title: "姜宁康",
          image:"../../images/course.png"
        }, 
         {
          title: "全哄妍",
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

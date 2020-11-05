//logs.js
const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    serachCourse: [],
    len: 0,
    professions:[],
    index:0,
    role: 1,
    course: [
      {
        title: "学科基础课程",
        image: "../../images/course.png"
      },
      {
        title: "专业教育课程",
        image: "../../images/course.png"
      },
      {
        title: "计算机类",
        image: "../../images/course.png"
      },
      {
        title: "英语类",
        image: "../../images/course.png"
      },
      {
        title: "思政类",
        image: "../../images/course.png"
      },
      {
        title: "体育类",
        image: "../../images/course.png"
      },
      {
        title: "其他类别课程",
        image: "../../images/course.png"
      },
    ]
  },
  onLoad:function(){
    
    this.getAllType()
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
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
    let index = that.data.index
    let data
    if(index==0)
    {
      data={
        course_name: that.data.inputVal
      }
    }
    else{
      data={
        course_name: that.data.inputVal,
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
  move: function (e) {
    wx.navigateTo({
      url: '../courseList/courseList?type=' + e.currentTarget.dataset.type + '&pindex=' + this.data.index + '&pid=' + this.data.professions[this.data.index].id,
    });
  },
  change: function (e) {
    wx.navigateTo({
      url: '../courseDetail/courseDetail?courseId=' + e.currentTarget.dataset.id 
    })

  },
  onShow:function(){
    var k = app.globalData.stu_pro_index
    this.setData({
      index: k,
      role: app.globalData.user_detail.role
    })
    console.log(this.data.index)
  },

  getAllType:function(){
    let self = this
   
    wx.request({
      url:app.globalData.rootDomain + '/service/teacher/listProfession',
      method:'POST',
      success:function(res){
        console.log('zhuanye')
        console.log(res)
        let professions = res.data.data.professions
        let all={
          name:'不限专业',
          id:0
        }
        professions.splice(0,0,all)
        self.setData({
          professions:professions,
          
        })
        console.log(self.data.index)
        
      },
      fail:function(err){
        console.log(err)

      }

    })

  },
  typeChange:function(e){
    let index =  e.detail.value
  this.setData({
      index:index
  })

},
addcourse:function(){
  wx.navigateTo({
    url: '../addCourse/addCourse',
  });
},

addteaching: function () {
  wx.navigateTo({
    url: '../addTeaching/addTeaching',
  });
},
});

// pages/addTeaching/addTeaching.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    serachCourse: [],
    len: 0,
    index: 0,
    professions: [],

    inputShowed2: false,
    inputVal2: "",
    colleage: [],
    serachTeacher: [],

    final_course_id: 0,
    final_teacher_id: 0

  },
  onLoad: function () {
    this.getAllType()
  },
  typeChange: function (e) {
    let index = e.detail.value
    this.setData({
      index: index
    })
  },

  getAllType: function () {
    let self = this
    wx.request({
      url: app.globalData.rootDomain + '/service/teacher/listProfession',
      method: 'POST',
      success: function (res) {
        console.log('zhuanye')
        console.log(res)
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
        console.log(err)

      }

    })

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
    if (index == 0) {
      data = {
        course_name: that.data.inputVal
      }
    }
    else {
      data = {
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

  showInput2: function () {
    this.setData({
      inputShowed2: true
    });
  },
  hideInput2: function () {
    this.setData({
      inputVal2: "",
      inputShowed2: false
    });
  },
  clearInput2: function () {
    this.setData({
      inputVal2: ""
    });
  },
  inputTyping2: function (e) {
    var that = this;
    this.setData({
      inputVal2: e.detail.value
    });

    wx.request({
      url: app.globalData.rootDomain + '/service/teacher/listTeacher', /*修改more_coursecmt即可*/
      method: 'POST',
      data: { /*根据接口需要选择需要POST的数据*/
        name: that.data.inputVal2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          serachTeacher: res.data.data.teachers,
          len2: res.data.data.count
        })
        console.log(that.data.serachTeacher);
      }
    })
  },

  
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  change:function(e){
    var id = e.currentTarget.dataset.id
    this.setData({
      final_course_id: id,
      serachCourse: [],
      inputVal: e.currentTarget.dataset.name
    })
  },

  change2: function (e) {
    var id = e.currentTarget.dataset.id
    this.setData({
      final_teacher_id: id,
      serachTeacher: [],
      inputVal2: e.currentTarget.dataset.name
    })
  },

  add: function () {
    let self = this
    

    if (self.data.final_course_id == 0) {
      self.showModel('请选择课程')
      return
    }
    if (self.data.final_teacher_id == 0) {
      self.showModel('请选择授课教师')
      return
    }
    wx.showModal({
      content: '确定添加该授课教师？',
      success(res){
        if(res.confirm){
    
    wx.request({
      url: app.globalData.rootDomain + '/service/course/addTeaching',
      method: 'POST',
      data: {
        course_id: self.data.final_course_id,
        teacher_id: self.data.final_teacher_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000,
            success(res) {
              setTimeout(function () {
                wx.navigateBack({

                })
              }, 1000)
            }
          })
          self.setData({
            inputShowed: false,
            inputVal: "",
            serachCourse: [],
            len: 0,
            index: 0,
            inputShowed2: false,
            inputVal2: "",
            colleage: [],
            serachTeacher: [],
            final_course_id: 0,
            final_teacher_id: 0
          })
          wx.showToast({
            title: '添加成功',
            icon: 'none',   
            duration: 2000,
            success(res) {
              setTimeout(function () {
                wx.navigateBack({

                })
              }, 1000)
            }    
          })
        }
        else {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 2000
        })
      }
      })
    }
    }
    })

  },
  
})
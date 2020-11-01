var app=getApp();
Page({
    data:{
        courses:[],
        comment:{},
        teacher:[],
        isFold:"展开",
        ellipsis: true,
        isCard: false,
        commentL:0,
        courseL:0,
        isCourse:true,
        nCourse: false,
    },
    onShow: function (e){
      console.log(app.globalData.user_detail)
      this.setData({
        user_id: app.globalData.user_detail.user_id
      })
      this.showAll();
    },
    onLoad: function(options){
        console.log(options);
        var that = this;
        that.setData({
          id: options.id,
        })
    },

    showAll: function (e){
      var that = this;
      wx.request({
        url: app.globalData.rootDomain + '/service/teacher/listTeacher', /*修改more_coursecmt即可*/
        method: 'POST',
        data: { /*根据接口需要选择需要POST的数据*/
          id: that.data.id,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.data.teachers.length > 0){
            var tea = res.data.data.teachers[0];
            if (tea.avatar_url == "") {
              tea.avatar_url = "../../images/teacher.png"
            }
            that.setData({
              teacher: res.data.data.teachers[0]
            })
          }
          
          console.log(that.data.teacher);
        }
      })
      that.requestCourse();
      that.requestComment();
    },  
      
    onPullDownRefresh: function (e) {
      this.showAll();
    },

    requestCourse: function(){
        var that = this;
        wx.request({
            url: app.globalData.rootDomain + '/service/course/course_teaching', /*修改more_coursecmt即可*/
            method: 'POST',
            data: { /*根据接口需要选择需要POST的数据*/
              res_id: that.data.id,
              res_type: '教师'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data);
              var x = res.data.data.courses.length;
              if(x > 0)
              that.setData({
                courses: res.data.data.courses,
                courseL: x
              })
              console.log(that.data.courses);
            },
            fail: function () {
             console.log("error");
             wx.showModal({
               title: 'ERROR',
               content: '响应失败', //响应失败输出信息
               showCancel: false,
             })
            }
            
          })
      },
    requestComment: function(){
      var that = this;
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.rootDomain + '/service/comment/more_comment', /*修改more_coursecmt即可*/
        method: 'POST',
        data: { /*根据接口需要选择需要POST的数据*/
          res_id: that.data.id,
          res_type: '教师'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          console.log(res.data);
          var x= res.data.data.comment_info.length;
          if(x > 0)
            that.setData({
                comment: res.data.data.comment_info[0],
                commentL: x
              })
        
          console.log(that.data.comment);
        },
        fail: function () {
          console.log("error");
          wx.showModal({
            title: 'ERROR',
            content: '响应失败', //响应失败输出信息
            showCancel: false,
          })
        }
      })
  },
  grade: function(e){
    wx.navigateTo({
      url:'../grade/grade?id='+e.currentTarget.dataset.id+'&isCourse='+e.currentTarget.dataset.isCourse
    })
  },
  moreComment: function(e){
    wx.navigateTo({
      url:'../allCourseComment/allCourseComment?id='+e.currentTarget.dataset.id+'&isCourse='+e.currentTarget.dataset.isCourse
    })
  },
  showTeacherIndex:function(e){
    //var idx = e.currentTarget.dataset.teacheridx
    var url = this.data.teacher.index_url
      wx.navigateTo({
        url: '../teacherIndex/teacherIndex?url=' + url,
      })
  },

  copyIndex: function (e) {
    wx.setClipboardData({
      data: this.data.teacher.index_url,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          duration: 2000
        })
      }
    })
  }

})
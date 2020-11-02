var app=getApp();

Page({
    data:{
        course:{},
        comment:{},
        teachers:[],
        isFold:"展开",
        ellipsis: true,
        isCard: false,
        isCourse:true,
        nCourse: false,
        commentL:0,
        teacherL:0

    },

    move: function(){
        var value = !this.data.ellipsis;
        this.setData({
          ellipsis: value
        });
        if(this.data.ellipsis){
            this.setData({
                isFold: "展开"
              }) ;
        }
        else{
            this.setData({
                isFold: "收起"
              }) 
        }
    },
    onShow: function (e){
      console.log(app.globalData.user_detail)
      this.setData({
        user_id: app.globalData.user_detail.user_id
      })
      this.showAll(); 
    },

    onPullDownRefresh:function(e){
      this.showAll(); 
    },

    showAll:function(e){
      var that = this;
      wx.request({
        url: app.globalData.rootDomain + '/service/course/listCourse', /*修改more_coursecmt即可*/
        method: 'POST',
        data: { /*根据接口需要选择需要POST的数据*/
          course_id: that.data.courseId,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.code == 0 && res.data.data.courses.length>0)
            that.setData({
              course: res.data.data.courses[0]
            })
            else
            that.setData({
              course: {}
            })
          console.log(that.data.course);
          that.requestTeacher();
          that.requestComment();
        }
      })
    },

    onLoad: function(options){
        console.log(options);
        var that = this;
        var x= parseInt(options.courseId);
        that.setData({
            courseId: options.courseId,
        })   
      },

      requestTeacher: function(){
          var that = this;
          wx.request({
            url: app.globalData.rootDomain + '/service/course/course_teaching', /*修改more_coursecmt即可*/
            method: 'POST',
            data: { /*根据接口需要选择需要POST的数据*/
              res_id: that.data.courseId,
              res_type: '课程'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data);
              var x= res.data.data.teachers.length;
              that.setData({
                teachers: res.data.data.teachers,
                teacherL: x
              })
              console.log(that.data.teachers);
            },
            fail: function(){
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
            res_id: that.data.courseId,
            res_type: '课程'
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
          fail: function(){
            console.log("error");
            wx.showModal({
              title: 'ERROR',
              content: '响应失败', //响应失败输出信息
              showCancel: false,
            })
          }
          
        })
      }, 
      moreComment: function(e){
        wx.navigateTo({
          url:'../allCourseComment/allCourseComment?id='+e.currentTarget.dataset.id+'&isCourse='+e.currentTarget.dataset.isCourse
        })
      },
      grade: function(e){
        if (app.globalData.user_detail.role == 1){
          wx.showToast({
            title: '请先认证',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        wx.navigateTo({
          url:'../grade/grade?id='+e.currentTarget.dataset.id+'&isCourse='+e.currentTarget.dataset.isCourse
        })
      }
})
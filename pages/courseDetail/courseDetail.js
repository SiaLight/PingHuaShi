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
        if(this.ellipsis){
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
    },
    onLoad: function(options){
        console.log(options);
        var that = this;
        var x= parseInt(options.courseId);
        that.setData({
            courseId: options.courseId,
        })
        wx.request({
          url: 'http://www.ecnucs.club:8000/service/course/listCourse', /*修改more_coursecmt即可*/
          method: 'POST',
          data: { /*根据接口需要选择需要POST的数据*/
            course_id: that.data.courseId,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              course: res.data.data.courses[0]
            })
            console.log(that.data.course);
            that.requestTeacher();
            that.requestComment();
          }
        })
        
      },
      requestTeacher: function(){
          var that = this;
        wx.request({
            url: 'http://www.ecnucs.club:8000/service/course/course_teaching', /*修改more_coursecmt即可*/
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
            error: function(){
                console.log("error");
            }
            
          })
      },
      requestComment: function(){
        var that = this;
      wx.request({
          url: 'http://www.ecnucs.club:8000/service/comment/more_comment', /*修改more_coursecmt即可*/
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
            var x= res.data.data.comment_info.length;
            that.setData({
              comment: res.data.data.comment_info[0],
              commentL: x

            })
            console.log(that.data.comment);
          },
          error: function(){
              console.log("error");
          }
          
        })
    },
      moreComment: function(e){
        wx.navigateTo({
          url:'../allCourseComment/allCourseComment?id='+e.currentTarget.dataset.id+'&isCourse='+e.currentTarget.dataset.isCourse
        })
      },
      grade: function(e){
        wx.navigateTo({
          url:'../grade/grade?id='+e.currentTarget.dataset.id+'&isCourse='+e.currentTarget.dataset.isCourse
        })
      }
})
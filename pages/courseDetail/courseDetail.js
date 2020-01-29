Page({
    data:{
        course:{} ,
        comment:{},
        teachers:[],
        isFold:"展开",
        ellipsis: true,
        isCard: false

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
    onLoad: function(options){
        console.log(options);
        var that = this;
        that.setData({
          courseType: options.courseType,
          courseName: options.courseName
        })
        wx.request({
            url: 'http://www.ecnucs.club:8000/service/course/course_select', /*修改more_coursecmt即可*/
            method: 'POST',
            data: { /*根据接口需要选择需要POST的数据*/
              course_type: that.data.courseType,
              course_name: that.data.courseName
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data);
              var len =  res.data.data.length;
              var tea= [];
              for(var i=2;i<len;i++){
                  tea.push(res.data.data[i]);
              }
              that.setData({
                course: res.data.data[0],
                comment:  res.data.data[1][0],
                teachers: tea
            })
            console.log(that.data.teachers);      
            }
          })
    },
    moreComment: function(e){
       wx.navigateTo({
            url: '../allCourseComment/allCourseComment?courseType='+e.currentTarget.dataset.courseType+'&courseName='+e.currentTarget.dataset.courseName,
            success: (result)=>{
                console.log("success");
            }
        });
    }


})
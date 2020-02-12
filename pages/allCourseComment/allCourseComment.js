var app=getApp();
Page({
    data:{
        comment:[],
        isFold:"展开",
        ellipsis: true,
        isCard: false

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
        var x= parseInt(options.id);
        that.setData({
            id: options.id,
            isCourse:  options.isCourse,
        })
        if(that.data.isCourse=="true")
        {
          that.courseC();
        }
        else{
          that.teacherC();
        }
       

    },
    courseC:function(){
      var that = this;
      wx.request({
        url: 'http://www.ecnucs.club:8000/service/comment/more_comment', /*修改more_coursecmt即可*/
        method: 'POST',
        data: { /*根据接口需要选择需要POST的数据*/
          res_id: that.data.id,
          res_type: '课程'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            comment: res.data.data.comment_info
          })
          console.log(that.data.comment);
        },
        falied: function(){
            console.log("error");
        }
        
      })
    },
    teacherC:function(){
      var that = this;
      wx.request({
        url: 'http://www.ecnucs.club:8000/service/comment/more_comment', /*修改more_coursecmt即可*/
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
          that.setData({
            comment: res.data.data.comment_info
          })
          console.log(that.data.comment);
        },
        falied: function(){
            console.log("error");
        }
        
      })
    }

})
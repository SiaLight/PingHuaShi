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

    onPullDownRefresh:function(e){
      var that = this
      if (that.data.isCourse == "true") {
        that.courseC();
      }
      else {
        that.teacherC();
      }
    },

    courseC:function(){
      var that = this;
      wx.showLoading({
        title: '加载中',
      })
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
          wx.stopPullDownRefresh();
          wx.hideLoading()
          console.log(res.data);
          that.setData({
            comment: res.data.data.comment_info
          })
          if (res.data.data.comment_info.length == 0)
            wx.showToast({
              title: '无记录',
              icon: 'none'
            })
          console.log(that.data.comment);
        },
        falied: function(){
          console.log("error");
          wx.hideLoading()
          wx.showModal({
            title: 'ERROR',
            content: '响应失败', //响应失败输出信息
            showCancel: false,
          })
        }
        
      })
    },
    teacherC:function(){
      var that = this;
      wx.showLoading({
        title: '加载中',
      })
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
          wx.stopPullDownRefresh();
          wx.hideLoading();
          console.log(res.data);
          that.setData({
            comment: res.data.data.comment_info
          })
          if (res.data.data.comment_info.length == 0)
            wx.showToast({
              title: '无记录',
              icon: 'none'
            })
          console.log(that.data.comment);
        },
        falied: function(){
          console.log("error");
          wx.hideLoading()
          wx.showModal({
            title: 'ERROR',
            content: '响应失败', //响应失败输出信息
            showCancel: false,
          })
        }
        
      })
    }

})
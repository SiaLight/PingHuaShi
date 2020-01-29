Page({
    data:{
        comment:[],
        isFold:"展开",
        ellipsis: true,
        isCard: false

    },
    onLoad: function(options){
        console.log(options);
        var that = this;
        that.setData({
          courseType: options.courseType,
          courseName: options.courseName
        })
        wx.request({
          url: 'http://www.ecnucs.club:8000/service/course/more_coursecmt', /*修改more_coursecmt即可*/
          method: 'POST',
          data: { /*根据接口需要选择需要POST的数据*/
            course_type: that.data.courseType,
            course_name:  that.data.courseName
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            var len = res.data.data.length;
            var x= [];
            for(var i=0;i<len;i++)
            {
                x.push(res.data.data[i][0]);
            }
 
            that.setData({
                comment:x
            })
        
          }
        })
      }

})
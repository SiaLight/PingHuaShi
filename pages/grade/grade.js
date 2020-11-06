var app=getApp();
Page({
    data:{
        maxWords:200,
        currentWords: 0,
        id: 0,
        isCourse: true,
        fullStarUrl: '../../images/star/star_full.png', //满星图片
        nullStarUrl: '../../images/star/star_grey.png', //空星图片
        score: 0, //评价分数
        scoreArray: [1, 2, 3, 4, 5], //分为1-5个评分层次
        scoreText: ['1星', '2星', '3星', '4星', '5星'], //评分列表
        scoreContent: '',
        comment:'' ,//文字显示评分情况
        hasAnonymity: 0
    },
    onShow: function (e){
      console.log(app.globalData.user_detail)
      this.setData({
        user: app.globalData.user_detail
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
    },
    changeScore: function(e) {
        console.log(e)//控制台触摸事件信息
        
        var that = this;
        var num = 0;//临时数字,动态确定要传入的分数
        var touchX = e.touches[0].pageX;//获取当前触摸点X坐标
        var starMinX = 55;//最左边第一颗星的X坐标,假设距离页面距离为0
        var starWidth = 30;//星星图标的宽度,假设30(已在wxss文件中设置".star")
        var starLen = 10;//星星之间的距离假设为10(已在wxss文件中设置".starLen")
        var starMaxX = starWidth * 5 + starLen * 4+starMinX;//最右侧星星最右侧的X坐标,需要加上5个星星的宽度和4个星星间距
    
        if (touchX > starMinX && touchX < starMaxX) {//点击及触摸的初始位置在星星所在空间之内
        //使用Math.ceil()方法取得当前触摸位置X坐标相对于(星星+星星间距)之比的整数,确定当前点击的是第几个星星
          num = Math.ceil((touchX - starMinX) / (starWidth + starLen));
          if (num != that.data.score) {//如果当前得分不等于刚设置的值,才赋值,因为touchmove方法刷新率很高,这样做可以节省点资源
            that.setData({
              score: num,
              scoreContent: that.data.scoreText[num - 1]
            })
          }
        } else if (touchX < starMinX) {//如果点击或触摸位置在第一颗星星左边,则恢复默认值,否则第一颗星星会一直存在
          that.setData({
            score: 0,
            scoreContent: ''
          })
        }
      },
      input: function(e){
        var value = e.detail.value;
        // 获取输入框内容的长度
        var len = parseInt(value.length);
        //字数限制
        if (len > this.data.maxWords) {
          wx.showToast({
            title: '字数超出限制',
            icon: 'none'
          })
          return;
        }
        this.setData({
            currentWords: len,
            comment: value
        })
      },

      submit: function(){
          if(this.data.isCourse=="true"){
              this.courseC();
          }
          else{
              this.teacherC();
          }

      },
      courseC:function(){
        var that = this;
        if (that.data.score == 0) {
          wx.showToast({
            title: '请划动星星进行评分',
            icon: 'none'
          })
          return;
        }
        if (that.data.currentWords == 0){
          wx.showToast({
            title: '请输入内容',
            icon: 'none'
          })
          return;
        }
        wx.showModal({
          content: '确定提交评论？',
          success(res){
            if(res.confirm){
              wx.request({
                url: app.globalData.rootDomain + '/service/comment/submit_comment', /*修改more_coursecmt即可*/
                method: 'POST',
                data: { /*根据接口需要选择需要POST的数据*/
                  res_id: that.data.id,
                  res_type: '课程',
                  user_id: that.data.user.user_id,
                  score: that.data.score * 2,
                  comment: that.data.comment,
                  show_user: that.data.hasAnonymity ^ 1
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res.data);
                  that.show(res.data);
                },
                falied: function () {
                  console.log("error");
                }

              })    
            }
          }
        })
        
      },
      teacherC:function(){
        var that = this;
        wx.request({
          url: app.globalData.rootDomain + '/service/comment/submit_comment', /*修改more_coursecmt即可*/
          method: 'POST',
          data: { /*根据接口需要选择需要POST的数据*/
            res_id: that.data.id,
            res_type: '教师',
            user_id: that.data.user.user_id,
            score: that.data.score*2,
            comment: that.data.comment,
            show_user: that.data.hasAnonymity ^ 1
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            that.show(res.data);
          },
          falied: function(){
              console.log("error");
          }
          
        })    
      },
      show: function(e){
          if(e.code<0){
            wx.showModal({
              content: e.msg,
              showCancel:false
            })
          }
          else{
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000,
              success(res){
                var pages = getCurrentPages(); //当前页面
                var beforePage = pages[pages.length - 2]; //前一页
                setTimeout(function () {
                  wx.navigateBack({
                    success: function () {
                      //beforePage.onShow(); // 执行前一个页面的onLoad方法
                    }
                  });
                }, 1000)
                
              }
            });
          }
      },

  noAnonymity: function () {
    this.setData({
      hasAnonymity: 0
    })
  },

  doAnonymity: function () {
    this.setData({
      hasAnonymity: 1
    })
  },




})
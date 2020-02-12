
var count=0;
Component({
    properties: {
    
      comment:{
          type: JSON
      },
      card:{
          type:Boolean
      },
      userId:{
        type:Number
      }
    },
    data: {
        isCard: true,
        isStar: true,
        zan:[],
        cai:[],
        agreeUrl:'../../images/zan.png',
        disAgreeUrl:'../../images/cai.png'

      
    },
    // 组件生命周期
    lifetimes: {
      attached () {
        console.log('attach');
        console.log(this.data.comment);
        var id= this.data.comment.comment_id;
        if(this.data.zan.includes(id)){
          this.setData({
            agreeUrl: '../../images/zan-active.png'
          })
        };
        if(this.data.cai.includes(id)){
          this.setData({
            disAgreeUrl: '../../images/cai-active.png'
          })
        }
      },
      detached () {
  
      }
    },
    // 兼容v2.2.3以下写法
    attached () {
  
    },
    // 挂载页面的生命周期
    pageLifetimes: {
    },
    methods: {
      agree:function(){
        var that= this;
        console.log(that);
        var id= that.data.comment.comment_id;
        var x = that.data.zan;
        if(that.data.zan.includes(id)){

          wx.showModal({
            title: '提示',
            content: '确定取消赞同吗？',
            confirmText: "确定",
            cancelText: "取消",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                  wx.request({
                    url: 'http://www.ecnucs.club:8000/service/comment/favor_comment', /*修改more_coursecmt即可*/
                    method: 'POST',
                    data: { /*根据接口需要选择需要POST的数据*/
                       comment_id: that.data.comment.comment_id,
                       isfavor_coursecmt: -1,
                       isoppose_coursecmt: 0,
                       user_id: that.data.userId
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                       if(res.data.code==0){
                        var index = x.indexOf(id);
                        x.splice(index, 1);
                        that.setData({
                         agreeUrl: '../../images/zan.png',
                         zan: x
                       })
                       }
                    },
                    failed: function(res){
                        console.log(res)
                    }
                  })
                }else{
                    console.log('用户点击辅助操作')
                }
            }
        });

        }
        else{
          wx.request({
            url: 'http://www.ecnucs.club:8000/service/comment/favor_comment', /*修改more_coursecmt即可*/
            method: 'POST',
            data: { /*根据接口需要选择需要POST的数据*/
               comment_id: that.data.comment.comment_id,
               isfavor_coursecmt: 1,
               isoppose_coursecmt: 0,
               user_id: that.data.userId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if(res.data.code==0){
                x.push(id);
          that.setData({
            agreeUrl: '../../images/zan-active.png',
            zan: x
          })
              }
            },
            failed: function(res){
                console.log(res)
            }
          })
        }
      },
    disagree:function(){
      var that= this;
      var id= that.data.comment.comment_id;
      var x = that.data.cai;
      if(that.data.cai.includes(id)){
        wx.showModal({
          title: '提示',
          content: '确定取消赞同吗？',
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.request({
                  url: 'http://www.ecnucs.club:8000/service/comment/favor_comment', /*修改more_coursecmt即可*/
                  method: 'POST',
                  data: { /*根据接口需要选择需要POST的数据*/
                     comment_id: that.data.comment.comment_id,
                     isfavor_coursecmt: 0,
                     isoppose_coursecmt: -1,
                     user_id: that.data.userId
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    console.log(res.data);
                    if(res.data.code==0){
                      var index = x.indexOf(id);
                   x.splice(index, 1);
                that.setData({
                  disAgreeUrl: '../../images/cai.png',
                  cai:x
                })
                    }
                  },
                  failed: function(res){
                      console.log(res)
                  }
                })
              }
              else{
                wx.request({
                  url: 'http://www.ecnucs.club:8000/service/comment/favor_comment', /*修改more_coursecmt即可*/
                  method: 'POST',
                  data: { /*根据接口需要选择需要POST的数据*/
                     comment_id: that.data.comment.comment_id,
                     isfavor_coursecmt: 0,
                     isoppose_coursecmt: -1,
                     user_id:that.data.userId
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    console.log(res.data);
                    if(res.data.code==0){
                      x.push(id);
                      that.setData({
                        disAgreeUrl: '../../images/cai-active.png',
                        cai:x
                      })
      

                    }
                  },
                  failed: function(res){
                      console.log(res)
                  }
                })
              }
            }
          })

        
      }
    }
  }
  })
  
  
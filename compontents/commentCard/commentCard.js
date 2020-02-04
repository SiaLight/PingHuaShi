
var count=0;
Component({
    properties: {
    
      comment:{
          type: JSON
      },
      card:{
          type:Boolean
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
          wx.request({
            url: 'http://www.ecnucs.club:8000/service/course/favor_comment', /*修改more_coursecmt即可*/
            method: 'POST',
            data: { /*根据接口需要选择需要POST的数据*/
               comment_id: that.data.comment.comment_id,
               isfavor_coursecmt: -1,
               isoppose_coursecmt: 0
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data);
            },
            failed: function(res){
                console.log(res)
            }
          })
          var index = x.indexOf(id);
           x.splice(index, 1);
           that.setData({
            agreeUrl: '../../images/zan.png',
            zan: x
          })

        }
        else{
          wx.request({
            url: 'http://www.ecnucs.club:8000/service/course/favor_comment', /*修改more_coursecmt即可*/
            method: 'POST',
            data: { /*根据接口需要选择需要POST的数据*/
               comment_id: that.data.comment.comment_id,
               isfavor_coursecmt: 1,
               isoppose_coursecmt: 0
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data);
            },
            failed: function(res){
                console.log(res)
            }
          })
          x.push(id);
          that.setData({
            agreeUrl: '../../images/zan-active.png',
            zan: x
          })
        }
      },
    disagree:function(){
      var that= this;
      var id= that.data.comment.comment_id;
      var x = that.data.cai;
      if(that.data.cai.includes(id)){
        wx.request({
          url: 'http://www.ecnucs.club:8000/service/course/favor_comment', /*修改more_coursecmt即可*/
          method: 'POST',
          data: { /*根据接口需要选择需要POST的数据*/
             comment_id: that.data.comment.comment_id,
             isfavor_coursecmt: 0,
             isoppose_coursecmt: -1
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
          },
          failed: function(res){
              console.log(res)
          }
        })
         var index = x.indexOf(id);
           x.splice(index, 1);
        that.setData({
          disAgreeUrl: '../../images/cai.png',
          cai:x
        })
      }
      else{
        wx.request({
          url: 'http://www.ecnucs.club:8000/service/course/favor_comment', /*修改more_coursecmt即可*/
          method: 'POST',
          data: { /*根据接口需要选择需要POST的数据*/
             comment_id: that.data.comment.comment_id,
             isfavor_coursecmt: 0,
             isoppose_coursecmt: -1
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
          },
          failed: function(res){
              console.log(res)
          }
        })
        x.push(id);
        that.setData({
          disAgreeUrl: '../../images/cai-active.png',
          cai:x
        })
      }
    },
    favor: function(fav,opp){
      var that = this;
      wx.request({
        url: 'http://www.ecnucs.club:8000/service/course/ favor_comment', /*修改more_coursecmt即可*/
        method: 'POST',
        data: { /*根据接口需要选择需要POST的数据*/
           comment_id: that.data.comment.comment_id,
           isfavor_coursecmt: fav,
           isoppose_coursecmt: opp
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
        },
        failed: function(res){
            console.log(res)
        }
      })
    }
  }
  })
  
  
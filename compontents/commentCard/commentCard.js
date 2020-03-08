
var count = 0;
var app = getApp();
Component({
  properties: {

    comment: {
      type: JSON
    },
    card: {
      type: Boolean
    },
    userId: {
      type: Number
    }
  },
  data: {
    isCard: true,
    isStar: true,
    zan: [],
    cai: [],
    agreeUrl: '../../images/zan.png',
    disAgreeUrl: '../../images/cai.png'


  },
  // 组件生命周期
  lifetimes: {
    attached() {
      console.log('attach');
      console.log(this.data.comment);
      var id = this.data.comment.comment_id;
      if (this.data.zan.includes(id)) {
        this.setData({
          agreeUrl: '../../images/zan-active.png'
        })
      };
      if (this.data.cai.includes(id)) {
        this.setData({
          disAgreeUrl: '../../images/cai-active.png'
        })
      }
    },
    detached() {

    }
  },
  // 兼容v2.2.3以下写法
  attached() {

  },
  // 挂载页面的生命周期
  pageLifetimes: {
  },
  methods: {
    agree: function () {
      var that = this;
      console.log(that);
      var id = that.data.comment.comment_id;
      var x = that.data.zan;
      var y = that.data.cai;
      if (that.data.zan.includes(id)) {

        wx.showModal({
          title: '提示',
          content: '确定取消赞同吗？',
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.request({
                url: 'http://www.ecnucs.club:8000/service/comment/favor_comment',
                method: 'POST',
                data: { /*根据接口需要选择需要POST的数据*/
                  comment_id: that.data.comment.comment_id,
                  isfavor_comment: -1,
                  isoppose_comment: 0,
                  user_id: app.globalData.user_detail.user_id
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  if (res.data.code == 0) {
                    var index = x.indexOf(id);
                    x.splice(index, 1);
                    that.data.comment.approve_num = res.data.data.approve_num;
                    that.data.comment.oppose_num = res.data.data.oppose_num;
                    that.setData({
                      agreeUrl: '../../images/zan.png',
                      zan: x,
                      comment: that.data.comment
                    })
                  }
                },
                failed: function (res) {
                  console.log(res)
                }
              })
            } else {
              console.log('用户点击辅助操作')
            }
          }
        });

      }
      else {
        wx.request({
          url: 'http://www.ecnucs.club:8000/service/comment/favor_comment',
          method: 'POST',
          data: { /*根据接口需要选择需要POST的数据*/
            comment_id: that.data.comment.comment_id,
            isfavor_comment: 1,
            isoppose_comment: 0,
            user_id: app.globalData.user_detail.user_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if (res.data.code == 0) {
              x.push(id);
              if (that.data.cai.includes(id)) {
                var index = y.indexOf(id);
                y.splice(index, 1);
              }
              that.data.comment.approve_num = res.data.data.approve_num;
              that.data.comment.oppose_num = res.data.data.oppose_num;
              that.setData({
                agreeUrl: '../../images/zan-active.png',
                disAgreeUrl: '../../images/cai.png',
                zan: x,
                cai: y,
                comment: that.data.comment
              })
            }
            else if (res.data.code == -1) { //已经点过赞的情况
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                confirmText: "确定",
                cancelText: "取消",
                success: function (res) {
                  console.log(res);
                  if (res.confirm) {
                    wx.request({
                      url: 'http://www.ecnucs.club:8000/service/comment/favor_comment',
                      method: 'POST',
                      data: { /*根据接口需要选择需要POST的数据*/
                        comment_id: that.data.comment.comment_id,
                        isfavor_comment: -1,
                        isoppose_comment: 0,
                        user_id: app.globalData.user_detail.user_id
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      success: function (res) {
                        if (res.data.code == 0) {
                          var index = x.indexOf(id);
                          x.splice(index, 1);
                          that.data.comment.approve_num = res.data.data.approve_num;
                          that.data.comment.oppose_num = res.data.data.oppose_num;
                          that.setData({
                            agreeUrl: '../../images/zan.png',
                            zan: x,
                            comment: that.data.comment
                          })
                        }
                      },
                      failed: function (res) {
                        console.log(res)
                      }
                    })
                  } else {
                    console.log('用户点击辅助操作')
                  }
                }
              })
            }
            else {
              wx.showModal({
                content: res.data.msg, //其他错误信息输出
                showCancel: false,
              })
            }
          },
          failed: function (res) {
            console.log(res)
          }
        })
      }
    },
    disagree: function () {
      var that = this;
      var id = that.data.comment.comment_id;
      var x = that.data.cai;
      var y = that.data.zan;
      if (that.data.cai.includes(id)) {
        wx.showModal({
          title: '提示',
          content: '确定取消反对吗？',
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.request({
                url: 'http://www.ecnucs.club:8000/service/comment/favor_comment',
                method: 'POST',
                data: { /*根据接口需要选择需要POST的数据*/
                  comment_id: that.data.comment.comment_id,
                  isfavor_comment: 0,
                  isoppose_comment: -1,
                  user_id: app.globalData.user_detail.user_id
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res.data);
                  if (res.data.code == 0) {
                    var index = x.indexOf(id);
                    x.splice(index, 1);
                    that.data.comment.approve_num = res.data.data.approve_num;
                    that.data.comment.oppose_num = res.data.data.oppose_num;
                    that.setData({
                      disAgreeUrl: '../../images/cai.png',
                      cai: x,
                      comment: that.data.comment
                    })
                  }
                },
                failed: function (res) {
                  console.log(res)
                }
              })
            }
            else {
              console.log('用户点击辅助操作')
            }
          }
        })
      }
      else {
        wx.request({
          url: 'http://www.ecnucs.club:8000/service/comment/favor_comment', /*修改more_coursecmt即可*/
          method: 'POST',
          data: { /*根据接口需要选择需要POST的数据*/
            comment_id: that.data.comment.comment_id,
            isfavor_comment: 0,
            isoppose_comment: 1,
            user_id: app.globalData.user_detail.user_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            if (res.data.code == 0) {
              x.push(id);
              if (that.data.zan.includes(id)) {
                var index = y.indexOf(id);
                y.splice(index, 1);
              }
              that.data.comment.approve_num = res.data.data.approve_num;
              that.data.comment.oppose_num = res.data.data.oppose_num;
              that.setData({
                disAgreeUrl: '../../images/cai-active.png',
                agreeUrl: '../../images/zan.png',
                cai: x,
                zan: y,
                comment: that.data.comment
              })
            }
            else if (res.data.code == -1) { //已经点过反对的情况
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                confirmText: "确定",
                cancelText: "取消",
                success: function (res) {
                  console.log(res);
                  if (res.confirm) {
                    wx.request({
                      url: 'http://www.ecnucs.club:8000/service/comment/favor_comment',
                      method: 'POST',
                      data: { /*根据接口需要选择需要POST的数据*/
                        comment_id: that.data.comment.comment_id,
                        isfavor_comment: 0,
                        isoppose_comment: -1,
                        user_id: app.globalData.user_detail.user_id
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      success: function (res) {
                        console.log(res.data);
                        if (res.data.code == 0) {
                          var index = x.indexOf(id);
                          x.splice(index, 1);
                          that.data.comment.approve_num = res.data.data.approve_num;
                          that.data.comment.oppose_num = res.data.data.oppose_num;
                          that.setData({
                            disAgreeUrl: '../../images/cai.png',
                            cai: x,
                            comment: that.data.comment
                          })
                        }
                      },
                      failed: function (res) {
                        console.log(res)
                      }
                    })
                  }
                }
              })

            }
            else {
              wx.showModal({
                content: res.data.msg, //其他错误信息输出
                showCancel: false,
              })
            }
          },
          failed: function (res) {
            console.log(res)
          }
        })
      }
    },
  }
})  
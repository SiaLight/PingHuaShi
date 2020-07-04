// pages/teacherIndex/teacherIndex.js

// pages/webviews/webviews.wxml.js
Page({
  data: {
    detail_link: '',
  },
  onLoad: function (options) {
    /*var pages = getCurrentPages();
    var lastpage = pages[pages.length - 2];
    var id = parseInt(options.id);*/
    this.setData({
      detail_link: options.url//lastpage.data.teacher[id].index_url
    })
  },
})

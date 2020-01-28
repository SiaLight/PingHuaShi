
var count=0;
Component({
    properties: {
      score: {
        type: Number,
        value: 0
      },
    },
    data: {
        stars: [
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4},
            {id: 5}
          ],
    normalSrc: '../../images/star/star_grey.png',
    selectedSrc: '../../images/star/star_full.png',
    halfSrc: '../../images/star/star_half.png',
    },
    // 组件生命周期
    lifetimes: {
      attached () {
  
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
    }
  })
  
  
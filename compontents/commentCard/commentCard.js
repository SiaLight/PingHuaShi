
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
        isCard: true
      
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
  
  
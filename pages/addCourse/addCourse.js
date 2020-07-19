var app = getApp()

Page({
  data:{
      courseType:["选择类别","学课基础课程","专业必修课程","专业选修课程",
    "通识必修课程","通识选修课程"],
        name:'',
        type:'',
        des:'',
        index:0,
        modalName:'',
        checkbox:[
          {
            value:0,
            name:'不限专业',
            checked:false
          },
          {
          value:1,
          name:'汉语言文学',
          checked:false
        },
        {
          value:2,
          name:'哲学',
          checked:false
        },
        {
          value:3,
          name:'公共关系学',
          checked:false
        },
        {
          value:4,
          name:'法学',
          checked:false
        },
        {
          value:5,
          name:'社会工作',
          checked:false
        }
      
      ]
  },
  get_name:function(e){
          this.setData({
              name: e.detail.value
          })
  },
  get_des:function(e){
    this.setData({
        des: e.detail.value
    })
  },
  typeChange:function(e){
      let index =  e.detail.value
    this.setData({
        type: this.data.courseType[index],
        index:index
    })

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ChooseCheckbox(e){
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
  }

})
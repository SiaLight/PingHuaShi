var app = getApp()

Page({
  data:{
      courseType:["请选择类别","学科基础课程","专业教育课程","计算机类","英语类",
        "思政类", "体育类","其他类别课程"],
        name:'',
        type:'',
        des:'',
        index:0,
        modalName:'',
        checkbox:[],
        isAll:false,
        chooseProfess:[]
  },
  onLoad:function(){

    this.getAllType()

  },
  getAllType:function(){
    let self = this
    wx.request({
      url:app.globalData.rootDomain + '/service/teacher/listProfession',
      method:'POST',
      success:function(res){
        console.log(res)
        let professions = res.data.data.professions
        professions.forEach(item => {
         item.checked = false
        });
        let all={
          name:'不限专业',
          id:0,
          checked:false
        }
        professions.splice(0,0,all)
        self.setData({
          checkbox:professions
        })
        //console.log(self.data.checkbox)
      },
      fail:function(err){
        console.log(err)

      }

    })

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
    console.log(values)
    let choose  = this.data.chooseProfess
    let self = this
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].id == values) {
        items[i].checked = !items[i].checked;
        console.log(items[i].checked)
        if(values==0)
        {
         self.setData({
            isAll: !self.data.isAll
          })
        }
        if(items[i].checked)
        {
             choose.push(items[i])
          console.log("添加")
        }
        else{
          for(let j=0;j<choose.length;j++){
            if(choose[j].id==items[i].id)
            {
              choose.splice(j,1)
              console.log("取消")
              break
            }
          }
         
        }
        break
      }
    }
    this.setData({
      checkbox: items,
      chooseProfess:choose
    })
    console.log(this.data.chooseProfess)
  },
  add:function(){
    let self = this
    let courseIndex = self.data.index
    let courseTypt= self.data.courseType[courseIndex]
    let profession ,data
  
    if(self.data.name.length<1)
    {
      self.showModel('请填写课程名称')
      return
    }
    if(courseIndex==0)
    {
      self.showModel('请选择课程类别')
      return
    }
   
    if(self.data.chooseProfess.length<1){
      self.showModel('请选择课程专业')
      return
    }
    else{
    profession = self.data.chooseProfess.map(function(v){return v.id;});
    console.log(profession)
    } 
    
    if(self.data.des == '')
    {
      self.showModel('请填写课程介绍')
      return
    }
    if(self.data.isAll)
    {
     data={
       teacher_id: app.globalData.teacher_id,
      course_name: self.data.name,
      course_type: courseTypt,
      course_intro: self.data.des,
       course_proId: JSON.stringify([0])
    }
  }
  else{
    data={
      teacher_id: app.globalData.teacher_id,
      course_name: self.data.name,
      course_type: courseTypt,
      course_intro: self.data.des,
      course_proId: JSON.stringify(profession)
  }
}
wx.showModal({
  content: '确定添加该课程？',
  success(res){
    if(res.confirm){
    console.log(data)
    wx.request({
      url:app.globalData.rootDomain + '/service/course/addCourse',
      method:'POST',
      data:data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res)
        if(res.statusCode==200){
          wx.showToast({
            title: '添加成功',
            icon: 'none',   
            duration: 2000,
            success(res) {
              setTimeout(function () {
                wx.navigateBack({

                })
              }, 1000)
            }    
          })
          self.setData({
            name: '',
            type: '',
            des: '',
            index: 0,
            modalName: '',
            checkbox: [],
            isAll: false,
            chooseProfess: []
          })  
          
        }
        else{
          wx.showToast({
            title: '添加失败',
            icon: 'none',   
            duration: 2000     
          })  
        }
      },
      fail:function(err){
        console.log(err)
        wx.showToast({
          title: '添加失败',
          icon: 'none',   
          duration: 2000     
        })  
      }
      })
    }
    }
  })

  },
  showModel:function(content){
    wx.showModal({
      title:'提示',
      content:content,
      showCancel: false,
      confirmText:'知道了',
      confirmColor:'#c90027'
    })
  }

})
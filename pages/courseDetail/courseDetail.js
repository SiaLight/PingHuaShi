Page({
    data:{
        course:{
            name:"操作系统",
            des:"操作这都快如果不会阿偶入会费is读和VB上的话从IEuhviauhbis恶如读后感艾欧合格敖曙光螯合钙",
            score: 9.0,
            Pnum:2,    
        },
        comment:{
            name:"张同学",
            courseName: "操作系统",
            score:8,
            des:"dkufbh 阿内如何给安慰刘荣华安慰刘国华了深度和阿尔派如何啊诶如果刘德国人爱胡歌奥如何给阿尔合格",
            avatar:"../../images/girl.png",
            star: 3,
            agree:100,
            disagree: 10,
        },
        teachers:[
            {
                name: "张老师",
                score: 6
            },
            {
                name: "李老师",
                score: 5
            }
        ],
        isFold:"展开",
        ellipsis: true,
        isCard: false

    },

    move: function(){
        var value = !this.data.ellipsis;
        this.setData({
          ellipsis: value
        });
        if(this.ellipsis){
            this.setData({
                isFold: "展开"
              }) ;
        }
        else{
            this.setData({
                isFold: "收起"
              }) 
        }
    }


})
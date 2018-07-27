var humanBeing = {
    itemFunc:null,
    attr:{
        name:'我',
        attack:10,
        defense:5,
        maxBlood:20,
        blood:20,
        action:9999,
        pos:[2,2],
        view:2,
    },
    skill:{
        
    },
    equip:{
        weapon:{

        },
        armor:{

        }
    },
    bag:[
            {
                name:'技能书:回血术',
                id:'healBooK',//用来检测是否学过
                isMe:1,
                func:function(man,message){
                    if(man.skill.healBooK){
                        man.skill.healBooK++
                    }else{
                        man.skill.healBooK = {
                            name:'回血术',
                            consum:0,//消耗值
                            lv:1,//技能等级
                            func:function(man,lve,message){
                                man.attr.blood = parseInt(man.attr.blood) + 10*lve
                                message('你恢复了'+ 10*lve + '点血')
                            }
                        }
                    }
                },
            },

            {
                name:'血瓶(+10)',
                func:function(man,message){
                    man.attr.blood = man.attr.blood+10
                    message('你恢复了10点血')
                },
                isMe:1
            },
            {
                name:'飞镖(10)',
                func:function(man,message){
                    // man.blood = man.blood - 10
                    message('你使用了飞镖')

                }
            },
            {
                name:'攻击书+5',
                func:function(man,message){
                    man.attr.attack = man.attr.attack + 5
                },
                isMe:1
            },
    ]
}
export default humanBeing
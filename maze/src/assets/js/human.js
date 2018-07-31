var humanBeing = {
    itemFunc:null,
    attr:{
        name:'我',
        attack:20,
        defense:10,
        maxBlood:100,
        blood:100,
        action:9999,
        pos:[2,2],
        view:4,
    },
    skill:{
        
    },
    equip:{
        weapon:{

        },
        armor:{

        }
    },
    catch:{

    },
    bag:[

            {
               type:1,
                name:'血瓶(+10)',
                func:function(man,message){
                    man.attr.blood = man.attr.blood+10
                    message('你恢复了10点血')
                    return true
                },
                isMe:1
            },
            {
                type:1,
                name:'血瓶(+10)',
                func:function(man,message){
                    man.attr.blood = man.attr.blood+10
                    message('你恢复了10点血')
                    return true
                },
                isMe:1
            },
            {
                type:1,
                name:'血瓶(+10)',
                func:function(man,message){
                    man.attr.blood = man.attr.blood+10
                    message('你恢复了10点血')
                    return true
                },
                isMe:1
            },
            {
                type:2,
				name:'飞镖('+ 10*1+ ')',
				func:function(man,message){//man被作用者
					man.blood = man.blood - 10*1;
                    message('你使用了飞镖造成' + 10 +'点伤害')
					console.log('!!!',man.blood)
                    return true
				}
            },
            {
                type:3,
                name:'攻击书+5',
                func:function(man,message){
                    man.attr.attack = man.attr.attack + 5
                    return true
                },
                isMe:1
            },
    ]
}
export default humanBeing
//技能
import humanBeing from './human.js'
var skill = {
		healBooK:{
			isMe:1,
			name:'回血术',
            consum:0,//消耗值
            lv:5,//技能等级
            func:function(man,message){
            	man.attr.blood = parseInt(man.attr.blood) + 10*humanBeing.skill.healBooK.lv
            	message('你恢复了'+ 10*humanBeing.skill.healBooK.lv + '点血')
            }
        },
        blindBook:{
			name:'致盲',
            consum:0,//消耗值
            lv:1,//技能等级
            func:function(man,message){
            	if(man.view){
            		man.view--
            	}
            	man.blood = parseInt(man.blood) - 2*humanBeing.skill.blindBook.lv
            	message('你使用致盲造成'+ 2*humanBeing.skill.blindBook.lv + '点伤害')
            }
        }, 
        pullBook:{
			name:'湮灭之锁',
            consum:0,//消耗值
            lv:1,//技能等级
            func:function(man,message,myMap){
                var humanPos = humanBeing.attr.pos
                var x = man.pos[0]
                var y = man.pos[1]
                if(x==humanPos[0]){
                    if(y<humanPos[1]){
                        myMap[x][y+(humanBeing.skill.pullBook.lv+1)] = man //初始2格子
                        man.pos = [x,y+(humanBeing.skill.pullBook.lv+1)]
                    }else if(y>humanPos[1]){
                        myMap[x][y-(humanBeing.skill.pullBook.lv+1)] = man //初始2格子
                        man.pos = [x,y-(humanBeing.skill.pullBook.lv+1)]
                    }
                }
                else if(y==humanPos[1]){
                    if(humanPos[0]>x){
                        myMap[x+(humanBeing.skill.pullBook.lv+1)][y] = man //初始2格子
                        man.pos = [x+(humanBeing.skill.pullBook.lv+1),y]
                    }else if(humanPos[0]<x){
                        myMap[x-(humanBeing.skill.pullBook.lv+1)][y] = man //初始2格子
                        man.pos = [x-(humanBeing.skill.pullBook.lv+1),y]
                    }
                }
            	myMap[x][y] = ''
            	man.blood = parseInt(man.blood) - 2*humanBeing.skill.pullBook.lv
            	message('你使用湮灭之锁造成'+ 2*humanBeing.skill.pullBook.lv + '点伤害')
            }
        },
        pushBook:{
			name:'如来神掌',
            consum:0,//消耗值
            lv:1,//技能等级
            func:function(man,message,myMap){
                var humanPos = humanBeing.attr.pos
                var x = man.pos[0]
                var y = man.pos[1]
                if(x==humanPos[0]){
                    if(y>humanPos[1]){
                        myMap[x][y+(humanBeing.skill.pushBook.lv+1)] = man //初始2格子
                        man.pos = [x,y+(humanBeing.skill.pushBook.lv+1)]
                    }else if(y<humanPos[1]){
                        myMap[x][y-(humanBeing.skill.pushBook.lv+1)] = man //初始2格子
                        man.pos = [x,y-(humanBeing.skill.pushBook.lv+1)]
                    }
                }
                else if(y==humanPos[1]){
                    if(humanPos[0]<x){
                        myMap[x+(humanBeing.skill.pushBook.lv+1)][y] = man //初始2格子
                        man.pos = [x+(humanBeing.skill.pushBook.lv+1),y]
                    }else if(humanPos[0]>x){
                        myMap[x-(humanBeing.skill.pushBook.lv+1)][y] = man //初始2格子
                        man.pos = [x-(humanBeing.skill.pushBook.lv+1),y]
                    }
                }
                myMap[x][y] = ''
                man.blood = parseInt(man.blood) - 2*humanBeing.skill.pushBook.lv
                message('你使用如来神掌造成'+ 2*humanBeing.skill.pushBook.lv + '点伤害')
            }
        },
    }
 export default skill

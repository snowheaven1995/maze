var hu = {
	// 随机
	random(n){
		return parseInt(Math.random()*(n+1))
	},
	//物品掉落
	fallItem(level){
		var item1 = [
			{
				name:'血瓶(+'+ 10*level+ ')',
				func:function(man){
					man.blood = man.blood+10*level
				}
			},
			{
				name:'飞镖('+ 10*level+ ')',
				func:function(man){//man被作用者
					man.blood = man.blood - 10*level
				}
			},
			{
				name:'攻击书+' + (2+parseInt(level)),
				func:function(man){//man被作用者
					 man.attack = man.attack + 2+parseInt(level)
				}
			},
			{
				name:'防御书+' + (1+parseInt(level)),
				func:function(man){//man被作用者
					man.defense = man.defense + 1+parseInt(level)
				}
			},
			{
				name:'血量书+(' + 10*level + ')',
				func:function(man){//man被作用者
					man.maxBlood = man.maxBlood + 10*level
				}
			},
		]
		return item1
	},
	// 添加怪物
	addMonster(num){ //num生成怪物数量
		var monsterArr = []
		for(var i=0;i<num;i++){
			var monsterLV = hu.random(10) //怪物等级
			var itemNum = hu.random(3)//随机掉落物品数量
			itemNum = itemNum==0?1:itemNum //至少掉落一个
			if(true){
				var monster = {
					name:'怪',
					attack:500,//攻击
					defense:50,//防御
					blood:2000,//血
					fallItem:[]
				}
				// 添加物品
				for(var x=0;x<itemNum;x++){
					monster.fallItem.push(hu.fallItem(1)[hu.random(4)])
				}
				monsterArr.push(monster)
			}
		}
		return monsterArr

	}



}

export default hu;
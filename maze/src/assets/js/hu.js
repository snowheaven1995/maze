var hu = {
	// 随机
	random(n){
		return parseInt(Math.random()*(n+1))
	},
	// 随机下限为1
	random1(min,max){
		return parseInt(Math.random()*(max-min+1)+min)
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
				name:'攻击书+' + (5+parseInt(level)),
				func:function(man){//man被作用者
					 man.attack = man.attack + 5+parseInt(level)
				}
			},
			{
				name:'防御书+' + (1+parseInt(level)),
				func:function(man){//man被作用者
					man.defense = man.defense + 1+parseInt(level)
				}
			},
			{
				name:'血量书(+' + 10*level + ')',
				func:function(man){//man被作用者
					man.maxBlood = man.maxBlood + 10*level
				}
			},
			{
				name:'辣椒粉',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
		]
		// 高级怪新增物品
		var item2 = [

			{
				name:'魔瓶',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
			{
				name:'铠甲',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
			{
				name:'武器',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
		]
		// boss新增物品
		var item3 = [
			{
				name:'铠甲',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
			{
				name:'武器',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
			{
				name:'技能书:回血',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
			{
				name:'技能书:推人',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
			{
				name:'技能书:拉人',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
			{
				name:'技能书:致盲',
				func:function(man){//man被作用者
					// man.maxBlood = man.maxBlood + 10*level
				}
			},
		]
		if(level>5){
			for(var i of item2){
				item1.push(i)
			}
		}
		if(level==10){
			for(var i of item3){
				item1.push(i)
			}
		}
		return item1
	},
	// 添加怪物
	addMonster(num){ //num生成怪物数量
		var monsterArr = []
		for(var i=0;i<num;i++){
			var monsterLV = hu.random(9) //怪物等级
			monsterLV++ //怪物等级随机出来时0-9 改为 1-10
			var itemNum = hu.random(3)//随机掉落物品数量
			itemNum = itemNum==0?1:itemNum //至少掉落一个
			// monsterLV为10生成boss
			if(monsterLV==10){
				itemNum=10 //固定掉落10
				var monster = {
					name:'boss',
					attack:500,//攻击
					defense:50,//防御
					blood:2000,//血
					fallItem:[]
				}
				// 添加物品
				var item = hu.fallItem(10)
				for(var x=0;x<itemNum;x++){
					monster.fallItem.push(item[hu.random(item.length-1)])
				}
				monsterArr.push(monster)
			}else{
				var itemLvMin = parseInt(monsterLV/2)
				var monster = {
					name:monsterLV+'怪',
					attack:20*monsterLV,//攻击
					defense:5*monsterLV,//防御
					blood:150*monsterLV,//血
					fallItem:[]
				}
				// 添加物品
				for(var x=0;x<itemNum;x++){
					var itemLV = hu.random1(itemLvMin,monsterLV)
					var item = hu.fallItem(itemLV)
					monster.fallItem.push(item[hu.random(item.length-1)])
				}
				monsterArr.push(monster)
			}
		}
		return monsterArr

	}



}

export default hu;
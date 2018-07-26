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
				name:'攻击书+2',
				func:function(man){//man被作用者
					man.attack+=2
				}
			},
			{
				name:'防御书+1',
				func:function(man){//man被作用者
					man.defense+=1
				}
			},
			{
				name:'血量书+10',
				func:function(man){//man被作用者
					man.blood+=1
				}
			},
		]
		return item1
	},
	// 添加怪物
	addMonster(num){
		for(var i=0;i<num;i++){
			var probability = hu.random(10)
			if(probability==10){
				var monster = {
					attack:500,//攻击
					defense:50,//防御
					blood:2000,//血

				}
			}
		}

	}



}

export default hu;
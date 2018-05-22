<template>
    <div id="body">
    <!-- {{kr}} -->
    <el-button @click="isGet">加入</el-button>
    <el-button @click="start">开始</el-button>
    <!-- {{table}} -->
      <table>
          <tr v-for="(item,tableIndex) in table">
            <td v-for="(x,index) in item" @click="way(x,table,tableIndex,index,item)" :class="{td2:x.status}">
              <span v-if="x.status && x.key">钥匙</span>
              <span v-if="x.status && x.monster && x.monster.isAlive">{{x.monster.name}} 攻：{{x.monster.attack.n}},血：{{x.monster.blood.n}}</span>
              <!-- <span v-else-if="x.status && x.monster && !x.monster.isAlive">金币 + {{x.monster.money}}</span> -->
              <span v-if="x.human">人</span>
            </td>
          </tr>
      </table>
      <div><div class="ppp">第{{ceng}}层</div></div>
      <div>本层钥匙：{{thisKey}}</div>
      <div>属性：</div>
      <div v-for="item in my" class="snow_on_left">{{item.name}}:{{item.n}}</div>
      <div class="clear"></div>
      <gameStore :money='my.money.n' @buySome='buySome'></gameStore>
     
    </div>
</template>
<script type="text/javascript">
// import baseUrls from '../../../assets/js/url.config'
import gameStore from './store.vue'
  export default{
    name:'maze',
    components:{
      gameStore,
    },
    data(){
      return{
        
        kr:'',
        ws:'',
        ceng:1,
        thisKey:false, //本层钥匙
        isThis:[],//防止同一数组添加多个元素
        n:6,//格子数
        table:[],
             
        my:{//人物属性
            id:'',
            manPosition:{
              x:0,
              y:0,
            },
            attack:{
                  name:'攻击',
                  n:24
                },
            blood:{
                  name:'血量',
                  n:460
                },

            defense:{
                  name:'防御',
                  n:5
                },
            crit:{
                 name:'暴伤',
                 n:2
               },
            critRate:{
                name:'暴击',
                n:50
              },
            money:{
               name:'金币',
               n:1000
            },
            arms:{
              weapon:'',
              cloth:'',
              helmet:'',
              shoe:'',
            }
        },
        equipment:[//装备
          {
             type:'weapon',
             name:'铁剑',
          },//武器
          {
            type:'cloth',
            name:'一级防弹衣',
          },//衣服
          {
            type:'helmet',
            name:'摩托车头盔',
          },//头盔
          {
            type:'shoe',
            name:'草鞋',
          },//鞋子 
          ],
      }
    },

    beforeMount() {
        this.init(this.ceng)
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      buySome(val){
        console.log('from father',val)
        if(val.type == 1){
           this.my.blood.n+=val.value;  
        }
        if(val.type == 2){
          this.my.attack.n -= val.value;
        }
        if(val.type == 3){
          this.my.defense.n -= val.cost;
        }
        this.my.money.n -= val.cost;
      },
      start(){
        console.log(JSON.stringify(this.table))
        this.ws.send(JSON.stringify(this.table));
        this.ws.onmessage = (r) => { 
          if(r.data.length>10){
            this.table = JSON.parse(r.data)

          }
        }
      },
      ajax(json,callback) {
        this.$ajax(json).then(function(res){
          if(callback){ callback(res) }; 
        }.bind(this)).catch(function(e){console.log('E:>',e)});
      },
      isGet(){
        var time1 = Date.parse(new Date())
        if(!this.my.id){
          this.my.id = time1
        }
        if(!this.ws){
          this.ws = new WebSocket('ws://192.168.1.245:8090/notify')
          this.ws.onmessage = (evt) => {  // 收到服务器发送的消息后执行的回调
              console.log(evt.data)
          }
        }
        

        

      },
      rrrGet(r){
        console.log(JSON.stringify(r))
      },
      init(ceng){
        this.table=[]
        this.thisKey = false
        var j = 1+(1+ceng)/10 //金币基数
        var k = this.randomValue().split(',')//钥匙
        var monsterNum = parseInt(Math.random()*(10-5+1)+5)//随机5-10怪
        var d = this.randomValue().split(',')//人物
        for(var i=0;i<this.n;i++){
          this.table.push([])
        }
        for(var i=0;i<this.table.length;i++){//地图初始化
          for(var x=0;x<this.n;x++){
            this.table[i].push({status:false,key:false,isWalk:true})
          }
        } 
        // 添加钥匙
        this.table[k[0]][k[1]].key = true
        // 添加怪物
        for(var i=0;i<monsterNum;i++){
          var monsterKey = this.randomValue().split(',')
          let thing = this.randomNumber(this.equipment.length)
          this.table[monsterKey[0]][monsterKey[1]].isWalk = false
          this.$set(this.table[monsterKey[0]][monsterKey[1]],'monster',{
            name:'小怪', 
            attack:{
                  name:'攻击',
                  n:ceng*10
                },
            blood:{
                  name:'血量',
                  n:ceng*50,
                },

            defense:{
                  name:'防御',
                   n:ceng*2
                },
            crit:{
                 name:'暴伤',
                 n:0
               },
            critRate:{
                name:'暴击',
                n:0
              },
            fallItem:this.equipment[thing],  
            isBlock:true,//是否看守周围石板(是否封锁)
            isFightBack:true,//是否反击
            money:parseInt((Math.random()*(1000-500+1)+500)*j),//金币
            isAlive:true,//是否存活

          })
         
        }
        // 门
        this.my.manPosition.x = d[0]//横
        this.my.manPosition.y = d[1]//竖

        this.table[d[0]][d[1]].human = true
        this.table[d[0]][d[1]].status = true

      },
      // 随机数防止重复(返回值形势为 ‘1，2’)
      randomValue(){ 
        var x1 = this.randomNumber(this.n)
        var y1 = this.randomNumber(this.n)
        let x = x1+','+y1
        if(this.isThis.indexOf(x)>=0){
          while(this.isThis.length<(this.n*this.n)){
            var a = this.randomNumber(this.n)
            var b = this.randomNumber(this.n)
            var c = a+','+b
            if(this.isThis.indexOf(c)<0){
              this.isThis.push(c)
              return c
            }
          }
        }else{
          this.isThis.push(x)
          return x
        }
      },
      // 防御溢出
      ad(a,b){  //a:攻击方，b:被攻击方
        var sh = a.attack.n-b.defense.n>0?a.attack.n-b.defense.n:0
        var sh2 = b.attack.n-a.defense.n>0?b.attack.n-a.defense.n:0
        var baoji = this.randomNumber(100)
        var baoji2 = this.randomNumber(100)
        if(a.critRate.n>=baoji){
          sh = sh*a.crit.n
        }
        if(b.critRate.n>=baoji2){
          sh2 = sh2*b.crit.n
        }
        b.blood.n = b.blood.n - sh>0?b.blood.n - sh:0
        a.blood.n = a.blood.n - sh2>0?a.blood.n - sh2:0
        return [sh,sh2]

      },
      //打怪
      daguai(x){
        if(this.my.blood.n>0){
          var start = this.ad(this.my,x.monster)//人物攻击
            if(x.monster.blood.n==0){
              this.$message();
              x.monster.isAlive = false //死亡
              x.monster.isBlock = false //不在看守石板
              x.isWalk = true;
              this.$message('你打死了'+x.monster.name+';你获得了'+x.monster.money+'个金币和'+x.monster.fallItem.name)
              for(let item in this.my.arms){
                console.log(item)
                if(this.my.arms[item]==''){
                  if(item == x.monster.fallItem.type){
                    this.my.arms[item] = x.monster.fallItem
                  }
                }
                
              }
              console.log(this.my.arms)
              this.my.money.n += x.monster.money
            }else{
              this.$message('对'+x.monster.name+'造成'+start[0]+'点伤害，'+'你受到'+x.monster.name+'的攻击扣了'+start[1]+'点生命值');
            }
        }else if(this.my.blood.n==0){
          this.$message('你已经死了，懂吗');
        }
      },
      // 执行事件：打怪、拾取等
      func1(x){
        console.log('in attacking')
        if(x.monster && x.monster.isAlive){
          this.daguai(x)//打怪
        }else if(x.key){//钥匙
          this.thisKey = true
        }else if(x.human){//下一层
          if(this.thisKey){
            this.ceng++
            this.init(this.ceng)
          }
        }
       
      },
      // 走路
      way(point,table,tableIndex,index,item){//横坐标index， 纵坐标tableindex
       
         // 上下走
        if((this.my.manPosition.x==tableIndex+1 || this.my.manPosition.x==tableIndex-1) && this.my.manPosition.y==index){ 
          if(point.isWalk){
            for(let i of table){
              for(let j of i){
                this.$set(j,'human',false)
              }
            }
            point['human'] = true
            point.status = true
            this.my.manPosition.x = tableIndex
          }
          else{
            point.status = true
            this.func1(point)
            // console.log('事件')
          }
        }else if((this.my.manPosition.y==index+1 || this.my.manPosition.y==index-1) && this.my.manPosition.x==tableIndex){
          if(point.isWalk){
            for(let i of table){
              for(let j of i){
                this.$set(j,'human',false)
              }
            }
            point['human'] = true
            point.status = true
            this.my.manPosition.y = index
          }
          else{
            point.status = true
            this.func1(point)
          }
      }
        

        // var thisIndex = index
        // // 路是否通
        // var next = false
        // var prev = false
        // var top = false
        // var bottom = false

        // // 怪物看守石板
        // var Mnext = false
        // var Mprev = false
        // var Mtop = false
        // var Mbottom = false
        
        // // 右边
        // if(index+1<this.n){
        //   next = item[index+1].status
        //   if(next){
        //     if(!item[index+1].monster || !item[index+1].monster.isBlock){
        //       Mnext = true
        //     }
        //   }else{
        //     Mnext = true
        //   }
        // }else{
        //   Mnext = true
        // }
        // // 左边
        // if(index-1>=0){
        //   prev = item[index-1].status
        //   if(prev){
        //     if(!item[index-1].monster || !item[index-1].monster.isBlock){
        //       Mprev = true
        //     }
        //   }else{
        //    Mprev = true
        //  }
        // }else{
        //   Mprev = true
        // }
        // // 上面
        // if(tableIndex+1<this.n){
        //    top = table[tableIndex+1][thisIndex].status
        //    if(top){
        //      if(!table[tableIndex+1][thisIndex].monster || !table[tableIndex+1][thisIndex].monster.isBlock){
        //       Mtop = true
        //     }
        //    }else{
        //     Mtop = true
        //    }
        // }else{
        //   Mtop = true
        // }
        // 下面
        // if(tableIndex-1>=0){
        //  bottom = table[tableIndex-1][thisIndex].status
        //      if(bottom){
        //       if(!table[tableIndex-1][thisIndex].monster || !table[tableIndex-1][thisIndex].monster.isBlock){
        //        Mbottom = true
        //      }

        //    }else{
        //     Mbottom = true
        //   }
        // }else{
        //   Mbottom = true
        // }
        // // 路是否通
        // // console.log(Mnext,Mprev,Mtop,Mbottom)
        // let status = next || prev || top || bottom
        //  // 是否有怪看守
        // let monster = Mnext && Mprev && Mtop && Mbottom
        // if(status&&monster){
        //   x['human'] = true
        //   x.status = true
        // }else{
        //   this.$message('要打通一条路才能过去，懂吗');
        // }
      },
      randomNumber(n){
        // 0到n-1随机数
        return Math.floor(Math.random()*n)

      }

      





    }
  }
</script>
<style type="text/css">
@import '../assets/css/game.css';
  #body{
    margin-top: 150px;
    height: 600px;
    width: 600px;
    /*border: 1px solid #ccc;*/
    margin: 150px auto 0 auto;
  }
  td{
    width: 80px;
    height: 80px;
    border: 1px solid #f00;
    background: #ccc;
    text-align: center;
  }
  .td2{
    background: #fff;
  }
  .ppp{
    display: inline-block;
  }
  </style>










</style>
<template>
  <div id="home">
    <div>let's  go some chicken dinner</div>
    <div class="gameArea" >
      <el-button @click="ws">准备({{playerLength}}人准备)</el-button>
      <el-button @click="gameStart">开始游戏</el-button>
      <div class="cc">
        <div><el-button @click="bagVisible=true">背包</el-button></div>
        <div><el-button @click="skillShow=true">技能</el-button></div>  
        <div v-if="human.itemFunc" class="c">请选择目标  <el-button @click="human.itemFunc=''">取消</el-button></div>
        <div class="attrArea">
          <span>血量:{{human.attr.blood}}/{{human.attr.maxBlood}}</span><br>
          <span>攻击:{{human.attr.attack}}</span><br>
          <span>防御:{{human.attr.defense}}</span><br>
          <span>行动力:{{human.attr.action}}</span>
        </div>
      </div>
      <div class="clear"></div>
      <table cellspacing="0">
        <tr v-for='(row,rowIdx) in map' class="row">
          <template v-for='(square,index) in row'>
            <el-tooltip class="item" effect="dark" :content="showSquare(square)" placement="top-start" v-if="square">
              <td class="square" :class='{viewable:canSee(rowIdx,index),isMe:square.view}' @click='comeHere(square,rowIdx,index)'>{{square.name}}</td>
            </el-tooltip>
            <td v-else class="square" :class='{viewable:canSee(rowIdx,index)}' @click='comeHere(square,rowIdx,index)'>{{square}}</td>
          </template>
          
        </tr>
      </table>
    </div>
    <el-dialog
      :visible.sync="bagVisible"
      width="30%">
       <el-button type="primary" plain v-for="(item,index) in human.bag" @click="huAction(item,index,'item')" :key="index">{{item.name}}</el-button>
    </el-dialog>
    <el-dialog
      :visible.sync="skillShow"
      width="30%">
       <el-button type="primary" plain v-for="(item,index) in human.skill" @click="huAction(item,index,'skill')" :key="index">{{item.name}} {{item.lv}}级</el-button>
    </el-dialog>   
  </div>
</template>
<script>
  import humanBeing from '../assets/js/human.js'
  import walk from '../assets/js/walk.js'
  import hu from '../assets/js/hu'
  export default{
    data(){
      return{
        playerLength:0,
        skillShow:false,
        bagVisible:false,
        mapSize:50,
        map:[],
        human:{},
        attackHigh:12,
        attackLow:8,
      }
    },
    computed:{

    },
    watch: {
      '$ws.onmessage':{
        handler: function (val, old) { 
          console.log('>>',val)
        },
        deep:true
      }
    },
    methods:{
      ws(){
        var data = {
          msg:'准备',
          map:this.map
        }
        this.$ws.send(JSON.stringify(data)) 
      },

      gameStart(){
          // var ws1 = this.ws1
          // this.map = []
          var data = {
            msg:'开始',
          }
          data = JSON.stringify(data)
          this.$ws.send(data)
          // ws1.onmessage = (e) => {  // 收到服务器发送的消息后执行的回调
          //   var data = JSON.parse(e.data)
          //   console.log(data.map)
          //   this.map = data.map
          //   this.playerLength = data.player
          //   // console.log("gameStart ok")
          // }
          
      },
      reverseArray(ele){
        return ele
      },
      // 显示提示
      showSquare(r){
        var b = ''
        if(r.fallItem){
          for(var i=0;i<r.fallItem.length;i++){
            b+=r.fallItem[i].name
          }
        }
        var a = '血量：'+ r.blood  + ',攻击：' + r.attack + ',防御：' + r.defense + b
        return a
      },
      canSee(x,y){
        if(Math.abs(x-this.human.attr.pos[0])<=this.human.attr.view){
          if(Math.abs(y-this.human.attr.pos[1])<=this.human.attr.view){
            return true
          }
        }
      },
      itemUse(item,idx){
        // if(item.type == 1){
        //   item.func(this.human.attr)
        // } else if(item.type==2){
        //   this.human.catch = item;
        //   console.log(this.human.catch)
        //   this.human.catch['idx'] = idx
        // }
        // this.bagVisible = false

      },
      // 点击怪物攻击
      comeHere(eneny,x,y){
        if(eneny){
          if(this.human.itemFunc){
          // console.log('into throw')
          // (Math.abs(x-this.human.attr.pos[0])<=2&&this.human.attr.pos[1]==y)||Math.abs(y-this.human.attr.pos[1])<=2&&this.human.attr.pos[0]==x
          if(1){
            if(this.human.itemFunc(eneny,this.$message,this.map)){//if里面直接会执行一遍函数
              this.itemDel.del()
            }
            this.human.itemFunc = ''
          }
        }else{
          console.log('into hand',eneny)
          let isNear =false;
          if(Math.abs(x-this.human.attr.pos[0])<=1&&this.human.attr.pos[1]==y){
            isNear = true
          }
          if(Math.abs(y-this.human.attr.pos[1])<=1&&this.human.attr.pos[0]==x){
            isNear = true
          }
          if(isNear&&eneny){
            console.log('now you atttack',eneny)
            let enenyLose = this.human.attr.attack-eneny.defense>0?Math.floor((this.human.attr.attack-eneny.defense)*(hu.random1(8,12)*0.1)):1;
            let manLose = eneny.attack - this.human.attr.defense>0?Math.floor((eneny.attack - this.human.attr.defense)*(hu.random1(5,8)*0.1)):1;
            eneny.blood-=enenyLose;
            this.human.attr.blood -=manLose;
            this.$message('你攻击了'+eneny.name+enenyLose+'点血,你损失了'+manLose+'点血')
            
          }
        }
        if(eneny.blood<=0){
          let gain =[]
          for(let i of eneny.fallItem){
            this.human.bag.push(i)
            gain.push(i.name)
          }
          this.$message('你杀死了'+eneny.name+',并且获得了'+gain.join(','))
          this.map[x][y] = '';
        }
          // console.log('after you atttack',eneny.blood)
        }
        
        // if(this.human.itemFunc){
        //   this.human.itemFunc(this.human)
        //   this.human.itemFunc = null
        //   this.itemDel.del()
        // }
      },

      gowalk(){
        let that = this;
        walk.walkWay(that);
      },
      initMap(mapSize){
        this.map = Array(mapSize).fill('')
        for(let i=0;i<mapSize;i++){
          this.map[i] = Array(mapSize).fill('')
        }
        this.map[this.human.attr.pos[0]][this.human.attr.pos[1]] =this.human.attr
        this.huInitMap()
      },
      // 生成坐标
      pos(num){
        var x = hu.random(num)
        var y = hu.random(num)
        if(!this.map[x][y]){
          return [x,y]
        }else{
          return this.pos(num)
        }
      },
      huInitMap(){
        var monsterNum = 20
        var monsterArr = hu.addMonster(monsterNum)
        for(var i=0;i<monsterNum;i++){
          var pos = this.pos(this.mapSize-1)
          var x = pos[0]
          var y = pos[1]
          monsterArr[i]['pos'] = pos
          this.map[x][y] = monsterArr[i]
        }
        this.human.bag.push(hu.fallItem()[0])
        this.human.bag.push(hu.fallItem()[1])
        // this.human.bag.push(hu.fallItem()[1])
        // this.human.bag.push(hu.fallItem()[0])
        // this.human.bag.push(hu.fallItem()[2])
        this.human.bag.push(hu.fallItem()[3])
        this.human.bag.push(hu.fallItem()[2])
        // this.human.bag.push(hu.fallItem()[3])
        // this.human.bag.push(hu.fallItem()[3])
        
      },
    huAction(item,index,type){
      // 添加使用后删除
      if(type=='item'){
        this.itemDel.del = function(){
          this.human.bag.splice(index,1)
          this.itemDel.del = ''
        }.bind(this)
      }
      // 是否对自身使用
      if(item.isMe==1){
        item.func(this.human,this.$message)
        if(type=='item'){
          this.itemDel.del()
        }
      }else{
        // 使用物品
        this.human.itemFunc = item.func
      }
      this.bagVisible = false
      this.skillShow = false
      
    },
    itemDel(){},//使用后删除函数，不要删


    },
    beforeMount(){
      this.human = humanBeing
      this.initMap(this.mapSize);
    },
    updated(){

    },
    mounted(){
      this.gowalk()
      
    }
  }
</script>
<style>
  .c{
    position: fixed;
    left: 40%;
  }
  .cc{
    position: fixed;
    right: 20px;
    top: 40px;
  }
  .viewable{
    background-color: #fff!important; 
  }
  .square{
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    float: left;
    background-color: #ddd
  }
  .row{
    width: 100%;
    overflow: hidden;
  }
  .gameArea{

    width: 95%;
    margin: 0 auto;
  }
  .el-dialog__body>button{
    display: inline-block;
    width: 150px;
    margin: 5px;
  }
  table{
    width: 100%;
  }
  .attrArea{
    width: 200px;
  }
</style>
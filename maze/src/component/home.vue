<template>
  <div id="home">
    <div>let's  go some chicken dinner</div>
    <div class="gameArea" >
      <div >
        <el-button class="snow_on_left" @click="bagShow=true">背包</el-button>  
        <el-button class="snow_on_left" @click="skillShow=true">技能</el-button>  
        <div class="snow_on_right attrArea">
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
      :visible.sync="bagShow"
      width="30%">
       <el-button type="primary" plain v-for="(item,index) in human.bag" @click="huAction(item,index)" :key="index">{{item.name}}</el-button>
    </el-dialog>
    <el-dialog
      :visible.sync="skillShow"
      width="30%">
       <el-button type="primary" plain v-for="(item,index) in human.skill" @click="huAction(item,index)" :key="index">{{item.name}}</el-button>
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
        skillShow:false,
        bagShow:false,
        mapSize:50,
        map:[],
        human:{}
       
      }
    },
    watch:{
      
    },
    methods:{
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
      // 使用物品
      comeHere(square,x,y){
        if(this.human.itemFunc){
          this.human.itemFunc(this.human)
          this.human.itemFunc = null
          this.itemDel.del()
        }
      },
      gowalk(){
        let that = this;
        walk.walkWay(that);
      },
      initMap(mapSize){
        this.map = Array(mapSize).fill(null)
        for(let i=0;i<mapSize;i++){
          this.map[i] = Array(mapSize).fill(null)
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
          this.map[x][y] = monsterArr[i]
        }
        
      },
    huAction(item,index){
      // 添加使用后删除
      this.itemDel.del = function(){
        this.human.bag.splice(index,1)
        this.itemDel.del = null
      }.bind(this)
      this.bagShow = false
      // 是否对自身使用
      if(item.isMe==1){
        item.func(this.human,this.$message)
        this.itemDel.del()
      }else{
        // 使用物品
        this.human.itemFunc = item.func
      }
      
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
  table{
    width: 100%;
  }
  .attrArea{
    width: 200px;
  }
</style>

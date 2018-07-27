<template>
  <div id="home">
    <div>let's  go some chicken dinner</div>
    <div class="gameArea" >
      <div >
        <el-button class="snow_on_left">背包</el-button>  
        <div class="snow_on_right attrArea">
          <span>血量／总血量:{{human.attr.blood}}/{{human.attr.maxBlood}}</span><br>
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
        <!-- <template v-for='row in map'>
            <div class="row">
                <div class="square" v-for='square in row'>
            </div>
            
              
            </div>
          </template> -->
    </div>
    
  </div>
</template>
<script>
  import human from '../assets/js/human.js'
  import walk from '../assets/js/walk.js'
  import hu from '../assets/hu'
  export default{
    data(){
      return{
        mapSize:50,
        map:[],
        human:{  }
       
      }
    },
    watch:{
      
    },
    methods:{
      reverseArray(ele){
        return ele
      },
      showSquare(r){
        var a = '血量：'+ r.blood  + ',攻击：' + r.attack + ',防御：' + r.defense
        return a
      },
      canSee(x,y){
        if(Math.abs(x-this.human.attr.pos[0])<=this.human.attr.view){
          if(Math.abs(y-this.human.attr.pos[1])<=this.human.attr.view){
            return true
          }
        }
      },
      comeHere(square,x,y){

        console.log(232323,x,y);
        let take = Math.abs(x-this.human.attr.pos[0])+Math.abs(y-this.human.attr.pos[1]);
        if(take<=this.human.attr.action){
          this.map[this.human.attr.pos[0]][this.human.attr.pos[1]] = null
          this.human.attr.pos = [x,y];
          this.human.attr.action -=take;
          this.map[this.human.attr.pos[0]][this.human.attr.pos[1]] = this.human.attr
        }else{
          this.$message('您的行动力不够勒')
          console.log('your action is empty')
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
          this.xy(num)
        }
      },
      huInitMap(){
        var monsterNum = 10
        var monsterArr = hu.addMonster(monsterNum)
        for(var i=0;i<monsterNum;i++){
          var pos = this.pos(49)
          var x = pos[0]
          var y = pos[1]
          this.map[x][y] = monsterArr[i]
        }
        
      },
    },


    beforeMount(){
      this.human = human
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

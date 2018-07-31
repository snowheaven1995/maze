<template>
  <div id="home">
    <div>let's  go some chicken dinner</div>
    <div class="gameArea" >
      <div >
        <el-button class="snow_on_left" @click="bagVisible=true">背包</el-button>  
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
      :visible.sync="bagVisible"
      width="30%">
       <el-button type="primary" plain v-for="(item,index) in human.bag" @click="itemUse(item,index)" :key="index">{{item.name}}</el-button>
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
  import range from '../assets/js/range.js'
  export default{
    data(){
      return{
        skillShow:false,
        bagVisible:false,
        mapSize:50,
        map:[],
        human:{},
        attackHigh:12,
        attackLow:8
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
      handRange(rangeVal,x,y){
        // if((Math.abs(x-this.human.attr.pos[0])<=rangeVal&&this.human.attr.pos[1]==y)||Math.abs(y-this.human.attr.pos[1])<=rangeVal&&this.human.attr.pos[0]==x){
        //   return true
        // }
        if((Math.abs(x-this.human.attr.pos[0])<=rangeVal&&this.human.attr.pos[1]==y)){
          for(let i=1;i<rangeVal;i++){
            if(x>this.human.attr.pos[0]){
              if(this.map[this.human.attr.pos[0]+i][this.human.attr.pos[1]]){
                return this.map[this.human.attr.pos[0]+i][this.human.attr.pos[1]]
              }
            }else{
              if(this.map[this.human.attr.pos[0]-i][this.human.attr.pos[1]]){
                return this.map[this.human.attr.pos[0]+i][this.human.attr.pos[1]]
              }
            }
          }
        }else if(Math.abs(y-this.human.attr.pos[1])<=rangeVal&&this.human.attr.pos[0]==x){
          for(let i=1;i<rangeVal;i++){
            if(x>this.human.attr.pos[1]){
              if(this.map[this.human.attr.pos[1]+i][this.human.attr.pos[0]]){
                return this.map[this.human.attr.pos[0]+i][this.human.attr.pos[1]]
              }
            }else{
              if(this.map[this.human.attr.pos[1]-i][this.human.attr.pos[0]]){
                return this.map[this.human.attr.pos[0]+i][this.human.attr.pos[1]]
              }
            }
          }
        }
      },
      range(rangeVal,x,y){
        if((Math.abs(x-this.human.attr.pos[0])<rangeVal)&&Math.abs(x-this.human.attr.pos[1])<rangeVal){
          return true
        }
      },
      canSee(x,y){
        if(Math.abs(x-this.human.attr.pos[0])<=this.human.attr.view){
          if(Math.abs(y-this.human.attr.pos[1])<=this.human.attr.view){
            return true
          }
        }
      },
      itemUse(item,idx){
         console.log(item)
        if(item.type == 1){
          item.func(this.human.attr,this.$message)
        } else if(item.type==2){
          this.human.catch = item;
          console.log(this.human.catch)
          this.human.catch['idx'] = idx
        }
        this.bagVisible = false
      },
      // 点击怪物攻击
      comeHere(eneny,x,y){
        console.log(this.human.catch)
        if(eneny){
          if(this.human.catch.name){
          console.log('into throw')
          if(this.handRange(2,x,y)){
            this.human.catch.func(eneny);
            this.human.bag.splice(this.human.catch.idx,1);
            this.human.catch = {}
          }
          // if((Math.abs(x-this.human.attr.pos[0])<=2&&this.human.attr.pos[1]==y)||Math.abs(y-this.human.attr.pos[1])<=2&&this.human.attr.pos[0]==x){
            
          // }
        }else{
          console.log('into hand',eneny)
          // let isNear =false;
          // if(Math.abs(x-this.human.attr.pos[0])<=1&&this.human.attr.pos[1]==y){
          //   isNear = true
          // }
          // if(Math.abs(y-this.human.attr.pos[1])<=1&&this.human.attr.pos[0]==x){
          //   isNear = true
          // }
          console.log('now you atttack',range.handRange(this.map,this.human.attr,4,x,y));
            let attackObj = range.handRange(this.map,this.human.attr,4,x,y);
            let enenyLose = this.human.attr.attack-attackObj.defense>0?Math.floor((this.human.attr.attack-attackObj.defense)*(hu.random1(8,12)*0.1)):1;
            let manLose = attackObj.attack - this.human.attr.defense>0?Math.floor((attackObj.attack - this.human.attr.defense)*(hu.random1(5,8)*0.1)):1;
            attackObj.blood-=enenyLose;
            this.human.attr.blood -=manLose;
            this.$message('你攻击了'+attackObj.name+enenyLose+'点血,你损失了'+manLose+'点血')
          // if(range.handRange(this.human.attr,3,x,y)&&eneny){
            
            
          // }
        }
        if(attackObj.blood<=0){
          let gain =[]
          for(let i of attackObj.fallItem){
            this.human.bag.push(i)
            gain.push(i.name)
          }
          this.$message('你杀死了'+attackObj.name+',并且获得了'+gain.join(','))
          this.map[x][y] = null;
        }
          console.log('after you atttack',attackObj.blood)
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
        var monsterNum = 50
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
      this.bagVisible = false
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
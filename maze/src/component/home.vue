<template>
  <div id="home">
    <div>let's  go some chicken dinner</div>
    <div class="gameArea">
      <table cellspacing="0">
        <tr v-for='(row,rowIdx) in map' class="row">
          <template v-for='(square,index) in row'>
            <el-tooltip class="item" effect="dark" :content="showSquare(square)" placement="top-start" v-if="square">
              <td class="square" :class='{viewable:canSee(rowIdx,index)}' @click='comeHere(square,rowIdx,index)'>{{square.name}}</td>
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
      initMap(mapSize){
        this.map = Array(mapSize).fill(null)
        for(let i=0;i<mapSize;i++){
          this.map[i] = Array(mapSize).fill(null)
        }
        
        this.map[this.human.attr.pos[0]][this.human.attr.pos[1]] =this.human.attr
        this.map[8][6] = hu.addMonster(1)[0]
      }
    },
    beforeMount(){
      this.human = human
      this.initMap(this.mapSize);
    },
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
</style>

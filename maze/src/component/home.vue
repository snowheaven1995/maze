<template>
  <div id="home">
    <div>let's  go some chicken dinner</div>
    <div class="gameArea">
      <table cellspacing="0">
        <tr v-for='(row,rowIdx) in map' class="row">
          <td  v-for='(square,index) in row' class="square" :class='{viewable:canSee(rowIdx,index)}' @click='comeHere(square,rowIdx,index)'>{{square}}</td>
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
  export default{
    data(){
      return{
        mapSize:50,
        map:[],
        human:{
          pos:[5,8],
          viewSize:1,
          action:10
        }
       
      }
    },
    watch:{
      human:{
          handler: function (val, old) {
            console.log('it change')
                // this.elWidth();
          },
          deep:true
        },
    },
    methods:{
      canSee(x,y){
        if(Math.abs(x-this.human.pos[0])<=this.human.viewSize){
          if(Math.abs(y-this.human.pos[1])<=this.human.viewSize){
            return true
          }
        }
      },
      comeHere(square,x,y){
        console.log(232323,x,y);
        let take = Math.abs(x-this.human.pos[0])+Math.abs(y-this.human.pos[1]);
        if(take<=this.human.action){
          this.map[this.human.pos[0]][this.human.pos[1]] = null
          this.human.pos = [x,y];
          this.human.action -=take;
          this.map[this.human.pos[0]][this.human.pos[1]] = '我'
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
        this.map[this.human.pos[0]][this.human.pos[1]] = '我'
      }
    },
    beforeMount(){
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
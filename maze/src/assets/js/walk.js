var walk = {
    walkWay(that){
        document.onkeydown = function(ev){
            var ev = ev || window.event;
            if(that.human.attr.action>0){
              switch(ev.keyCode){
              
              case 87:
              that.$set(that.map[that.human.attr.pos[0]],that.human.attr.pos[1],null)
              // that.map[that.human.attr.pos[0]][that.human.attr.pos[1]] = null
              that.human.attr.pos[0] -=1 ;
              that.human.attr.action -=1;
              that.$set(that.map[that.human.attr.pos[0]],that.human.attr.pos[1],that.human.attr)
              that.map = that.map.filter(that.reverseArray)
              break
              case 83:
              that.$set(that.map[that.human.attr.pos[0]],that.human.attr.pos[1],null)
                that.human.attr.pos[0] +=1 ;
                that.human.attr.action -=1;
                that.$set(that.map[that.human.attr.pos[0]],that.human.attr.pos[1],that.human.attr)
                that.map = that.map.filter(that.reverseArray)
            
              break;
              case 65:
              that.map[that.human.attr.pos[0]][that.human.attr.pos[1]] = null
              that.human.attr.pos[1] -=1 ;
              that.human.attr.action -=1;
              that.map[that.human.attr.pos[0]][that.human.attr.pos[1]] = that.human.attr
              that.map = that.map.filter(that.reverseArray)
              break
              case 68:
              that.map[that.human.attr.pos[0]][that.human.attr.pos[1]] = null
              that.human.attr.pos[1] +=1 ;
              that.human.attr.action -=1;
              that.map[that.human.attr.pos[0]][that.human.attr.pos[1]] = that.human.attr
              that.map = that.map.filter(that.reverseArray)
              break;
             
          }
            }else{
              that.$message('您的行动力花完勒')
            }
            
            
        }.bind(that)
    }
}
export default walk
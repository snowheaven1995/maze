var walk = {
    goDirection(that,where){
        that.$set(that.map[that.human.attr.pos[0]],that.human.attr.pos[1],null)
        switch(where){
            case 1:
                let up = that.map[that.human.attr.pos[0]-1][that.human.attr.pos[1]]
                if(!up||up.type==1){
                    that.human.attr.pos[0] -=1;
                }else{
                    that.$message('挡住勒。先把敌人清理了')
                }
                break;
            case 2:
                let down = that.map[that.human.attr.pos[0]+1][that.human.attr.pos[1]]
                if(!down||down.type==1){
                    that.human.attr.pos[0] +=1;
                }else{
                    that.$message('挡住勒。先把敌人清理了')
                }
                
                break;
            case 3:
                let left = that.map[that.human.attr.pos[0]][that.human.attr.pos[1]-1]
                if(!left||left.type==1){
                    that.human.attr.pos[1] -=1;
                }else{
                    that.$message('挡住勒。先把敌人清理了')
                }
                break
            case 4:
                let right = that.map[that.human.attr.pos[0]][that.human.attr.pos[1]+1]
                if(!right||right.type==1){
                    that.human.attr.pos[1] +=1;
                }else{
                    that.$message('挡住勒。先把敌人清理了')
                }
                break
        }
        that.human.attr.action -=1;
        that.$set(that.map[that.human.attr.pos[0]],that.human.attr.pos[1],that.human.attr)
        that.map = that.map.filter(that.reverseArray)
    },
    walkWay(that){
        document.onkeydown = function(ev){
            var ev = ev || window.event;
            if(that.human.attr.action>0){
              switch(ev.keyCode){
              case 87:
                walk.goDirection(that,1)
                break
              case 83:
                walk.goDirection(that,2)
                break;
              case 65:
                walk.goDirection(that,3)
                break
              case 68:
                walk.goDirection(that,4)
                break;
          }
            }else{
              that.$message('您的行动力花完勒')
            }       
        }.bind(that)
    }
}
export default walk
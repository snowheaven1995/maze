var walk = {
    goDirection(that,where){
        that.$set(that.map[that.human.attr.pos[0]],that.human.attr.pos[1],null)
        switch(where){
            case 1:
            if(that.human.attr.pos[0] -1>=0){
                let up = that.map[that.human.attr.pos[0]-1][that.human.attr.pos[1]]
                if(!up){
                    // console.log(up)
                        that.human.attr.pos[0] -=1;
                }else{
                    that.$message('挡住勒。先把敌人清理了')
                }
            }else{
                that.$message('到边了，别走了')
            }
                
                break;
            case 2:
            if(that.human.attr.pos[0] <49){
                let down = that.map[that.human.attr.pos[0]+1][that.human.attr.pos[1]]
                if(!down){
                    // console.log(down)
                    
                        that.human.attr.pos[0] +=1;
                    
                   
                }else{
                    that.$message('挡住勒。先把敌人清理了')
                }
            }else{
                that.$message('到边了，别走了')
            }
                break;
            case 3:
            if(that.human.attr.pos[1] -1>=0){
                let left = that.map[that.human.attr.pos[0]][that.human.attr.pos[1]-1]
                if(!left){
                    console.log(left)
                    
                        that.human.attr.pos[1] -=1;
                    
                    
                }else{
                    that.$message('挡住勒。先把敌人清理了')
                }
            }else{
                that.$message('到边了，别走了')
            }
                break
            case 4:
            if(that.human.attr.pos[1] <49){
                let right = that.map[that.human.attr.pos[0]][that.human.attr.pos[1]+1]
                if(!right){
                   
                        that.human.attr.pos[1] +=1;
                   
                   
                }else{
                    that.$message('挡住勒。先把敌人清理了')
                }
            }else{
                that.$message('到边了，别走了')
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
                var data = {
                    msg:'开始',
                }
                data = JSON.stringify(data)
                that.$ws.send(data)
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
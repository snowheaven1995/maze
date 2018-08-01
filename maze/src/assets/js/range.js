var range = {
    handRange(map,human,rangeVal,x,y){
      console.log(human)
      console.log(rangeVal,x,y)
        if((Math.abs(x-human.pos[0])<=rangeVal&&human.pos[1]==y)){
            for(let i=1;i<rangeVal;i++){
              if(x>human.pos[0]){
                if(map[human.pos[0]+i][human.pos[1]]){
                  return map[human.pos[0]+i][human.pos[1]]
                }
              }else{
                if(map[human.pos[0]-i][human.pos[1]]){
                  return map[human.pos[0]-i][human.pos[1]]
                }
              }
            }
          }else if(Math.abs(y-human.pos[1])<=rangeVal&&human.pos[0]==x){
            for(let i=1;i<rangeVal;i++){
              if(y>human.pos[1]){
                if(map[human.pos[0]][human.pos[1]+i]){
                  return map[human.pos[0]][human.pos[1]+i]
                }
              }else{
                if(map[human.pos[0]][human.pos[1]-i]){
                  return map[human.pos[0]][human.pos[1]-i]
                }
              }
            }
          }
    }
}
export default range
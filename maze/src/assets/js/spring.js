var spring ={
    type:1,
    name:'泉',
    attack:1,
    defense:1,
    belong:'',
    func:function(man){
        console.log(man)
        man.blood+=100;
        man.action = 0;
    }
}
export default spring
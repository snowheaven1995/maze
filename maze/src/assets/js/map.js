var map = [];
const mapSize = 50
map = Array(mapSize).fill('')
for(let i=0;i<mapSize;i++){
    map[i] = Array(mapSize).fill('')
}
console.log('init map success',map)
export default map
var map = [];
const mapSize = 50
map = Array(mapSize).fill(null)
for(let i=0;i<mapSize;i++){
    map[i] = Array(mapSize).fill(null)
}
console.log('init map success',map)
export default map
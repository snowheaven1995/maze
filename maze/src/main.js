import Vue from 'vue'
import App from './App.vue'
import humanBeing from './assets/js/human.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';	
// import router from './router/'
Vue.use(ElementUI);
Vue.prototype.$ws = new WebSocket('ws://192.168.1.245:8090/notify'); 
Vue.prototype.$ws.onopen = () => {  // 连接建立好后的回调
                
          }
Vue.prototype.$ws.onmessage = (e) => {  // 收到服务器发送的消息后执行的回调
// var data = JSON.parse(e.data)


console.log(JSON.stringify(humanBeing))
// this.map = data.map
// this.playerLength = data.player
// console.log("gameStart ok")
}
Vue.prototype.$ws.onerror = (ev) => {
    console.log("error")
}
Vue.prototype.$ws.onclose = (ev) => {
    console.log("wscolse")
}
new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})

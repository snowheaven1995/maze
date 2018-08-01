import Vue from 'vue'
import App from './App.vue'
import humanBeing from './assets/js/human.js'
import map from './assets/js/map.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';	
// import router from './router/'
Vue.use(ElementUI);
Vue.prototype.$ws = new WebSocket('ws://192.168.1.245:8090/notify'); 
Vue.prototype.$map1 = 0
Vue.prototype.$ws.onopen = () => {
                // 连接建立好后的回调
          }
Vue.prototype.$ws.onmessage = (e) => {  // 收到服务器发送的消息后执行的回调


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

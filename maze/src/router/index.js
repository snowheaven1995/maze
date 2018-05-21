import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router.config'

Vue.use(VueRouter);


const router = new VueRouter({
	mode:'history',
	routes:routerConfig,
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})


export default router



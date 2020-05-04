import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
	{
		path:'/login',
		hidden:true,
		component: r => require(['./pages/Login/Login.vue'],r)
	},
	{
		path:'/',
		hidden:false,
		component: r => require(['./pages/Login/Login.vue'],r)
	}
]

export default new Router({
	mode:'history',
	routes:routes
})
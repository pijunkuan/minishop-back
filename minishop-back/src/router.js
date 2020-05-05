import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout'

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
		redirect:'/login'
	},
	{
		path:'/dashboard',
		hidden:false,
		meta:{ title:'首页' },
		component: Layout,
		children:[
			{ path:'', component: r => require(['./pages/Home/index.vue'],r) }
		]
	},
	{
		path:'/product',
		hidden:false,
		meta:{ title:'商品管理' },
		component: Layout,
		children:[
			{ path:'list', component: r => require(['./pages/Products/ItemList.vue'],r) },
			{ path:'edit', component: r => require(['./pages/Products/ItemEdit.vue'],r) }
		]
	}
]

export default new Router({
	mode:'history',
	routes:routes
})
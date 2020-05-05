import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout'

Vue.use(Router)

export const allRoutes = [
	{
		path:'/login',
		hidden:true,
		component: r => require(['./pages/Login/Login.vue'],r)
	},
	{
		path:'/',
		hidden:true,
		redirect:'/login'
	},
	{
		path:'/dashboard',
		hidden:false,
		meta:{ title:'首页', icon:'iconshouye' },
		component: Layout,
		children:[
			{ path:'', name:'Dashboard', component: r => require(['./pages/Home/index.vue'],r) }
		]
	},
	{
		path:'/product',
		hidden:false,
		meta:{ title:'商品管理', icon:'iconliwu' },
		component: Layout,
		children:[
			{ path:'list', name:'ProductList', component: r => require(['./pages/Products/ItemList.vue'],r), meta:{ title:'商品列表', icon:'iconlihe' }, hidden:true },
			{ path:'edit', name:'ProductItem', component: r => require(['./pages/Products/ItemEdit.vue'],r), meta:{ title:'商品详情', icon:'iconbianji' }, hidden:true }
		]
	},
	{
		path:'/order',
		hidden:false,
		meta:{ title:'订单管理', icon:'icondingdan' },
		component: Layout,
		children:[
			{ path:'list', name:'OrderList', component: r => require(['./pages/Products/ItemList.vue'],r), meta:{ title:'订单列表', icon:'iconwenjuan' }, hidden:true },
			{ path:'detail', name:'OrderDetail', component: r => require(['./pages/Products/ItemEdit.vue'],r), meta:{ title:'订单详情', icon:'icondingdan' }, hidden:true }
		]
	}
]

export default new Router({
	mode:'history',
	routes:allRoutes
})
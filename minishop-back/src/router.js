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
		path:'/order',
		hidden:false,
		meta:{ title:'订单管理', icon:'icondingdan' },
		component: Layout,
		children:[
			{ path:'list', name:'OrderList', component: r => require(['./pages/Orders/OrderList.vue'],r), meta:{ title:'订单列表', icon:'iconwenjuan' }, hidden:false },
			{ path:'detail', name:'OrderDetail', component: r => require(['./pages/Orders/OrderDetail.vue'],r), meta:{ title:'订单详情', icon:'icondingdan' }, hidden:true }
		]
	},
	{
		path:'/product',
		hidden:false,
		meta:{ title:'商品管理', icon:'iconliwu' },
		component: Layout,
		children:[
			{ path:'list', name:'ProductList', component: r => require(['./pages/Products/ItemList.vue'],r), meta:{ title:'商品列表', icon:'iconlihe' }, hidden:false },
			{ path:'edit', name:'ProductItem', component: r => require(['./pages/Products/ItemEdit.vue'],r), meta:{ title:'商品修改', icon:'iconbianji' }, hidden:true },
			{ path:'add', name:'ProductAdd', component: r => require(['./pages/Products/ItemAdd.vue'],r), meta:{ title:'新增商品', icon:'icondingdan' }, hidden:false }
		]
	},
	{
		path:'/customer',
		hidden:false,
		meta:{ title:'顾客管理', icon:'iconpintuan'},
		component: Layout,
		children:[
			{ path:'list', name:'CustomerList', component: r => require(['./pages/Customer/CustomerList.vue'],r), meta:{ title:'顾客列表', icon:'iconpintuan' }, hidden:false },
		]
	},
	{
		path:'/image',
		hidden:false,
		meta:{ title:'图片管理', icon:'icontupian1'},
		component: Layout,
		children:[
			{ path:'list', name:'ImageList', component: r => require(['./pages/Images/ImageList.vue'],r), meta:{ title:'图片列表', icon:'icontupian1' }, hidden:false },
		]
	},
	{
		path:'/settings',
		hidden:false,
		meta:{ title:'网站设置', icon:'iconshezhi'},
		component: Layout,
		children:[
			{ path:'theme', name:'SetTheme', component: r => require(['./pages/Setting/SetTheme.vue'],r), meta:{ title:'主题设置', icon:'icontupian1' }, hidden:false },
			{ path:'shipment', name:'SetShip', component: r => require(['./pages/Setting/SetShip.vue'],r), meta:{ title:'物流设置', icon:'icontupian1' }, hidden:false },
		]
	}
]

export default new Router({
	mode:'history',
	routes:allRoutes
})
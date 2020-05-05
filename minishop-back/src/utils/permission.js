import { getToken, getExtime } from './auth.js'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

router.beforeEach((to,from,next)=>{
	if(getToken()){
		let current = new Date().getTime()
		if(current >= getExtime() * 1){
			Message.error('登录超时，请重新登录')
			store.dispatch('logout')
			next(`/login?redirect=${to.path}`)
		}else{
			store.dispatch('getUserInfo')
			if(to.path === '/login') next('/dashboard')
				else next()
		}
	}else{
		if(to.path === '/login') next()
			else next(`/login?redirect=${to.path}`)
	}
})
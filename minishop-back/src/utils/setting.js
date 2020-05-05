/*
	进入页面前获取主题模版
 */
import router from '@/router'
import defaultSettings from '@/settings'
import store from '@/store'

router.beforeEach((to, from, next) => {
	document.title = defaultSettings.title
	store.dispatch('setTitle',defaultSettings.title)
	next()
})
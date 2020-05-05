/*
	进入页面前获取主题模版
 */
import router from '@/router'
import defaultSettings from '@/settings'

router.beforeEach((to, from, next) => {
	document.title = defaultSettings.title
	next()
})
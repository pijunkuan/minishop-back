/*
	后端数据发起
 */

import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import defaultSettings from '@/settings'
import { Message } from 'element-ui'


const service = axios.create({
	baseURL:defaultSettings.apiURL
})

service.interceptors.request.use(
	config => {
		if(store.getters.token){
			config.headers['Authorization'] = 'Bearer ' + getToken()
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => response,
	error => {
		if(error.response.status === 401){
			Message.error('登录超时，请重新登录')
			store.dispatch('logout')
		}
		return Promise.reject(error)
	}
)

export default service
import request from '@/utils/request'

export function get_theme(){
	return request({
		url:'theme',
		method:'get'
	})
}

export function change_theme(data){
	return request({
		url:'theme',
		method:'post',
		data
	})
}
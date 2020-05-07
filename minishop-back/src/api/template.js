import request from '@/utils/request'

export function get_template(){
	return request({
		url:'template',
		method:'get'
	})
}

export function change_template(data){
	return request({
		url:'template',
		method:'post',
		data
	})
}
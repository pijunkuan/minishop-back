import request from '../utils/request'

export function login(data){
	return request({
		url:'login',
		method:'post',
		data
	})
}


export function get_user(){
	return request({
		url:'',
		method:'get'
	})
}
import request from '../utils/request'

export function get_customer(data){
	return request({
		url:'customer',
		method:'get',
		params:data
	})
}
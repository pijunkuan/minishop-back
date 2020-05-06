import request from '@/utils/request'

export function get_orders(data){
	return request({
		url:'order',
		method:'get',
		params:data
	})
}

export function get_order(no){
	return request({
		url:'order/'+no,
		method:'get'
	})
}

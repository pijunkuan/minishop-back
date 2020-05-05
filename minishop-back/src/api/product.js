import request from '@/utils/request'

export function products(data){
	return request({
		url:'product',
		method:'get',
		params:data
	})
}
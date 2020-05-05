import request from '@/utils/request'

export function productsGet(data){
	return request({
		url:'product',
		method:'get',
		params:data
	})
}
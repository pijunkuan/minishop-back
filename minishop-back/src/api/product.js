import request from '@/utils/request'

export function get_products(data){
	return request({
		url:'product',
		method:'get',
		params:data
	})
}

export function delete_product(id){
	return request({
		url:'product/' + id,
		method:'delete'
	})
}
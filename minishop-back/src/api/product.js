import request from '@/utils/request'

export function get_products(data){
	return request({
		url:'product',
		method:'get',
		params:data
	})
}

export function get_product(id){
	return request({
		url:'product/' + id,
		method:'get'
	})
}


export function edit_product(data,id){
	return request({
		url:'product/' + id,
		method:'put',
		data
	})
}


export function delete_product(id){
	return request({
		url:'product/' + id,
		method:'delete'
	})
}
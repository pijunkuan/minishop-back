import request from '../utils/request'

export function imagesGet(data){
	return request({
		url:'image',
		method:'get',
		params:data
	})
}
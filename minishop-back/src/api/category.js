import request from '../utils/request'

export function get_categories(){
	return request({
		url:'category',
		method:'get'
	})
}
import request from '@/utils/request'

export function get_shipment(){
	return request({
		url:"shipment",
		method:"get"
	})
}

export function update_shipment(id,data){
	return request({
		url:"shipment/" + id,
		method:"put",
		data
	})
}

export function create_shipment(data){
	return request({
		url:"shipment",
		method:"post",
		data
	})
}

export function delete_shipment(id){
	return request({
		url:"shipment/"+ id,
		method:"delete"
	})
}
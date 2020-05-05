import Cookies from 'js-cookie'

export function getToken(){
	return Cookies.get('backToken')
}

export function setToken(token){
	return Cookies.set('backToken',token)
}

export function removeToken(){
	return Cookies.remove('backToken')
}

export function getExtime(){
	return Cookies.get('backTime')
}

export function setExtime(time){
	return Cookies.set('backTime',time)
}

export function removeExtime(){
	return Cookies.remove('backTime')
}
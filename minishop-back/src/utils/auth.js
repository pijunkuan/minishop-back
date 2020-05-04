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
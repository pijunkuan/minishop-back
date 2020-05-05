import { getToken, setToken, removeToken, getExtime, setExtime, removeExtime } from '@/utils/auth'
import { login, get_user } from '@/api/login'

const user = {
	state:{
		token:getToken(),
		expire_time:getExtime(),
		username:''
	},
	mutations:{
		SET_USER:(state,username)=>{
			state.username = username
		},
		SET_TOKEN:(state,token)=>{
			state.totken = token
		},
		SET_TIME:(state, time)=>{
			state.expire_time = time
		}
	},
	actions:{
		login({commit},info){
			return new Promise((resolve,reject)=>{
				login(info).then(r=>{
					let expire = new Date().getTime() + r.data.body.expires_in * 1000
					commit('SET_TOKEN',r.data.body.access_token)
					commit('SET_TIME',expire)
					setToken(r.data.body.access_token)
					setExtime(expire)
					resolve(r)
				}).catch(e=>{
					reject(e)
				})
			})
		},
		getUserInfo({commit}){
			return new Promise((resolve,reject)=>{
				get_user().then(r=>{
					commit('SET_USER',r.data.body.username)
					resolve(r)
				}).catch(e=>{
					reject(e)
				})
			})
		},
		logout({commit}){
			removeToken()
			removeExtime()
			commit('SET_TOKEN','')
		}
	}
}

export default user
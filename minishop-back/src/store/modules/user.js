import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/login'

const user = {
	state:{
		token:getToken()
	},
	mutations:{
		SET_TOKEN:(state,token)=>{
			state.totken = token
		}
	},
	actions:{
		login({commit},info){
			return new Promise((resolve,reject)=>{
				login(info).then(r=>{
					commit('SET_TOKEN',r.data.body.access_token)
					setToken(r.data.body.access_token)
					resolve()
				}).catch(e=>{
					reject(e)
				})
			})
		},
		logout({commit}){
			removeToken()
			commit('SET_TOKEN','')
		}
	}
}

export default user
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import web from './modules/web'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		user,
		web
	},
	getters
})

export default store
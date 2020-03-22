import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
	state: {
		cartList: []
	},
	mutations,
	actions,
	getters,
})

export default store
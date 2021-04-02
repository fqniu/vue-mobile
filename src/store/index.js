import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        historyArr: [],
        aliasName: '',
    },
    mutations: {
    },
    getters:{},
    actions: {
        //设置token
        setAliasName(
            {commit}, aliasName) 
            {commit('setAliasName', aliasName)
        },
    },
    modules: {
        user,
    }
})
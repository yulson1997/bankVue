import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const state = {
    acctInfoList: []
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]//会自动保存创建的状态，浏览器强制刷新数据存在
})

export default store
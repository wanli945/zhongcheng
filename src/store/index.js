import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import modules from "./modules/index"
import getters from "./getters"

Vue.use(Vuex)
export default new Vuex.Store({
    state,  // 根级别的 state
    getters, //
    mutations,
    actions,
    modules,
    plugins: [],
    strict: process.env.NODE_ENV !== 'production',
    devtools: true
})

import * as types from '@/store/types.js'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const testMode = process.env.NODE_ENV === 'development'
const vscode = testMode
    ? {
          info: 'test code',
      }
    : acquireVsCodeApi()
export default new Vuex.Store({
    state: {
        vscode,
    },
    getters: {
        vscode: state => {
            return state.vscode
        },
    },
    mutations: {
        [types.TEST_MUTATIONS]: (state, arg) => {
            console.log('test mutations')
            console.log(arg)
        },
    },
    actions: {
        [types.TEST_ACTIONS]: context => {
            // 1.0 重置拖动请求和放置请求
            console.log('action invoke')
            context.commit(types.TEST_MUTATIONS, 'action invoke')
        },
    },
})

import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils/utils.js'
import bus from '@/utils/bus.js'
import * as types from '@/store/types.js'
import fakeVscode from '@/test/fake-vscode.js'
Vue.use(Vuex)
// 通过bus对后端返回数据进行统一的触发
window.addEventListener('message', event => {
    console.log(event)
    let data = event.data
    bus.publish(data.key, event.data)
})
const testMode = process.env.NODE_ENV === 'development'
const vscode = testMode ? fakeVscode : acquireVsCodeApi()
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
        [types.TEST_ACTIONS]: async context => {
            return new Promise((resolve, reject) => {
                console.log('action invoke')
                context.commit(types.TEST_MUTATIONS, 'action invoke')
                reject('error')
            })
        },
        [types.TEST_POSTMESSAGE]: (context, arg) => {
            return new Promise((resolve, reject) => {
                // 通过唯一key 来确保获取的消息就是发送的消息
                let key = utils.randomString(8)
                let hander = info => {
                    resolve(info)
                    bus.unsubscribe(key) // 获取消息后直接释放
                }
                bus.subscribe(key, hander)
                arg.key = key
                vscode.postMessage(arg)
                console.log(bus)
            })
        },
    },
})

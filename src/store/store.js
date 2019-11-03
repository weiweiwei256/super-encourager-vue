import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/global/utils.js'
import bus from '@/global/bus.js'
import * as types from '@/store/types.js'
import fakeVscode from '@/test/fake-vscode.js'
Vue.use(Vuex)
// 通过bus对后端返回数据进行统一的触发
window.addEventListener('message', event => {
    let { data } = event
    if (data.msgCode) {
        bus.publish(data.msgCode, event.data)
    } else {
        console.error('未识别message' + JSON.stringify(event))
    }
})
// 根据环境提供对应vscode对象
const testMode = process.env.NODE_ENV === 'development'
const vscode = testMode ? fakeVscode : acquireVsCodeApi()
const store = new Vuex.Store({
    state: {
        vscode,
        setting: {}, // 包含 extension-setting和web-setting
    },
    getters: {
        vscode: state => {
            return state.vscode
        },
        setting: state => {
            return state.setting
        },
    },
    mutations: {
        [types.TEST_MUTATIONS]: (state, arg) => {
            console.log('test mutations')
            console.log(arg)
        },
        [types.SET_SETTING]: (state, setting) => {
            state.setting = setting
            console.log('设置setting完成')
        },
    },
    actions: {
        [types.TEST_ACTIONS]: async context => {
            return new Promise((resolve, reject) => {
                console.log('action invoke')
                context.commit(types.TEST_MUTATIONS, 'action invoke')
            })
        },
        [types.POST_MESSAGE]: (context, { cmdKey, value }) => {
            return new Promise((resolve, reject) => {
                // 通过唯一msgCode 来确保获取的消息就是发送的消息
                let msgCode = utils.randomString(8)
                let hander = info => {
                    resolve(info)
                    bus.unsubscribe(msgCode) // 获取消息后直接释放
                }
                // TODO: 超时自动销毁逻辑 toast提示
                bus.subscribe(msgCode, hander)
                // encode
                let sendPkg = {
                    msgCode,
                    cmdKey,
                    value,
                }
                vscode.postMessage(sendPkg)
            })
        },
    },
})
export default store

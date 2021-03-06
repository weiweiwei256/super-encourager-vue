import Vue from 'vue'
import './plugins/axios'
import 'flex.css'
import App from './App.vue'
import './plugins/element.js'
import filters from '@/filters/index.js'
import store from './store/store.js'
import * as types from '@/store/types.js'
import * as cmds from '@/store/cmd-constant.js'
import driver from './global/driver.js'
Vue.config.productionTip = false
// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
// 全局混入vuex快捷访问方法
Vue.mixin({
    data() {
        return {
            // 全局混入常量
            // page:
            ENCOURAGER: 'encourager',
            ENTERTAINMENT: 'entertainment',
            COMMONAPI: 'common-API',
            TOOLS: 'tools',
            WEB_CONFIG: 'web-config',
            ABOUT: 'about',
            RECOMMENDATION: 'recommendation',
            TEST: 'test',
        }
    },
    methods: {
        dispatch: function(name, arg) {
            return store.dispatch(name, arg)
        },
        commit: function(name, arg) {
            return store.commit(name, arg)
        },
        getters: function(name, arg) {
            return arg ? store.getters[name](arg) : store.getters[name]
        },
        // 发送命令到extension 并返回结果
        async sendMessage(cmdKey, value = {}) {
            let data = await this.dispatch(types.POST_MESSAGE, { cmdKey, value })
            console.log('前端页面收到:' + JSON.stringify(data))
            return data
        },
    },
})
// 由于获取初始化 是异步返回 而很多页面高度依赖settings 所以初始化逻辑置于vue渲染之前
store.dispatch(types.POST_MESSAGE, { cmdKey: cmds.INIT }).then(result => {
    console.log(result)
    store.commit(types.SET_SETTING, result)
    let vm = new Vue({
        store,
        render: h => h(App),
    }).$mount('#app')
    if (!result.globalState.common.hasActiveDriver) {
        driver.start(vm)
        vm.sendMessage(cmds.UPDATE_WEB_CONFIG, {
            scope: 'globalState',
            key: 'hasActiveDriver',
            value: true,
            sub: 'common',
        })
    }
})

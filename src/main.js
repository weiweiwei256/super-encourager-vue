import Vue from 'vue'
import './plugins/axios'
import 'flex.css'
import App from './App.vue'
import './plugins/element.js'
import store from './store/store.js'
import * as types from '@/store/types.js'
Vue.config.productionTip = false
// 全局混入vuex快捷访问方法
Vue.mixin({
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
        async sendMessage(cmdKey, value) {
            let data = await this.dispatch(types.POST_MESSAGE, { cmdKey, value })
            console.log('前端页面收到:' + JSON.stringify(data))
            return data
        },
    },
})
new Vue({
    store,
    render: h => h(App),
}).$mount('#app')

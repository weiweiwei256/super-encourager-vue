import Vue from 'vue'
import './plugins/axios'
import 'flex.css'
import App from './App.vue'
import './plugins/element.js'
import store from './store/store.js'

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')

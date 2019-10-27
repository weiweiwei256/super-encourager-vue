import Vue from 'vue'
import './plugins/axios'
import 'flex.css'
import App from './App.vue'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

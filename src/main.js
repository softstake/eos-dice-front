import Vue from 'vue'
import App from './App.vue'
import Toast from 'buefy/dist/components/toast'
import Modal from 'buefy/dist/components/modal'
import store from './store'

import 'buefy/dist/buefy.css'

require('./mystyles.scss')


Vue.prototype.$contractAccount = 'sevenscasino'

Vue.use(Toast)
Vue.use(Modal)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import Toast from 'buefy/dist/components/toast'
import Modal from 'buefy/dist/components/modal'
import Snotify, { SnotifyPosition } from 'vue-snotify';
import store from './store'

import 'buefy/dist/buefy.css'
require('./mystyles.scss')

Vue.prototype.$contractAccount = 'casinosevens'

const options = {
    toast: {
        position: SnotifyPosition.centerTop,
        timeout: 3000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false
    }
}

Vue.use(Toast)
Vue.use(Modal)
Vue.use(Snotify, options)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
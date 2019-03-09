import Vue from 'vue'
import App from './App.vue'
import Toast from 'buefy/dist/components/toast'
import Modal from 'buefy/dist/components/modal'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import FlagIcon from 'vue-flag-icon'
import store from './store'
import i18n from './i18n'

require('./css/mystyles.scss')

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
Vue.use(FlagIcon)

new Vue({
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')
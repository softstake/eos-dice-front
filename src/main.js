import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Toast from 'buefy/dist/components/toast'
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import Eos from 'eosjs';
import network from './network'

import 'buefy/dist/buefy.css'

require('./mystyles.scss')


ScatterJS.plugins( new ScatterEOS() )

Vue.prototype.$scatter = undefined
Vue.prototype.$eos = undefined
Vue.prototype.$account = undefined
Vue.prototype.$contractAccount = 'sevenscas1no'

Vue.use(Toast)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
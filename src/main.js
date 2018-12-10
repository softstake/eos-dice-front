import Vue from 'vue'
import App from './App.vue'
import Toast from 'buefy/dist/components/toast'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs2'
import store from './store'

import 'buefy/dist/buefy.css'

require('./mystyles.scss')


//ScatterJS.plugins( new ScatterEOS() )

//Vue.prototype.$account = undefined
Vue.prototype.$contractAccount = 'sevenscas1no'

Vue.use(Toast)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
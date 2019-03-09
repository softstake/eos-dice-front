import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  
  plugins: [createPersistedState()],

  state: {
    account: {},
    locale: undefined,
  },

  mutations: {
    UPDATE_ACCOUNT(state, account) {
      state.account = account
    },
    UPDATE_LOCALE(state, locale) {
      state.locale = locale
    }
  }
})


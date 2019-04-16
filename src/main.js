import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import Vuex from 'vuex'
import vueRouter from 'vue-router'
import router from './router'

import store from './store'

Vue.config.productionTip = false

Vue.use(vueRouter)
Vue.use(Vuex)



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'

import './plugins/vuetify'

//import Vuetify from 'vuetify'
import './plugins/base'
import Vuex from 'vuex'

import vueRouter from 'vue-router'
import router from './router/router'

import App from './App.vue'

import store from './store'
import tinyEditor from './core/components/tinyEditor' //loads the template file

Vue.config.productionTip = false

Vue.component('vue-tinymce', tinyEditor)

Vue.use(vueRouter)
Vue.use(Vuex)
//Vue.use(Vuetify)



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

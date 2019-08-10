import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import theme from './theme'

 

Vue.use(Vuetify,
  
  {
  iconfont: 'md',
  theme: theme,
  
})

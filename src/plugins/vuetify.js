import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify,
  
  {
  iconfont: 'md',
  theme: {
    primary: "#3F51B5",
    secondary: "#CDDC39",
    accent: "#2196F3",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196f3",
    success: "#64DD17",
    tertiary:colors.cyan.darken2,
    
    s_dark: "#006978",
 
  },
})

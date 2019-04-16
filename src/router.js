//import Vue from 'vue'
import VueRouter from 'vue-router'

import Pages from './components/Editor/pageList.vue'




const routes = [
  { path: '/pages', component: Pages },
  

]


export default  new VueRouter({mode: 'history', routes})
    
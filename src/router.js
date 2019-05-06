//import Vue from 'vue'
import VueRouter from 'vue-router'

import pageList from './components/Editor/pageList.vue'
import homePage from './components/home/home.vue'
import signUp from './components/auth/signUp.vue'
import signIn from './components//auth/signIn.vue'
import sites from './components/sites/sites.vue'
import start from './components/home/letsGetStarted.vue'

// page for creating a new site
import newSite from './components/sites/newSite.vue'

const routes = [
  {path: '/', component: homePage},
  {path: '/signUp',component: signUp},
  {path: '/signIn',component: signIn},
  { path: '/pages', component: pageList },
  { path: '/sites', component: sites },
  { path: '/start', component: start },
  { path: '/newSite', component: newSite },
  

]


export default  new VueRouter({mode: 'history', routes})
    
//import Vue from 'vue'
import VueRouter from 'vue-router'



import pageList from '@/core/views/pageList.vue'
import homePage from '@/core/views/home.vue'
import signUp from '@/components/auth/signUp.vue'
import signIn from '@/components/auth/signIn.vue'
import sites from '@/core/views/sites.vue'
import start from '@/core/views/letsGetStarted.vue'

//import sandpitLayout from './components/Editor/sandpit/sandpitLayout'


import templateMaster from '@/components/Editor/templates/master'

// page for creating a new site
import newSite from '@/core/views/newSite.vue'

const routes = [
  {path: '/', name:'home', component: homePage},
  {path: '/signUp',component: signUp},
  {path: '/signIn',component: signIn},
  { path: '/pages', component: pageList },
  { path: '/siteList', component: sites},
  { path: '/start', component: start },
  { path: '/newSite', component: newSite},
  { path: '/master', component: templateMaster},




  //{ path: '/sandpit', component: sandpitLayout },



]


let router = new VueRouter({mode: 'history', routes})
/* router.beforeEach((to, from, next) => {
 
  console.log("to",to)
  const okToNav = to.fullPath == "/signIn" || to.fullPath == "/signUp" || to.fullPath == "/"
  const arrivedFrom = from.fullPath == "/"
console.log("bools",okToNav,arrivedFrom)

  if (okToNav || arrivedFrom ){
    next()
    return
  }else{
  console.log("store.getters.userId",store.getters)        
  
    if(!store.getters.getSiteId == undefined){

      next()

    }else{

      next('/')
    } }
}) */
    
export default router
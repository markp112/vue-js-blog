<template>
  <v-app id="app">
    <menuBar />
    <sideBarLHS />
    <coreRouter />

    <Footer/>
 
  </v-app>
</template>

<script>

import mainmenu from './core/header'
import footer from './core/footer'
import router from './core/cta'
import sideBar from './core/sidebarLHS'


export default {
  name: 'App',
 

  components:{
    menuBar : mainmenu,
    Footer:footer,
    coreRouter : router,
    sideBarLHS : sideBar
  },

  data() {
    return {
      
      fixed:true,
      }
  },

 computed:{

   pageHeightMax() {

      return this.$store.getters.getPageHeight
    
   }
 }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>

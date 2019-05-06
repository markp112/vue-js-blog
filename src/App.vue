<template>
  <v-app>
    <menuBar app></menuBar>


    <v-content  >
      <v-container app fluid  fill-height align-content-start>
        <router-view></router-view>
      </v-container>
    </v-content>

    
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 Mark Phillips</span>
    </v-footer>
  </v-app>
</template>

<script>

import mainmenu from './components/toolbars/header'

export default {
  name: 'App',
 

  components:{
    menuBar : mainmenu
  },
  data() {
    return {
       fixed:true,
  }}
 
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

<template>
    <v-layout row wrap>
    
    <!-- side menu bar -->
  <sideBarLHS></sideBarLHS>
      

        <v-flex >
        <v-toolbar 
            app
            :clipped-left = "clipped"
            color="primary">
               
           
            <v-btn icon @click.stop = "showSideBarClicked" color="accent">
                <v-icon >menu</v-icon>

            </v-btn>
              <template v-slot:extension>
              <v-layout row align-center justify-center fill-height>
               <v-flex xs6 >
                <v-btn color="accent" outline @click="onPagesClick">Pages</v-btn>
                <v-btn color="accent" outline >Files</v-btn>
                <v-btn color="accent" outline >Config</v-btn>   
               </v-flex>   
              </v-layout>
               
                
             </template>
            <v-toolbar-title class="white--text"
                v-text="siteName">
                
            </v-toolbar-title>
           

            
            </v-toolbar>
            
            
        </v-flex>

    </v-layout>
</template>

<script>

import sideBar from './sidebarLHS'

export default {
   components:{
    sideBarLHS : sideBar
  },
    data(){

        return{
            siteName:'Sparkz CMS',
            
              clipped: true,
          
            right: false,
            title:"Sparkz - CMS",
         
            
        }

    },
  
     watch:{
    panelIndex:function(){
    
     
    }
  },

  computed:{

    auth(){
      return true
    },
  },
    methods:{
        
        showSideBarClicked(){

          // to do implement some functionality for the icon linked to this event
          //this.$store.dispatch("modulePageMenus/toggleSideBarMenuLHS")
        },
      

        onPagesClick(){
            console.log('onPagesClick called')
            
            const data = {
              menu:"Pages",
              menuLocation: "subMenuLHS"
            }
            this.$store.dispatch("retrieveMenuItems",data)
            this.$router.push ("/pages")
        }
    }
    }

</script>

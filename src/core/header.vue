<template>
   
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
              
                <span v-for="item in toolbarItems" :key="item.route"> 
                      <v-btn color="accent" outline @click="onToolbarItemClick(item)">{{ item.title }}</v-btn>
                </span>

               </v-flex>   
              </v-layout>
               
            </template>
            
            <v-toolbar-title class="white--text"
                v-text="siteName">
            </v-toolbar-title>
            
         </v-toolbar>
      
      
</template>

<script>

export default {
  


    data(){

        return{
            siteName:'Sparkz CMS',
            
              clipped: true,
          
            right: false,
            title:"Sparkz - CMS",
            currentMenu:"home"
            
            
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

    toolbarItems(){
      console.log('computed toolbarItems called')
      return  this.$store.getters.getToolbarItems

    }
  },
   
   methods:{
        
        showSideBarClicked(){

          // to do implement some functionality for the icon linked to this event
          //this.$store.dispatch("modulePageMenus/toggleSideBarMenuLHS")
        },
      

        onPagesClick(){
            console.log('onPagesClick called')
            
            const data = {
              item:"Pages",
              subItem: "subMenuLHS"
            }
            this.$store.dispatch("retrieveMenuItems",data)
            this.$router.push ("/pages")
        },

        onToolbarItemClick(data){
            console.log ('ontoolbarItemClick with ',data)
            if(data.route){
          
              this.$router.push(data.route)

            }
        }
    }
    }

</script>

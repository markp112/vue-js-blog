<template>
<div>
      <navigationMenu v-if = "!isInEditor"></navigationMenu>
      
      <editorMenu v-else> </editorMenu>
</div>
</template>
<script>

//import {mapState, mapGetters} from 'vuex'

import navBar from './components/navigation'
import editBar from './components/sideBarEditing'

export default {
components :{
  navigationMenu : navBar,
  editorMenu : editBar
},
  
    data(){
        return {

              clipped:true,
                miniVariant: false,
                drawerLocal: true,
                avatar: "",
                siteOwnerName:'Mark Phillips',

        }
    },
   

    methods:{
      
          onMenuItemClick(menuItem){
           
           console.log("sideBar on Menu Item clicked->", menuItem)

            const item = {
                
                  page: menuItem.component
               
               }

           switch (menuItem.title){
             case "pages" : 
               
              
           
              this.$store.dispatch("retrievePageItems",item)
              
              break;
             
             case "New Site": 

               this.$router.push('/newSite')

               break;
            
            case "My Sites":
               console.log('My Sites Clicked', menuItem)
               this.$store.dispatch("retrieveListOfSites")
              this.$router.push('/siteList')
              break;

           }
           console.log('onMenuItemClick called', menuItem)

          


        },

    },

    computed:{
        items(){
            console.log('watch Items called',this.$store.getters.getMenuItems)
            
            return this.$store.getters.getMenuItems
        },
        userName (){

         return  this.$store.getters.userName

        },
        isInEditor(){
          console.log("isInEditor Called -->",this.$store.getters.getIsInEditor)
          return this.$store.getters.getIsInEditor
        }

    },
}
</script>

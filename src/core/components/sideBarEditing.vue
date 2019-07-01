<template>
      <v-navigation-drawer
         
            :mini-variant = "miniVariant"
            :clipped= "clipped"
            v-model = "drawerLocal"
            enable-resize-disable-resize-watcher
            permanent
            app
            dark
        >


        <v-flex pa-2>
            <v-list class="pa-1">
                <v-list-tile v-if="miniVariant" @click.stop="miniVariant = !miniVariant">
                <v-list-tile-action>
                  <v-icon>chevron_right</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            

          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img :src="avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ userName }} this is me</v-list-tile-title>
            </v-list-tile-content>

             <v-list-tile-action>
              <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>

         </v-list-tile>
        
         <v-list-tile avatar tag="div">
           
         
                <v-list-tile-action>
                  <v-btn icon @click="saveChanges" :disabled = "!isDirty" >
                    <v-icon color = "accent" >save</v-icon>
                  </v-btn>
                </v-list-tile-action>
                  <v-list-tile-content>
              <v-list-tile-title>Save Changes</v-list-tile-title>
            </v-list-tile-content>
            
         </v-list-tile>

        </v-list>

        <!-- show the editor for toolbars -->
        <compToolBar v-if="activeControl == 'toolbar'"/>

    
        </v-flex>
        </v-navigation-drawer>
</template>
<script>

//import {mapState, mapGetters} from 'vuex'

import toolbar from '../../components/Editor/propertyControls/toolbarProps'

export default {

  components:{

      compToolBar : toolbar,


  },

    data(){
        return {
                clipped:true,
                miniVariant: false,
                drawerLocal: true,
                avatar: "",
                toggleDirty: false,
            }
    },
   

    methods:{
      
          onMenuItemClick(menuItem){
           
           console.log("sideBar on Menu Item clicked->", menuItem)

            const item = {
                
                  page: menuItem.component
               
               }

           switch (menuItem.component){
             case "toolBar" : 
                          
           
              
              
              break;
             
             case "New Site": 

                break;
            case "My Sites":
              
              break;

           }
           console.log('onMenuItemClick called', menuItem)

          


        },

        // saveChanges -- propogate any changes back to dynamoDb
        // detect the isDirty flag agains each component to determine if data in the component has changed
        //
        saveChanges(){
          //to be implemented

          this.$store.dispatch("saveChanges")
        }
    },
   
    computed:{
        items(){
            console.log('watch Items called',this.$store.getters.getMenuItems)
            
            return this.$store.getters.getMenuItems
        },
        userName (){

         return  this.$store.getters.userName

        },
        activeControl(){
          return this.$store.getters.getActiveControl
        },

       isDirty(){
          console.log("isDirty= ",this.$store.getters.getIsDirty)
          return this.$store.getters.getIsDirty
          
        },

    },

    created(){
console.log("##### --> Created Editing side menu")

    },
}
</script>

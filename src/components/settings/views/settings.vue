<template>

    
<v-card max-width="1200"  height="auto"  class="mx-auto mt-2" >
    <v-system-bar color="primary darken-2" >
    </v-system-bar>

    <v-toolbar  color="primary darken-4">
        
         <v-flex xs1 offset-xs1>
            <v-icon x-large color="accent">settings</v-icon>
         </v-flex>

         <v-flex xs2 justify-start>
             <h1 class="settingsHeader" >Settings</h1>
         </v-flex>

    </v-toolbar>

    <component :is="componentId" 
                

                :showSiteDetail="false"
                              
                :menuItems = "menuItems"    
                :componentData = "componentData"

                @menuItemClick = "onMenuItemClick"     
                @onCloseClick = "onComponentCloseClick"
                @onSiteEditClick = "onSiteEditClick"
                @onError = "onError"
                >
    </component>
   
   
    <v-card v-if="showError">
        <error-Display  :errorMessage="errMessage" @closeClick="onErrorCloseClick"></error-Display>
    </v-card>

</v-card>
</template>

<script>

import settingsMenu from './components/settingsMenu'
import siteList from '../../../components/base/siteList'
import errorDisplay from '../../../components/base/baseErrorDisplay'
import theme from '../site/components/theme/theme'

import myicon from '../../../components/customIcons/awsIcon'

export default {
    
    components:{
        "site-List" : siteList,
        "error-Display" :errorDisplay,
        "custom-Icon":  myicon,
        "settings-Menu": settingsMenu,
        "theme-Selector" : theme,

    },

    data(){
        return {
           
            showError : false,
            errMessage : "",

            componentId : "",           // switches the current component 
            menuItems : [],             // contains the list of menu Items which are passed to the settingsMenu
            activeMenu : "",            //last active menu to support back navigation
            activeComponent:"",         //last active component to support back navigation
            componentData:[]
           
        }
    },
    //initialise the primary settings menu 
   created(){
       this.activeMenu = "settingsList"
       this.activeComponent = "settings-Menu"
       this.showMenu()
   },

  
    methods:{

        
        //show the sites components first retrieving the data
        // index is the index of the item that has been clicked
       onMenuItemClick(index){
           
              console.log("onMenuItemClicked",index)
              
              const selectedItem = this.menuItems[index]
              const component = this.menuItems[index].component
               
               //check if we need additional data for the subcomponent that is not 
               if(selectedItem.hasData) {
                   const data = {
                       subKey:selectedItem.subKey,
                       key:selectedItem.key
                   }
                   this.$store.dispatch("settings_getComponentData",data)
                   .then(d =>{
                       this.componentData = d
                   })
               }
       
                this.componentId = component
                this.activeComponent = component

        },
           
      //show the current active menu
        showMenu(){
            this.componentId = "settings-Menu"
            this.$store.dispatch("retrieveSettingsList",this.activeMenu)
            .then(data=>{
                
                this.menuItems = data
            })
        },

        //------------------------------------------------------------------------
        //respond to events from components
        
        //user has clicked the close button on the error component
        onErrorCloseClick(){
            this.showError = false
            this.errMessage = ""
        },

        //component has triggered an error show error dialog
        onError(errMsg){
            console.log("errMsg",errMsg)
            this.errMessage = errMsg
            this.showError = true
        },

        //user has closed the component - show the main menu
       onComponentCloseClick(){
           this.componentId = this.activeComponent
       },

        onSiteEditClick(siteId){
            this.$store.dispatch("setSettingsSiteId",siteId)
            this.activeMenu =  "settingsSites"
            this.showMenu()
        }

      },
    }

</script>

<style scoped>
    .settingsHeader{
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-size:2em;
        color:cornflowerblue;

    }
</style>

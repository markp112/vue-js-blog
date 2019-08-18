/*
SettingsMenu.vue - manages the menu for the settings menu s

Props: expects an array of menuItems
    Which has the following structure:


      "component": "theme-Selector",
      "hasData": true,                  Optional indicates data needs to be loaded for the sub-component
      "helpText": "Change colour palette used in your site",
      "icon": "palette",
      "iconColour": "blue",
      "key": "userSite", optional and only relevent if hasData is true
      "sub-Component": "mini-Theme",
      "subKey": "siteTheme", optional and only relevent if hasData is true
      "title": "Theme"

*/



<template>
     <v-card max-width="1200"  height="800"  class="mx-auto" color="blue-grey darken-1" >
      
      <v-card-actions>
          <v-layout row wrap xs12 >
               <v-flex xs12 mb-4 ml-5 mr-5 mt-5 elevation-10>
                <v-list >
                     <v-flex mt-5 xs12>
                    <v-list-tile v-for="(setting,index) in menuItems" :key="index" avatar>
                       
                            
                       
                            <v-list-tile-avatar>
                                <v-icon large 
                                        :color="setting.iconColour"
                                        @click="onMenuItemClick(index)"
                                        >{{setting.icon}} </v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content fluid>

                                <v-tooltip right>
                                    <template v-slot:activator="{ on }">
                            
                                        <v-list-tile-title v-on="on" >
                                            
                                            {{setting.title}}
                                           <!--  <component :is="setting.sub-Component"/> -->
                                            <!-- <mini-Theme v-if= 'showMe(setting.sub-Component,"mini-theme")'></mini-Theme> -->
                                                                
                                        </v-list-tile-title>

                                    </template>
                                    <span>{{setting.helpText}}</span>
                                </v-tooltip>   
                                
                            </v-list-tile-content>
                            <v-list-tile-action-text color="primary">

                                    <v-btn icon ripple>
                                        <v-icon color="grey lighten-1" @click="onMenuItemClick(setting.component)">info</v-icon>
                                    </v-btn>

                             </v-list-tile-action-text>
                            
                    </v-list-tile>
                      </v-flex>
                </v-list>
           </v-flex>
           </v-layout>

       </v-card-actions>
        

    </v-card >    
</template>


<script>
import miniTheme from '../../site/components/theme/miniTheme'

export default {
    name:"settingsMenu",

    props:{
        menuItems:{
                type:Array,
                default:function(){return []}
        }
    },

    components:{
        "mini-Theme" : miniTheme,
    },
    data(){
        return {
        // settingsList:[],            //list of the settings
        }
    },
  

    methods:{

        //user has clicked ona menu item return the index of the item that has been clicked back to the parent
        // index will point to the menuItem in the parent array, that has been passed down to this component

        onMenuItemClick(index){
            console.log("emitting menu click")
          
            this.$emit("menuItemClick",index)
        },

       /*  showMe(currentSubcomponent,subComponent){
            console.log("showMeCalled",subComponent,currentSubcomponent)
            return currentSubcomponent==subComponent
        } */

    }
}
</script>

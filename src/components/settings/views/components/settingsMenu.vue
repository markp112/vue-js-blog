<template>
     <v-card max-width="1200"  height="800"  class="mx-auto" color="blue-grey darken-1" >
      
      <v-card-actions>
          <v-layout row wrap xs12 >
               <v-flex xs12 mb-4 ml-5 mr-5 mt-5 elevation-10>
                <v-list >
                     <v-flex mt-5 xs12>
                    <v-list-tile v-for="setting in menuItems" :key="setting.title" avatar>
                       
                            
                       
                            <v-list-tile-avatar>
                                <v-icon large :color="setting.iconColour">{{setting.icon}} </v-icon>
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
        onMenuItemClick(component){
            console.log("emitting menu click")
            this.$emit("menuItemClick",component)
        },

       /*  showMe(currentSubcomponent,subComponent){
            console.log("showMeCalled",subComponent,currentSubcomponent)
            return currentSubcomponent==subComponent
        } */

    }
}
</script>

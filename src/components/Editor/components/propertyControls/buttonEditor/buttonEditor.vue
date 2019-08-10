<template>
    <v-layout column width = "auto" align-content-start>

        <v-card
            :width="width"
            elevation="15"

        >
        <v-card-title >
            <close-Button title="Button Editor" @click="onCloseClick"></close-Button>
        
        </v-card-title>
        

<v-list>
      <v-flex mb-5 title>
        <v-list-tile v-for="(item, index) in buttonProperties" :key="index">

             <v-list-tile-title class="caption" v-if="item.hasLabel"> {{ item.propLabel }} </v-list-tile-title>  

          <v-list-tile-action fluid>

            <template v-if = "item.propControlType === 'textProperty'">
              <text-property 
                          :propName = "item.propName"
                          :propLabel = "item.propLabel" 
                          :propValue = "item.propValue"
                          @onChanged = "onPropertyChange"
              ></text-property>
            </template>


            
            <template v-if = "item.propControlType === 'switch'">
              <base-Switch
                          :propName = "item.propName"
                          :propLabel = "item.propLabel" 
                          :propValue = "item.propValue"
                          @onChange = "onPropertyChange"
              ></base-Switch>
            </template>
          

         <template v-else-if="item.propControlType == 'colourPicker'" z-index="40">
              <v-expansion-panel popout z-index="40" >

                <v-expansion-panel-content>
                  <template v-slot:header>
                    <span class="caption"> </span>
                  </template>
                 <v-card height="200" width="180">
                    <colour-Picker v-model = "item.propModel" 
                                  :propName = "item.propName"
                                  @onChange = "onPropertyChange"></colour-Picker>
                  </v-card>
                </v-expansion-panel-content>

              </v-expansion-panel>

            </template>
           

 </v-list-tile-action>

         

        </v-list-tile>

         
      </v-flex>
    </v-list>

        </v-card>
        
    </v-layout>


</template>


<script>

import closeButton from "../../../../base/baseCloseButton"
import textProperty from '../base/baseProperty/textProperty'
import baseSwitch from '../base/baseProperty/baseSwitch'
import colourPicker from '../colourPicker/colourPicker'

export default {
    name : "buttonEditor",


  components:{

      "close-Button"  : closeButton,
      "text-property" : textProperty,
      "base-Switch"   : baseSwitch,
      "colour-Picker" : colourPicker
  },

    props:{
        width:{
                type: Number,
                default:200
                },
        
        buttonProperties:{
            type:Array,
            default :function(){
              return []
            },
            required:true
        }
    },

    data(){
        return{

        }
    },

    methods:{
      // data contains the new text to show on the button
      onPropertyChange(property){
        const data = {
           
              key: property.control,
              value : property.value
        }
        this.$emit("onPropertyChange",data)
      },



//close this control
      onCloseClick(){
        console.log("onCloseClick")
        this.$emit("onCloseClick")
      }

    },
        
    
}
</script>


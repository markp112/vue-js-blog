/* 
  For the toolbar linked to the users site this show a list of properties the user can set for the toolbar
  such as colour, elevation etc

  Dependencies:

    plugins/theme - provides the standard theme colours for the colour picker
    colourPicker - provides the colour palette for the user to select a colour from used to set toolbar colour
    ttlControl - allows the user to set a title for the toolbar


 */


<template>
  <v-card fluid height="500px" width="auto" >
    <v-list>
      <v-list-tile>

        <v-list-tile-content>
          <v-list-tile-title>Properties</v-list-tile-title>

        </v-list-tile-content>


      </v-list-tile>
    </v-list>

    <v-divider></v-divider>





<v-list>
      <v-flex mb-5 title>
        <v-list-tile v-for="item in propertyList" :key = "item.model">

          <v-list-tile-action fluid>

            <template v-if = "item.controlType == 'switch'">
              
              <v-switch :v-model = "item.model"  ripple @change = "onToggleSwitch(item.model)"></v-switch>
              
            </template>

            <template v-if = "item.controlType == 'button'">
              
              <v-btn flat icon  @click="onButtonClick(item.model)">
              
                <v-icon>add</v-icon>
              
              </v-btn>
             
            </template>

            <template v-else-if = "item.controlType == 'colourPicker'">
            
             <v-layout column align-start>
                
                  
               
              <v-expansion-panel popout >
             
                <v-expansion-panel-content>
                 
                  <template v-slot:header>
                    <div class="caption"> Toolbar Colour </div>
                  </template>
                   <v-card height="200">
                  <colour-picker v-model="selectedColour" ></colour-picker>
                </v-card>
                </v-expansion-panel-content>
                
              </v-expansion-panel>
           
              </v-layout>
            </template>
            <template v-else-if = "item.controlType == 'titleControl'">
              <title-Control :label = "item.menuItemName" 
                              @onTextChanged = "onTextChanged" />
            </template>



          </v-list-tile-action>

          <v-list-tile-title class="caption" v-if="item.hasLabel"> {{ item.menuItemName }} </v-list-tile-title>


        </v-list-tile>
      </v-flex>
    </v-list>


  </v-card>
</template>

<script>


import colourPicker from '../colourPicker/colourPicker'
import sliderTextBox from '../sliderTextBox/sliderTextBox'
import theme from '../../../../../plugins/theme'


export default {

    name:"toolBarProps",

  props:{
      propertyList:{
          type: Array,
          default:function(){
            return []
          },
          required: true,

      },
      
  },

    components:{
        "colour-picker" : colourPicker,
        "title-Control": sliderTextBox,

    },

  data(){
    
    return{

        thisControl: "toolBarProps",  //constant for identify this control by name
        showColourPalette: false,
        colourList: [],
        activeControl : "",
        selectedColour : "Primary",
        hasTitle:false,
        titleText:"",
        
    }

  },
 
methods:{
    //
    // process the toggling of the switch
    //
    onToggleSwitch(model){
      
      const data = {
           control: this.thisControl,
           property: model,
           value: true
       }

      this.$emit("onPropertyChange",data)


    },

    onTextChanged(e){

      let data = {
          control:this.thisControl,
           property: "titleText",
           value : e.text
        }


      this.$emit("onTitleTextChange",data)

    },

  onButtonClick(model){
    
  },
    
},

  destroyed(){
    console.log("Destroyed called")
     const data = {
              controlName: this.thisControl,
              value: false
          }
          this.$store.dispatch("updateIsPropLoaded",data)
  },
 created(){
     
        
        this.colourList = Object.keys(theme).map(function(key) {
        
        return key;
      });
    
},

watch:{


    selectedColour: function(){
       const data ={
            control: this.thisControl,
            property: "selectedColour",
            value: this.selectedColour

       }
       this.$emit("onToolBarColourChange",data)
       
    }
},


 



 
}
</script>
/* 
  For the toolbar linked to the users site this show a list of properties the user can set for the toolbar
  such as colour, elevation etc

  Dependencies:

    plugins/theme - provides the standard theme colours for the colour picker
    colourPicker - provides the colour palette for the user to select a colour from used to set toolbar colour
    ttlControl - allows the user to set a title for the toolbar
  </>

 */


<template>
       <v-card fluid>
          <v-list>
            <v-list-tile >
  
              <v-list-tile-content>
                <v-list-tile-title>Properties</v-list-tile-title>
                
              </v-list-tile-content>
  
             
            </v-list-tile>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list >
            <v-list-tile v-for = "(item,index) in props" :key="index">
              
              <v-list-tile-action fluid>
                  
            <template v-if = "item.controlType === 'switch'">
                  <v-switch  :v-model = "item.model" color="secondary" @click="processSwitch(item)" ></v-switch>
                  
            </template>

            <template  v-else-if = "item.controlType === 'colourPicker'" >
                <v-expansion-panel popout>
                  
                  <v-expansion-panel-content>
                    <template v-slot:header >
                        <div class="body-2"> Toolbar Colour </div>
                    </template>
               
                    <colours  v-model="selectedColour"></colours>  
                                   
                  </v-expansion-panel-content>

                </v-expansion-panel>
                
            </template>
            <template  v-else-if = "item.controlType === 'titleControl'" >    
              <titleControl :label = "item.menuItemName"  @Textchanged = "textChanged" />
            </template>

              </v-list-tile-action >
              <v-list-tile-title body-2 v-if="item.hasLabel"> {{ item.menuItemName }}</v-list-tile-title>
            </v-list-tile>
          
          </v-list>
        

        
  
        </v-card>
</template>

<script>


import colourPicker from '../components/utils/colourPicker'
import ttlControl from '../components/utils/sliderTextBox'

export default {

 
  
    components:{
        colours:colourPicker,
        titleControl:ttlControl,

    },

  data(){

    return{

        thisControl: "toolBarProps",
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
    processSwitch(index){
      
      

      //this[index.model] = !this[index.model]
       const data ={
           control:this.thisControl,
           property: index.model
       }
        console.log("Process Switch Called", data)

        //set the control value base on the data assigned
        this.$store.dispatch("updateProperty",data)
        
        //indicate the control has been editied
        const flagToUpdate={
            controlName : "toolBarProps",
            value : true 
        }
        this.$store.dispatch("updateDirtyFlag",flagToUpdate)

    },

    textChanged(e){

        console.log("textChanged Called-->",e.isActive)
      
      let flagToUpdate={
          control:this.thisControl,
           property: "hasTitle",
           value : e.isActive
        }
        this.$store.dispatch("updateProperty",flagToUpdate)
        
       flagToUpdate={
          control:this.thisControl,
           property: "titleText",
           value : e.text
        }
        this.$store.dispatch("updateProperty",flagToUpdate)
    
    

    }

    
},

 created(){
     console.log('#### Creating Toolbar Props Control ######')
     
    let  isAlreadyLoaded = this.$store.getters.getIsPropLoaded(this.thisControl)
     
    console.log("isAlreadyLoaded = >",isAlreadyLoaded)

     if(!isAlreadyLoaded){
          console.log("inside isAlreadyLoaded")
          const data = {
              item:"editors",
              subItem:"toolBar"
              }

        this.$store.dispatch("retrieveProperties",data)
        .then(res =>{
          console.log("toolbar Created result returned",res)
        
              const data ={
                  controlName: this.thisControl,
                  value: true
              }
              this.$store.dispatch("updateIsPropLoaded",data)
          
        
        })

        
        this.colourList = Object.keys(theme).map(function(key) {
        
        return key;
      });
    }
},

watch:{


    selectedColour:function(){
       const data ={
            control: this.thisControl,
            property: "selectedColour",
            value: this.selectedColour

       }
        this.$store.dispatch("updateProperty",data)
    }
},

computed:{
    props(){
      console.log("cardItems called")
      return this.$store.getters.getProps   
    }

  },
  
  destroyed(){
    console.log("Destroyed called")
     const data = {
              controlName: this.thisControl,
              value: false
          }
          this.$store.dispatch("updateIsPropLoaded",data)
  },

}
</script>
/* toolbar component  
  This component allows the user to manage the toolbar for the current page it binds to data in the store Pages.js

  dependencies: store/pages.js
                propertyControls/toolBarProps.vue 

                 

*/

<template>


<v-container >
    <base-DisplayError :errorMessage = "errorMessage" @closeClick="onErrorCloseClick" v-if="showError"></base-DisplayError>
      
      <v-toolbar 
        :fixed = "isFixed"
        :dark = "isDark"
        :light = "!isDark"
        :color = "selectedColour"
        :prominent = "isProminent"
        :extended = "isExtended"
        :flat = "isFlat"
        
      >
        <v-tooltip right>
          <template v-slot:activator = "{ on }">
            <v-btn 
                  
                  v-if="hasEditButton"
                  fab
                  absolute
                  small
                  color = "secondary"
                  top
                  left
                  ripple
                  darken-1
                  @click = "onToolBarEditButtonClicked"
                  v-on = "on"
                  elevation-10
                  >
                  <v-icon color="tertiary">edit</v-icon>
              </v-btn>
            </template>
            <span>Edit toolbar settings</span>
        </v-tooltip>

        <v-toolbar-title > {{ titleText }} </v-toolbar-title>


        <!-- ------------------------------------------------------------------------------------------- 
            User buttons on the toolbar display the user configured buttons on the toolbar
          ------------------------------------------------------------------------------------------- -->
        <v-layout  row align-center justify-center fill-height>
              
               <v-flex xs6 >
              
                 <span v-for="(buttonItem) in toolBarButtons" :key="buttonItem.key"> 
                      
                      <v-menu open-on-hover top offset-y>
                         <base-Button
                            :properties = "buttonItem.properties"
                            slot  = "activator"
                            
                        ></base-Button>
                     
                        <v-list>
                          <v-list-tile v-for="item in buttonHoverMenuItems" :key="item.key" @click = "onBtnMenuClicked(buttonItem.key)" >
                            
                            <v-list-tile-title class="caption"><v-icon>{{item.icon}}</v-icon> {{ item.text }}   </v-list-tile-title>
                          
                          </v-list-tile>
                        </v-list>
                      </v-menu>

                      
                  </span>

               </v-flex>   

       </v-layout>
        <v-layout  row align-center justify-center fill-height v-if = "showButtonEditor">
           <button-Editor  :buttonProperties = "getButtonProperties"
                            @onPropertyChange = "onButtonPropertyChange"
                            @onCloseClick = "onButtonEditorCloseClick" 
                          >
           </button-Editor>
        </v-layout> 
      </v-toolbar>

</v-container>
</template>
     

<script>

import baseButton from "../propertyControls/base/baseProperty/baseButton"
import buttonEditor from "../propertyControls/buttonEditor/buttonEditor"
import baseErrorDisplay from "../../../base/baseErrorDisplay"

const   BUTTON_PROPERTIES   = "buttonProperties"
const   TOOLBAR_BUTTONS     = "toolbarButtons" 


export default {
      name : "buttonEditor",

      props : {
          hasEditButton:{
              type:Boolean,
              default:true
          }
        },

        components : {
          "button-Editor"       : buttonEditor,
          "base-Button"         : baseButton,
          "base-DisplayError"   : baseErrorDisplay,
        },

  data(){

    return{
     
        //show error message if true    

        showError: false,

        errorMessage:"",

        //identifies this control the toolbar and its properties
        controlToActivate: "toolBarProps",
      
        toolBarSelected: "",
       
       // contains the  menu items that appear when a user hovers over a button
        buttonHoverMenuItems:[{text:"Properties", icon:"build"}],   
        
        // switch to show the button editor 
        showButtonEditor: false,

        //which is the current button being edited
        editedButton : "",
    }

  },
 
 methods:{

//close the error dialog
onErrorCloseClick(){
  console.log("closClicked")
  this.errorMessage = ""
  this.showError = false
},

   //loads the toolbar properties editor in the side bar
   // user has clicked the edit button on the toolbar 
    onToolBarEditButtonClicked(){
        console.log("--> toolBarClicked Called")
             
        let  isAlreadyLoaded = this.$store.getters.getIsPropLoaded(this.controlToActivate)
        
        //console.log("isAlreadyLoaded = >",isAlreadyLoaded)

        if(!isAlreadyLoaded){
              
              const data = {
                  item:"editors",
                  subItem:"toolBar",
                  key: this.controlToActivate
                  }

            this.$store.dispatch("retrieveNonUserProperties",data)
            .then(() =>{
                  //console.log("toolbar Created result returned")
            
                  const data ={
                      controlName: this.controlToActivate,
                      value: true
                  }
                  this.$store.dispatch("updateIsPropLoaded",data)
              
            
            })

            }


        // if clicked again deselect
        let component = "toolbar"

            // show the editor component for the toolbar
        const data = {
            component : component,
            item : "editors",
            subItem : "toolBar"
        }

        this.$store.dispatch ("showProperties", data)
    },

//
// retrieve the properties for the button editor
// user has clicked the properties menu item on the hover menu for buttons on the toolbar
// item contains the "key" to this button this is used to update the properties of this button in the store
//
onBtnMenuClicked(item){
  
  console.log("--> onBtnMenuClicked Called",item)
             
        let  isAlreadyLoaded = this.$store.getters.getIsPropLoaded(BUTTON_PROPERTIES)
        
        const showEditor = true

        // don't reload the button properies if they have already been loaded
        // avoids repeated calls to Lambda
        
        // store the item we are editing
        this.editedButton = item

        if(!isAlreadyLoaded){
              
              const data = {
                  item: "editors",
                  subItem: "buttonEditor",
                  key: BUTTON_PROPERTIES
                  }

            this.$store.dispatch("retrieveNonUserProperties",data)
            .then(() =>{
                             
                  const data ={
                      controlName: BUTTON_PROPERTIES,
                      value: true
                  }
                  this.$store.dispatch("updateIsPropLoaded",data)
                  this.editedButton = item
                  this.showButtonEditor = true
            })
            .catch(err =>{
              showEditor = false    //don't show the button editor if an error
              this.errorMessage = err
              this.showError = true
              
            })

        }
             
       this.showButtonEditor = showEditor
       

},



//close the button Editor
onButtonEditorCloseClick(){
  console.log("onButtonEditorCloseClick")
  this.showButtonEditor = false
},

//respond to the user updating a property in the button editor
onButtonPropertyChange(property){

  console.log("--> onButtonPropertyChange", property)

  const data = {
    key   : this.editedButton,
    key2  : property.key,
    value : property.value
  }
  try{
    this.$store.dispatch("updateToolBarButtonProperty",data)
  }
  catch{ err=>{
    this.errorMessage = err.msg + "properties" +err.parameters + err.error
    this.showError = true

  }
    
  }
},
    //local function used by the computed methods to avoid code duplication
    // retrieves the property "prop" from the store for the given toolbar item
    getProperty(prop){
      const property = {
          control: this.controlToActivate,
          property: prop
      } 

      return this.$store.getters.getProperty(property)
    }
  },
 
 
  computed:{




    isFixed(){
      return this.getProperty("isFixed")
     
    },

    isProminent(){
     return this.getProperty("isProminent")
    },
    
    isDark(){
      
      return this.getProperty("isDark")
      
    },

    selectedColour(){
      return this.getProperty("selectedColour")
    },

    isExtended(){
       return this.getProperty("isExtended")
    },

    isFlat(){
        console.log("isFlat=",this.getProperty("isFlat"))
       return this.getProperty("isFlat")
    },

   hasTitle(){
        
       return this.getProperty("hasTitle")
    },
     titleText(){
        
       return this.getProperty("titleText")
    },

    // return the list of buttons to show on the toolbar
    toolBarButtons(){
        console.log("toolBarButtons Called ",this.getProperty(TOOLBAR_BUTTONS))
        return this.getProperty(TOOLBAR_BUTTONS)
    },

    //return the list of properties than can be set per button
    getButtonProperties(){
      console.log("-->getButtonProperties Called",this.$store.getters.getProps(BUTTON_PROPERTIES))

        let  buttonProps = this.$store.getters.getProps(BUTTON_PROPERTIES)
        
        if (buttonProps == undefined){
          return []
        }else{
            return (this.$store.getters.getProps(BUTTON_PROPERTIES))
        }
    }
  }

}
</script>





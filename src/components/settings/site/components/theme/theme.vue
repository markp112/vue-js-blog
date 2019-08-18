<template>
<v-container grid-list-xs>
    <div class="instructions " > Click on a colour to:</div>
    <v-flex xs-6 mt-2>
        <v-btn outline color="primary" @click="onPaletteClick">Generate New Palette</v-btn>
    
        <v-btn outline color="primary" @click="onEditColourClick">Edit Colour</v-btn>
    </v-flex>
    <v-dialog
        v-model="showPalette"
        scrollable
        origin="left center"
        overlay="true"
        width="auto"
        max-width="550px"
        transition="dialog-transition"
        hide-overlay
        dark
        persistent
    >
        <template v-slot:activator="{on}">
                
                    
        
   
        <v-layout row wrap mt-5 ml-5 justify-space-around>
            
            <div  v-for="(colour,index) in componentData" :key="index">
                
                <colour-Well    :colour = "colour" 
                                :index="index" 
                                @colourClick="onColourClick"

                                v-on = "on">
                </colour-Well>
           
            </div>
            
        </v-layout>
    </template>
    
    <color-Editor  v-if="isEditColour"
                :currentColor = "this.rgbColor" 
                :editedColor = "this.editColour"
                :colorLabel = "this.colourLabel" 
                @okClick="onColourEditorOkClicked">
    </color-Editor>

    <palette-Selector   v-if="isEditPalette" 
                        @closeClick="onPaletteCloseClick"
                        :palette = "this.newPalette"
                         ></palette-Selector>
 </v-dialog>


</v-container> 

</template>

<script>

import colourElement from '../../../../../dataClasses/colourClasses'

import paletteSelector from "./paletteSelector" //allows a new palette to be created

import  colorEditor from './colorEditor'    //allows editing of a single colour

import colourWell from './colourWell'


import colorHelpers, { hexToRgb, hexToRgbObject,rgbToHex } from '../../../../../helperFunctions/colorHelpers'
import colorEditorVue from './colorEditor.vue';


export default {

    name:"theme",

    components:{
        'palette-Selector'  : paletteSelector ,//shows the newly generated Palette
        'color-Editor'      : colorEditor,   // edit a single colour
        'colour-Well'       : colourWell,   //is the coloured circle showing the colours
    },

    props:{
      /*   palette:{
                type:Array,
                default:function(){
                    console.log("initial")
                    let initial =[]
                    
                   let element = new colourElement.colourElement("Dark primary","#303F9F","#303F9F",false)
                    initial.push(element)

                   
                    
                    element = new colourElement.colourElement("Primary","#3F51B5","#3F51B5",false)
                    initial.push(element)
                    
                    element = new colourElement.colourElement("Light primary","#C5CAE9","#C5CAE9",false)
                    initial.push(element)
                    
                    element = new colourElement.colourElement("Text primary","#121031","#121031",false)
                    initial.push(element)
                    
                    element = new colourElement.colourElement("Accent","#795548","#795548",false)
                    initial.push(element)
                    
                    element = new colourElement.colourElement("Secondary","#757575","#757575",false)
                    initial.push(element)
                    
                    element = new colourElement.colourElement("Tertiary","#858585","#858585",false)
                    initial.push(element)

                    element = new colourElement.colourElement("Success","#00ff00","#00ff00",false)
                    initial.push(element)

                    colour = new colourElement.element("Error","#ff0000","#ff0000",false)
                    initial.push(element)

                    element = new colourElement.colourElement("Info","#0000ff","#0000ff",false)
                    initial.push(element)



                    return [

                        initial

                    ]
                }
        } */
        componentData:{
                type:Array,
                default:function(){
                    return []
                },
                required:true
        }
    },



    data(){
        return {
            newPalette:[],      // holds newly generated color palette
            showPalette:false, //toggle the pop up dialog

            isEditPalette:false,
            isEditColour:false,


            rgbColor:{red:0,green:0,blue:0},    ///current color being edited
            colourLabel:"",                      // name of the colour being edited
            editColour:{red:0, gree:0, blue:0},
            selectedIndex:-1,

        }
    },

    methods:{

        onColourClick(index){

           //highlight the selected item
         /*    this.palette[index].isSelected=true;
            if(this.selectedIndex !== -1 && this.selectedIndex !== index){
                this.palette[this.selectedIndex].isSelected = false
            } */

             this.componentData[index].isSelected=true;

            if(this.selectedIndex !== -1 && this.selectedIndex !== index){
                this.componentData[this.selectedIndex].isSelected = false
            }
            this.selectedIndex = index

        },

        getColour(value){
            return "backgroundColor:" + value
        },

        onEditColourClick(){
            
            if(this.selectedIndex !== -1 ){
                const index = this.selectedIndex
                /* const currentColour = this.palette[index].value */
                const currentColour = this.componentData[index].value

                this.rgbColor = hexToRgbObject(currentColour) 

                this.editColour  = hexToRgbObject(currentColour) 
            
                /* this.colourLabel =  this.palette[index].colourName */
                this.colourLabel =  this.componentData[index].colourName
                this.isEditColour = true

                this.showPalette = true
            }
          
        },

        onPaletteClick(){

             if(this.selectedIndex !== -1 ){

                 /* const colour = this.palette[this.selectedIndex].value */
                  const colour = this.componentData[this.selectedIndex].value
                 this.$store.dispatch("settings_getNewPalette",colour)
                .then(p =>{
                    console.log("returned wiht new palette",p)
                   
                    this.newPalette = p

                    this.isEditPalette =true;
                    this.showPalette=true;
                }) 
             }
        },

        onPaletteCloseClick(){
            this.isEditPalette = false
        },


        onColourEditorOkClicked(data){

           
            const colourHex = rgbToHex(data.value.red, data.value.green, data.value.blue)
         

            //this.palette[this.selectedIndex].value = colourHex
                this.componentData[this.selectedIndex].value = colourHex
           
            this.selectedIndex = -1
            this.isEditColour = false
            this.showPalette = false
        },
    },

    computed:{
        
    }
}


</script>


<style scoped>

.circle {
    width:100px;
    height:100px;
    border-radius:50px;
    font-size:12px;
    line-height: 100px;
    text-align: center;
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px 2px grey
}
.instructions{
    font-size: 1.5em;
    
}

</style>

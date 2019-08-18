<template>
<div >
    
        <v-flex class="border"  v-bind="flexWidth"  >
     
           
            <editToolBar    :editButtonActive = "!isMenuSelected"
                          
                            @onMenuClicked = "onMenuClicked"
                            
                            @onEditClicked = "onEditClick"
                            @onAlignLeftClicked = "alignLeft"
                            @onAlignRightClicked = "alignRight"
                            @onAlignCentreClicked = "alignCentre"
                            
                        />

           
            
            <v-layout row v-bind = "layoutAttributes" >
                           
                    <component  :is="componentId" 
                                :element = "localElement" 
                                :isEditing = "edit" 
                                :index="index"
                                @textEditorHasContent = "isMenuSelected = true"
                                @inEditor = "edit = false"
                                ></component>    
                
            </v-layout>
            
        </v-flex>
       

</div>
</template>
<script>

import edittoolbar from '../helpers/editorToolBar'
import textcomponent from '../components/views/textComponent'
import imagecomponent from '../helpers/image'
import dataClasses from '../../../dataClasses/pageSection'

 export default {
   name: 'masterContainer',
    props: {

        //id for this component
        id: {
            type: String,
            default: 'flex'
        },
        
        //can be used to set the amount of space the master component occupies

        flexElement:{
            type: String,
            default: 'xs4'
        },
        
        // references back to the Parent component where this hosted on the page
        
        index:{
            type: Number,
            default:0,
        },

        //contains the content for this item along with where it sits within the component
        // i.e. is it the first element the second etc
        element:{
            type: Object,
            default: null
        }
    },

    components:{
        editToolBar: edittoolbar,
        textComponent: textcomponent,
        imageComponent: imagecomponent
    },

   data(){
       return {
            
            componentId:"",
    
            edit: false,
                     
            isMenuSelected : false,

            alignment: 'align-center',
        
            justify: 'justify-center',
          
            fillHeight: true,

            localElement: this.element,

    }
       },
    
    computed: {
        ///configures the alignment and justification of the element in our container
            layoutAttributes () {
            return {
                [this.alignment]: true,
                [this.justify]: true,
           
                }
            },
             flexWidth(){
                return    {
                        [this.flexElement]: true,
                        }
            }
  },
   
   methods:{

       onEditClick(){
           this.edit = true
           
       },

       onToolBarClicked(isSelected){
          
           this.isControlSelected = !this.isControlSelected
       },
        onMenuClicked(template){
            
            this.isMenuSelected = true
            this.edit = true
            this.componentId = template
            
           //console.log("template =",template)
           //console.log("element = ", this.element)

            switch (template){

                case "textComponent":
                    this.element.type = dataClasses.types.text
                   // this.localContentType = dataClass.types.text
                   // console.log("layout is now",this.localContentType, this.layout)
                    break;

                case "imageComponent":
                    this.element.type = dataClasses.types.image
                  //  this.localContentType = dataClass.types.image
                    break;
            }

            const elementComponent = {
                element : this.element,
                index: this.index,
                
            }
            try {

                this.$store.dispatch("updateElement", elementComponent)
            
            } catch (error) {
                console.log("error occurred in updating store",error)
            
            }

          /// this.$emit("onTemplateChange",template)
        },

        alignLeft(){
            ///this.alignment = 'align-start'
            this.justify = 'justify-start'
        },
        alignRight(){
            this.justify = 'justify-end'
        },
        alignCentre(){
            this.justify = 'justify-center'
        }

   },
   created(){
       console.log("this.element.type",this.element)
   
        
       switch (this.element.type ){
           case dataClasses.types.text:
               this.componentId = "textComponent"
               break;
               
           case dataClasses.types.image:
               this.componentId = "imageComponent"

               
       }
       
            
   },
 }
</script>

<style scoped>

.border{
     border: 1px dashed  gray;
}

.borderIamSelected{
     border:1px dotted red;
     padding: 5px;
     
}
.titleBar {
    background:grey,

}
</style>
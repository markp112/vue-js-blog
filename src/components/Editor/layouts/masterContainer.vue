<template>
<div >
    
        <v-flex class="border"  v-bind="flexWidth"  >

            <editToolBar    :editButtonActive = "!isMenuSelected"
                          
                            @menuClicked = "onMenuClicked"
                            
                            @onEditClicked = "edit = !edit"
                            @onAlignLeftClicked = "alignLeft"
                            @onAlignRightClicked = "alignRight"
                            @onAlignCentreClicked = "alignCentre"
                        />

            
            
            <v-layout row v-bind = "layoutAttributes" >
                           
                    <component :is="componentId" :element = "localElement" :isEditing = "edit" :index="index"></component>    
                
            </v-layout>
            
        </v-flex>
       

</div>
</template>
<script>

import edittoolbar from '../helpers/editorToolBar'
import textcomponent from '../components/utils/textComponent'
import imagecomponent from '../helpers/image'
import dataClasses from '../../../dataClasses/pageSection'

 export default {
   name: 'master',
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
            default:null
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

            localElement: this.element
    }
       },
    
    computed: {
            layoutAttributes () {
            return {
                [this.alignment]: true,
                [this.justify]: true,
             //   [this.flexDirection]: true,
           //     reverse: this.reverse,
               // 'fill-height': this.fillHeight
                }
            },
             flexWidth(){
                return    {
                        [this.flexElement]: true,
                        }
            }
  },
   
   methods:{


        onMenuClicked(template){
            this.isMenuSelected = true
            this.edit = true
            this.componentId = template
            this.$emit("onTemplateChange",template)
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
 }
</script>

<style scoped>

.border{
     border: 1px dashed  gray;
}
.titleBar {
    background:grey,

}
</style>
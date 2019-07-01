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

                <component :is="componentId" :placeholder ="content" :isEditing = "edit"></component>    
            </v-layout>
            
        </v-flex>

</div>
</template>
<script>

import edittoolbar from './editorToolBar'
import textcomponent from '../../../components/utils/textComponent'
import imagecomponent from '../helpers/image'

 export default {
   name: 'master',
    props:{
        content : {
            type: String,
            default: ''
        },
       
        
        id: {
            type: String,
            default: 'flex'
        },
        flexElement:{
            type: String,
            default: 'xs4'
        },
       
        
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
           
           
           
            fillHeight: true
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
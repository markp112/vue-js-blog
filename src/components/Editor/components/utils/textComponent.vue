/* 
    This component switches between showing the text the user has created and the editor
    it uses two components Editor which is the tinyMCE editor and the editorContent component
    which is a custom component for showing the text
 */

<template>
    
<v-layout row wrap justify-center>
    

    

    

<v-card width="100%">

        <component :is="componentId" v-model = "text" :content="text" 
                    @contentChanged ="onChange">
        </component>
       
   
  
</v-card>

    
</v-layout>

</template>

<script>

import  Editor from './tinyEditor'
import  editorContent from './editorContent'


export default {
    //intial place holder text for the text box component
   props:{
            element:{
                        type: Object,
                        default:null
                        },
   
            isEditing:{
                    type: Boolean,
                    default:false
            },
            index:{type:Number,
                    default:-1
                    }
   } ,

    components:{
      editor: Editor,
      editorcontent : editorContent,
        

    },

    data(){
        return {
                        
            text:this.placeholder,
            isEditorActive: false,
            componentId : "editorcontent"

        }
    },
    created(){

        console.log("Element= ",this.element)

    },

    watch:{
        isEditing(){
            //console.log("edit clicked",this.isEditing)
            this.componentId = (this.isEditing ) ? "editorcontent" : "editor"
           
           console.log("element=",this.element)

            if(this.componentId == "editorcontent"){

                this.element.content = this.text
                
                const elementComponent = {
                    
                    element : this.element,
                    index : this.index
                }

                this.$store.dispatch("updateElement",elementComponent)
            }
        }
    },
    methods:{

        onChange(v){
            //  console.log("onchange Called", v)
            this.text = v
        }

    }
}


</script>

<style>
 .placeHolder {
        border: 1px 1px 1px 1px solid;
        border-color: blue;
        background-color: white;
        height: 100px;
    }
</style>

/* 
    This component switches between showing the text the user has created and the editor
    it uses two components Editor which is the tinyMCE editor and the editorContent component
    which is a custom component for showing the text
 */

<template>
    
<v-layout row wrap justify-center>
    

    <v-card width="100%">

            <editor-content v-if="!showEditor" :content = "text"></editor-content>
            <tiny-editor   v-else  :content = "text" @onCloseClick="onEditorCloseClick"></tiny-editor>
    </v-card>

        
</v-layout>

</template>

<script>

import  tinyEditor from './tinyEditor'
import  editorContent from './editorContent'


export default {
    //intial place holder text for the text box component
   props:{
            element:{
                        type: Object,
                        default:()=>({
                            number : -1,
                            type : -1,
                            isDirty: false
                            })//needed so key does not trigger an error when Vue compiles at runtime
                        },
   
            isEditing:{
                    type: Boolean,
                    default:false
            },
            index:{ type:Number,
                    default:-1
                    }
   } ,

    components:{

        "tiny-editor": tinyEditor,
        "editor-content" : editorContent,

    },  

    data(){
        return {
                        
            text : "",
            isEditorActive : false,
            
            key: "###L"+ this.index + "E" + this.element.number + "###"

        }
    },
    created(){

        console.log("Created text Component called Element= ",this.element)
       
       if(this.element !== undefined){
           // console.log("this.$store",this.$store)
            
            this.text = this.$store.getters.getElementContents(this.key)
            
            //if text is still undefined call again incase load is slow
            /// not ideal but until find a more efficient way to do this.
            if(this.text == undefined){
                this.text = this.$store.getters.getElementContents(this.key)
            }
           ///flag so toolbar can updated to show editor button active
           if (this.text !== ""){
                this.$emit("textEditorHasContent")
            }
        }
    },

  computed:{
      showEditor(){
          return this.isEditing
      },
  },

  
    methods:{

        onEditorCloseClick(content){
            this.text =  content
             const contentData ={
                key:this.key,
                content: content
            }
            this.$store.dispatch("updateContentText",contentData)
            this.isEditing = false
            //flag state change up to edit tool bar to reset the "isEditing" value to false
            // otherwise no new event is fired when the edit button is clicked as its value is already true
            this.$emit("inEditor")
        },

      

    }
}


</script>

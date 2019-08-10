<template>
      
      <div >
         
          <close-Button backColour="teal" @click="onCloseClick"></close-Button>
        
          <vue-tinymce  id="editor" v-model="localText"></vue-tinymce>
     </div>

</template>

<script>
import closeButton from '../../../base/baseCloseButton'
import  Editor from 'vue-tinymce-editor'
import { close } from 'fs';

export default {
    name :"textEditor",
    
    props:{
        content : {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: 'tinyeditor'
        },
    },

    components:{
            "close-Button": closeButton
    },
     

     data(){
         return {
             localText: this.content,
             
             tinyToolbar: {
                    default: 'insert | undo redo | formatselect | styleselect fontselect fontsizeselect |'+
                            ' bold italic underline forecolor backcolor | link image media |'+
                            ' alignleft aligncenter alignright alignjustify |'+
                            ' bullist numlist outdent indent | removeformat | help | code |'+
                            ' emoticons'
            },
            plugins : [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code codesample'
            ],
          
        }
     },
methods:{
    onCloseClick(){
        this.$emit("onCloseClick",this.localText)
    }
},

 beforeDestroy(){

     tinyMCE.execCommand('mceRemoveEditor', true, 'editor');
     
 },

    created(){
        this.localText = this.content
        
    },


     watch:{
         localText(v){
             console.log('watching Local Text',this.localText, v)
             this.$emit('contentChanged',this.localText)
         }
     }
}
</script>

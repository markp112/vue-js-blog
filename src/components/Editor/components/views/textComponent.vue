/* 
    This component switches between showing the text the user has created and the editor
    it uses two components Editor which is the tinyMCE editor and the editorContent component
    which is a custom component for showing the text
 */

<template>
    
<v-layout row wrap justify-center>
    

    <v-card width="100%">

            <component :is="componentId" v-model = "myContent" 
                        :content = "text" 
                        @contentChanged = "onChange">
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

        editor: Editor,
        editorcontent : editorContent,

    },  

    data(){
        return {
                        
            text : "",
            isEditorActive : false,
            componentId : "editorcontent",
            key: "###L"+ this.index + "E" + this.element.number + "###"

        }
    },
    created(){

        console.log("Created text Component called Element= ",this.element)
        if(this.element !== undefined){
            console.log("this.$store",this.$store)
            
            this.text = this.$store.getters.getElementContents(this.key)
           
           if (this.text !==""){
                this.$emit("textEditorHasContent")
            }
        }
    },

    computed:{
       
       myContent (){
            console.log("-->Mycontent Called")
           this.text = this.$store.getters.getElementContents(this.key)
            return  this.text
            
        }
    },

    watch:{
        isEditing(){
            //console.log("edit clicked",this.isEditing)
            this.componentId = (this.isEditing ) ? "editorcontent" : "editor"
           
           console.log("element=", this.element)

            //editorContnet shows the content we have created

           /*  if(this.componentId == "editorcontent"){
                console.log("text=",this.text)
                this.element.content = this.text

                //mark element as being changed
                this.element.isDirty = true

                const elementComponent = {
                    
                    element : this.element,
                    index : this.index
                }
                
                console.log("isEditing - elementComponent = ",elementComponent)
 */
               // this.$store.dispatch("updateElement", elementComponent)
            //}
        }
    },
    methods:{

        onChange(v){
            //  console.log("onchange Called", v)
            this.text = v
            const contentData ={
                key:this.key,
                content: v
            }
            this.$store.dispatch("updateContentText",contentData)
        }

    }
}


</script>

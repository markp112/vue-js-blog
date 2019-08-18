// ColorEditor.vue 
//  created: 17 Aug 2019
//  Purpose: Allow the editing of a single color
//  input: Colour to be edited


<template>
    <v-container grid-list-xs grey darken-4 >
        
        <v-layout row >
            <v-flex xs4 secondary--text  >
               
                {{colorLabel}}
                
            </v-flex>
        </v-layout>

        <v-layout row >
            
            <v-flex xs4 >
                <div class="label"> Original Colour</div>

                <div   class="box ml-4 elevation-15"
                        :style="{background: `rgb(${currentColor.red}, ${currentColor.green},${currentColor.blue})`}">
                
                </div>
 
            </v-flex>
            
            <v-flex xs4 mr-3>
                <v-slider v-model="editedColor.red" step="1"  thumb-color="red"  :max="255" ></v-slider>
                <v-slider v-model="editedColor.green" step="1"  thumb-color="green"  :max="255"></v-slider>
                <v-slider v-model="editedColor.blue" step="1"  thumb-color="blue"  :max="255"></v-slider>
              
            </v-flex>
            <v-flex xs4 >
                 <div class="label">   Edited Colour</div>
                <div class="box ml-4 elevation-15"
              
    
                        :style="{background: `rgb(${editedColor.red}, ${editedColor.green},${editedColor.blue})`}"
                    
                    > 

                </div>
            </v-flex>


        </v-layout>
        <v-layout row >
            <v-btn outline color="primary" @click="onResetClick" >reset</v-btn>
                <v-spacer></v-spacer>
            <v-btn outline color="secondary" @click="onOkClick">Ok</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name:"colorEditor",

    props:{
        currentColor:{
                type:Object,
                default:function(){
                    return{red:20,green:20,blue:20}
                },
                required:true,
        },
        editedColor:{
            type:Object,
            default:function(){
                return {red:40, green:20, blue:20}
            },
            required:true,
            
        },
        colorLabel:{
            type:String,
            default:"",
        }
    },

    data(){
        return {
          
        }
    },

    created(){

        this.initialiseEditedColor()
    
    },
    
    methods:{
        onResetClick(){
            this.initialiseEditedColor()
        },

        onOkClick(){
            
            const data = {
                colourName: this.colorLabel,
                value: this.editedColor
            }
            this.$emit("okClick",data)
            
        },

        initialiseEditedColor(){
            console.log("initialiseEditedColor called")


            this.editedColor.red = this.currentColor.red
            this.editedColor.green = this.currentColor.green
            this.editedColor.blue = this.currentColor.blue
        },

    },

}
</script>

<style scoped>

.label{
        color :lightgray;
        line-height: 0.8;
        margin-bottom: 3em;
        margin-top: 0.5em;
        
        }

.box{
    width:  100px;
    height: 100px;
    font-size:12px;
    border-radius: 10%;
     
   
}
</style>
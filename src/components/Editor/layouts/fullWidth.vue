<template>
    <v-layout row ma-2 >
        <v-flex xs12>
            <masterContainer    flexElement='xs12' 
                                :element = "content" 
                                :index = "index"
                                @onTemplateChange = "onTemplateChanged"/>
      </v-flex>
      
    </v-layout>
</template>

<script>

/* import store from '../../../store' */

import masterContainer from './masterContainer'

import dataClass from '../../../dataClasses/pageSection'
/* 
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex) */


export default {

    props:{
       
       
        index:{
            type:Number,
            default:0
        },
        elements:{  
                    type:Array
                    
                    }
    },

     components:{
        //holds the elements that make up the layout component including the image, text editor components etc
        masterContainer,
    },
    data(){

        return{
               content: this.elements[0]
            }


    },


    methods:{
        
        onTemplateChanged(template){
            switch (template){

                case "textComponent":
                    this.elements[0].type = dataClass.types.text
                   // this.localContentType = dataClass.types.text
                   // console.log("layout is now",this.localContentType, this.layout)
                    break;

                case "imageComponent":
                    this.elements[0].type = dataClass.types.text
                  //  this.localContentType = dataClass.types.image
                    break;
            }

            const elementComponent = {
                element : this.elements[0],
                index: this.index,
                
            }

            this.$store.dispatch("updateElement", elementComponent)
        }
    }
}
</script>

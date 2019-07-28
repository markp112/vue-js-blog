<template>
    <v-layout row ma-2 >
        <v-flex xs12>
            <masterContainer    flexElement='xs12' 
                                :element = "content" 
                                :index = "index"
                               />
      </v-flex>
      
    </v-layout>
</template>

<script>



import masterContainer from './masterContainer'

export default {

    props:{
 
        index:{
            type:Number,
            default:0
        },
        elements:{  
                    type: Array
                    
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


}
</script>

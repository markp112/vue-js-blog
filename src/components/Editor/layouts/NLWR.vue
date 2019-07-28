<template>
    <v-layout row ma-2 >
        <v-flex xs4>
            <masterContainer flexElement='xs12'
                                :element = "contentLeft" 
                                :index = "index"
                               />
      </v-flex>
      <v-flex xs8>
            <masterContainer flexElement='xs12' 
                                :element = "contentRight" 
                                :index = "index"
                                />
      </v-flex>
    </v-layout>
</template>

<script>


import masterContainer from './masterContainer'



export default {

    props:{
        //this controls sequence on the page
        index:{
            type:Number,
            default:0
        },
        // contains the content for this section
        elements:{  
                    type:Array
                    
                    }
    },

     components:{
        
        masterContainer,
    },
    data(){

        return{
               contentLeft: this.elements[0],
               contentRight: this.elements[1]
            }


    },
     
}
</script>

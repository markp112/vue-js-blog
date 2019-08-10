<template>
    
    <v-card width="200" color="error darken-2"  elevation="15" >
        
        <v-card-title primary-title background-color="grey darken-1">
            <close-Button title="Error" @click = "onCloseClick"></close-Button>
            
           
            
        </v-card-title>
        <v-card-text >
            {{errorMessage}}
        </v-card-text>
    </v-card>    
    
</template>

<script>

import closeButton from './baseCloseButton'

export default {

    props:{
        errorMessage:{
            type: String,
            default : ""
        }
    },

    components:{
            "close-Button" : closeButton,
    },

    methods:{
        onCloseClick(){
            
            this.$emit("closeClick")
        }
    }

}
</script>

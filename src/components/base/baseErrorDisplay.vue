<template>
    
    <v-card width="auto" color="error darken-2"  elevation="15" >
        
            
        
        <v-card-title primary-title background-color="grey darken-1">
        
            <close-Button title="Error" @click = "onCloseClick"></close-Button>
            
        </v-card-title>
        <v-container grid-list-xs>
            
            <v-layout row wrap ml-2 mr-2 >

                <v-flex xs12 >

                    <v-card-text color="primary--text">
                        {{errorMessage}}
                    </v-card-text>    

                </v-flex>    

            </v-layout>
            
        </v-container>
        
        
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

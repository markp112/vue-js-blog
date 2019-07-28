<template>
    
    <v-card width="200" color="error darken-2"  elevation="15" >
        
        <v-card-title primary-title background-color="grey darken-1">
            <v-flex xs2 align-content-start>
                Error    
            </v-flex>
            
            <v-flex xs10 align-content-end>
            <v-btn flat icon small color="white" outline @click="onCloseClick">
                <v-icon small>close</v-icon>
            </v-btn>    
            </v-flex>
            
        </v-card-title>
        <v-card-text >
            {{errorMessage}}
        </v-card-text>
    </v-card>    
    
</template>

<script>
export default {

    props:{
        errorMessage:{
            type: String,
            default : ""
        }
    },
    methods:{
        onCloseClick(){
            
            this.$emit("closeClick")
        }
    }

}
</script>

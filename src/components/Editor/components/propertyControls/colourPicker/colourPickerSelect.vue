<template>
    
      <v-select
                  :items = "colourList"
                  v-model = "internalSelectedColour"
                  label = "Select Colour"
                   @click = "onColourClicked(colour)" 
                ></v-select>

</template>

<script>

import theme from '../../../../plugins/theme'



export default {

    props :['selectedColour'],

  
    data(){
        return {
            colourList:[],
            internalSelectedColour:this.selectedColour

        }
    },

    created(){
         this.colourList = Object.keys(theme).map(function(key) {
    
            return key;
        });
    },
    methods:{

        onColourClicked(colour){
            this.internalSelectedColour = colour

        }

    },
    watch:{
        internalSelectedColour(v){
            this.$emit('input',v)
        }
    }
}
</script>

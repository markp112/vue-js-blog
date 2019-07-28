
//colour picker provides a means to pick a colour from the existing theme colours
<template>
    
    <v-item-group  >
        <v-container grid-list-sm z-index="100">
            <v-layout wrap>
                <v-flex v-for ="colour in colourList" :key="colour"
                    xs12 md3  
                >
                <v-item>
                    
                    <v-card  
                        :color = "colour"
                        height = "20"
                        width = "20"
                        @click = "onColourClicked(colour)" 
                    >
                     
                    </v-card>
                </v-item>
                    
                </v-flex>
               
            </v-layout>
            
        </v-container>
    </v-item-group>

</template>

<script>

import theme from '../../../../../plugins/theme'



export default {

    props :{
            selectedColour:{
                type:String,
                default:"primary"
            },
            propName:{
                    type:String,
                    default:""
            }
    },

  
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

            const data = {
                    control : this.propName,
                    value : colour
            }

            this.$emit("onChange",data)

        }

    },
    watch:{
        internalSelectedColour(v){
            this.$emit('input',v)
        }
    }
}
</script>

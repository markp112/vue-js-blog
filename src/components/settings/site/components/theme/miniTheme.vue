/* 
miniTheme.vue

Purpose: used to display a mini view of the current palette 
created: 10 Aug 2019

*/

<template>
    <v-layout row wrap>
        
        <v-flex xs8>
            <div>
                <span id="rcorners" v-for="colour in palette" :key="colour.colourName"
                    :style="getColour(colour.value)"
                
                ></span>

            </div>
            
        </v-flex>


    </v-layout>
</template>

<script>
export default {
    name:"miniTheme",

    data(){
        return{
            palette:[

                        { colourName:"darkPrimary",  value:"#303F9F" },
                        { colourName:"primary" , value: "#3F51B5" },
                        { colourName:"lightPrimary", value:  "#C5CAE9" },
                        { colourName:"textPrimary" , value:  "#FFFFFF" },
                        { colourName:"accent" , value: "#795548" },
                        { colourName:"primaryText" , value:   "#212121" },
                        { colourName:"secondaryText" , value:   "#757575" },
                        { colourName:"dividerColor" , value:  "#BDBDBD" },
                        { colourName:"textIcons" , value: "#FFFFFF"}
                    ]
        }
    },

     methods:{

        getColour(value){
            return "backgroundColor:" + value
        }
    },

}
</script>

<style>
#rcorners {
  border-radius: 25px;
  background: #73AD21;
  padding: 20px; 
  width: 200px;
  height: 150px; 
}

</style>

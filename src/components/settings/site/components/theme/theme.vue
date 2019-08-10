<template>
<v-container grid-list-xs>
    <div class="instructions"> Click on a colour to generate a new theme based on the selected colour</div>
    
    <v-layout row wrap mt-5 ml-5 justify-space-around>
        
        <v-flex xs4  v-for="(circle,index) in palette" :key="index">
            
        
            <div class = "circle" :style="getColour(circle.value)" >
                
                {{circle.colourName}}

            </div>
        </v-flex>
        
    </v-layout>
</v-container> 

</template>

<script>

export default {
    props:{
        palette:{
                type:Array,
                default:function(){
                    return [

                        { colourName:"Dark primary",  value:"#303F9F" },
                        { colourName:"Primary" , value: "#3F51B5" },
                        { colourName:"Light primary", value:  "#C5CAE9" },
                        { colourName:"Text primary" , value:  "#0001001" },
                        { colourName:"Accent" , value: "#795548" },
                        { colourName:"Secondary Text" , value:   "#757575" },
                        { colourName:"Divider Color" , value:  "#BDBDBD" },
                        { colourName:"Icon Color" , value: "#93838"},
                        { colourName:"Success" , value: "green"}
                    ]
                }
        }
    },

    methods:{

        getColour(value){
            return "backgroundColor:" + value
        }
    }
}


</script>


<style scoped>

.circle {
    width:100px;
    height:100px;
    border-radius:50px;
    font-size:12px;
    line-height: 100px;
    text-align: center;
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px 2px grey
}
.instructions{
    font-size: 1.5em;
}

</style>

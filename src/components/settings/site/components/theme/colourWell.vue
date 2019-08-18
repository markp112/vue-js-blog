

/*
micro component for showing a coloured circle
created:17 Aug 2019
Props:Passed as a single object :
{
    colour: background colour of the colour well
    Label: label for the colour well - name of the colour class as in primary, accent etc
    isSelected: is this object selected. change css class to show selection
}
    
    index: index where this occurs in the parent array, passed back out so we know which control this belongs to
 */


<template>
   
    <div class="container">
        <div    class="circle"
                :class = "{circleSelected : colour.isSelected}" 
                :style="{background:`${colour.value}`}"  
                @click="onClick"
            
            >
            {{colour.colourName}}

        </div>  
        
    </div>

</template>

<script>
export default {
    name:"colourWell",

    props:{
        colour:{
            type:Object,
            default:function(){
                return {colourName:"default",value:"#000000", isSelected:false}
            }
        },
        index:{
            type:Number,
            default:-1,
        }
    },

    data(){
        return{
            isSelected:false
        }
    },

    methods:{

        onClick(){
            this.$emit("colourClick",this.index)
        }
    }

}
</script>


<style scoped>
.container{
     margin-bottom: 20px;
}
.circle, .circleSelected {
    width:100px;
    height:100px;
    border-radius:50px;
    font-size:12px;
    line-height: 100px;
    text-align: center;
   
    box-shadow: 5px 5px 5px 2px grey
}

.circleSelected{
    border-color:firebrick ;
    border-width: 2px;
    border-style:groove;
    box-shadow: 5px 5px 2em 0.15em darkgrey
    
}

</style>
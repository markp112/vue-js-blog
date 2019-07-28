<template>

    <v-btn  :color = "getProperty('backColour')"
            :outline = "getProperty('isOutline')"
            :round = "getProperty('isRound')"
            :style ="setForeColour"
    >
      {{ getProperty("label")}}</v-btn>
   
</template>

<script>
export default {
    props:{
        properties:{
            type: Object,
            default:function(){
                return {}
            },
            required:true
        }
    },

created(){

},

computed:{


    getProperty(){
        return property =>this.properties[property]
    },

    setForeColour(){
        console.log("--> setForeColour Called")
        const foreColour = this.getProperty('foreColour')
        return {color: foreColour +"--text"}
    }

},

}

</script>

<style>

</style>

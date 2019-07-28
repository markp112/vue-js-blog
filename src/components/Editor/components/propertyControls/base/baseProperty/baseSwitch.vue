<template>
    <v-switch
        :name="propName"
        color = "primary"
        
        class = "caption"

       v-model = "localValue"
        ripple
        @change = "onChange"
        :value="propValue"
    ></v-switch>
</template>

<script>
export default {

    props:{
        propName:{
            type:  String,
            default:"prop"
        },
        
        propLabel:{
            type: String,
            default:"label"
        },

        propValue: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            localValue: this.propValue
        }
    },
    methods:{

        onChange(){
            let data ={
                control:    this.propName,
                value:      this.localValue
            }
            this.$emit("onChange",data)
        }

    },


}
</script>

<style scoped>

</style>

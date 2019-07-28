<template>

    
    <v-text-field
      
        class = "caption"
       v-model = "localValue"
        @keyup = "keyUpPressed"
        placeholder = "propValue"
        color = "primary"
    >
 
    </v-text-field>
   

</template>

<script>

export default {
    name:"textProperty",

    props:
            {
                propName:{
                    type: String,
                    default:"prop"
                },
                
                propLabel:{
                    type: String,
                    default:""
                },

                propValue: {
                    type: String,
                    default: ""
                }
                
            },

    data(){
        return {

            localValue:""
        }
    },

  


    methods:{

        keyUpPressed(key){
            console.log("key=",key)
            console.log("this local vlaue",this.localValue,this.propLabel)
            if(key.keyCode == 13){
                const data = {
                     value      : this.localValue,
                     control    : this.propName
                }
                this.$emit("onChanged", data)
            }
        }
    },

    created(){
        this.localValue = this.propValue
         console.log("this local vlaue",this.localValue)
    },
}
</script>

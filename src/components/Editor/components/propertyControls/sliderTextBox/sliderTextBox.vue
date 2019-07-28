<template>
  <v-layout>
    
      <v-flex xs12 >
      
        <v-switch
                color = "primary"
                @click = "internalHasTitle = !internalHasTitle">
        </v-switch>  

      </v-flex>
    

    <v-layout row wrap >
        <v-flex xs12  v-if = "internalHasTitle" align-content-left>

              <v-text-field 
                    v-model = "titleText"
                    @keyup = "titleTextChange">
              </v-text-field>

        </v-flex>
    </v-layout>
</v-layout>
</template>

<script>

export default {

    props:{
        
        label:{
            type:String,
            default:""
        }
    },

    data(){
        return {
            
            internalHasTitle: false,
            hasTitle: false,
            value:"",
            titleText:"",
        }
    },
    
    methods :{

        titleTextChange(){
            
            console.log("text Changed",this.titleText)
            
            let data = {
                text :  this.titleText,
               
            }
          this.$emit('onTextChanged',data)
        }
    }

}
</script>

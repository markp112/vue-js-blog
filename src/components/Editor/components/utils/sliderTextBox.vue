<template>
  <v-layout >
      
  <v-flex xs12 md6>
    <v-switch
        :label = "label"
        color="primary"
       @click = "internalHasTitle = !internalHasTitle"
    >
    </v-switch>  
  </v-flex>
    
    <v-spacer></v-spacer>

    <v-flex xs12 sm6 md6 v-if = "internalHasTitle" align-content-left>
            <v-text-field 
              
              v-model="titleText"
              @keyup ="titleTextChange"
            ></v-text-field>
    </v-flex>

</v-layout>  
</template>

<script>

export default {

    props:['label'],

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
                text :this.titleText,
                isActive : this.internalHasTitle
            }
          this.$emit('Textchanged',data)
        }
    }

}
</script>

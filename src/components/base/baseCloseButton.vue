<template>
   
        <v-card :color="backColour" width="100%" >
           <v-layout row mt-1 >
              <v-flex xs8 >
                 {{title}}
                      
            </v-flex>  
              
                 <v-flex offset-xs2 >
                  <v-icon @click ="onCloseClick" >{{icon}}</v-icon>
                 </v-flex>
               </v-layout> 
             </v-card>
         
</template>

<script>
export default {
    name:"closeButton",

props:{
        title:{
                    type:String,
                    default:""
                    },
        backColour:{
                type:String,
                default:""
        },
        
        icon:{
                type:String,
                default:"close"
        }
},

methods:{

    onCloseClick(){
        this.$emit("click")
    }
}

}
</script>




<style scoped>

.iconBorder{
    border: 1px 1px 1px 1px white;
    padding: 2px;
}

</style>
<template>
 <v-layout align-center justify-center
      row
      wrap
      ma-2
 >
     
 
    <v-flex class="border"  xs12 mr-2>
       <div v-html = "content" ></div>
    </v-flex>
 </v-layout>

</template>
<script>
 export default {
   name: 'flexComponent',
    props:{
        content : {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: 'flex'
        },
    },

   data(){
       return {
           
       }
   }
 }
</script>

<style scoped>

.border{
     border: 1px dashed  gray;
}

</style>
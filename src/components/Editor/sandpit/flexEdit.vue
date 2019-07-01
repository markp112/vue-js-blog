<template>
 <v-layout align-center justify-center
      row
      wrap
    
      ma-2
 >
     
 
    <v-flex class="border" v-for="item in flexSize" :key="item" xs1 mr-2>
        Hello I am here
    </v-flex>
 </v-layout>

</template>
<script>
 export default {
   name: 'flexComponent',
   props: [ 'flexSize' ],

   data(){
       return {
           flexOn:true,
       }
   }
 }
</script>

<style scoped>

.border{
     border: 2px dashed  gray;
}

</style>

<template>



    <v-layout row ma-2>
 
        <v-flex xs8>
            <masterContainer flexElement='xs12' />
      </v-flex>
      <v-flex xs4>
            <masterContainer flexElement='xs12'/>
      </v-flex>
 
    </v-layout>

</template>

<script>


import masterContainer from '../layouts/helpers/masterContainer'

export default {

     components:{
        
        masterContainer,
    },
  
}
</script>

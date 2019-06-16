<template>
    <v-container grid-list-xs>

    <v-layout row wrap>
        <toolbarComponent />
    </v-layout>    
    </v-container>
    

    
</template>

<script>
import tbComponent from '../components/toolbar'

export default {
    components:{
        toolbarComponent : tbComponent,
    }


}
</script>

<style scoped>

</style>

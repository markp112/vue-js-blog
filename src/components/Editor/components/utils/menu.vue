/* to be decided if we want to allow users to build a menu of items */

<template>
    <v-layout>
        <v-flex xs12>
            <v-switch :label="label" v-model="value"></v-switch>
            
        </v-flex>
        <v-flex xs12 md6>

            
        </v-flex>
    </v-layout>
</template>

<script>
export default {

    props:['label'],

    data(){
        return {
            value : false,
        }
    }

}
</script>

<style>

</style>

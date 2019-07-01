<template>
    <v-container grid-list-xl>

        <v-layout wrap>
            <v-flex xs12>
                <slot/>
                
            </v-flex>
        </v-layout>
        
        <photoCard 
            :key="1"
            :size="layout[1]"
        
        ></photoCard>


    </v-container>
</template>


<script>

import photocard from './templateComponents/photoCard'
export default {
    components:{
        photoCard: photocard
    },

    data(){
        return {
            layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
            page: 1
        }
    }
}
</script>

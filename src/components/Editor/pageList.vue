<template>
    <v-container grid-list-xs >
        <v-layout row wrap align-content-start>
            <v-flex >
                <v-card class="card--flex-toolbar" >
                    <v-toolbar card color="white" flat>
                        <v-toolbar-title class="body-2 grey--text">{{currentMenu}}</v-toolbar-title>
                        <v-spacer></v-spacer>
        
                            <v-btn icon>
                                <v-icon>add_box</v-icon>
                            </v-btn>
                    </v-toolbar>
                    <v-list class="pt-0" dense>
                         <v-list-tile
                            v-for  = "item in items"
                            :key   = "item.component"
                            @click ="onMenuItemClick(item.component)"
                    >
                        <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
            
                        <v-list-tile-content>
                        <v-list-tile-title>{{ item.menuItem }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                                    
                    </v-list>
                </v-card>
        
                    
                <v-divider></v-divider>
  
        
            </v-flex>
            
            
        </v-layout>
        
    </v-container>
</template>

<script>
export default {
    data () {
        return {

            currentMenu:'Current Menu'
        }
    },
    computed:{
        
        items(){
            console.log('getPageItems called')
           return  this.$store.getters.getPageItems
        }


    }
    
}
</script>
<style>
.pageTitle{
    font-size: 18pts,
        
    
}
</style>

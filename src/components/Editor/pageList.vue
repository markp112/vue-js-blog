<template>
   <v-container fill-height fluid >

        <v-layout>
          <v-flex xs12 lg12 sm6 >
                <v-card class="card--flex-toolbar" >
                    <v-toolbar card color="white" flat>
                        <v-toolbar-title class="body-2 grey--text">{{currentMenu}}</v-toolbar-title>
                   
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>add_box</v-icon>
                            </v-btn>
                       
                            
                    </v-toolbar>
                    
                    <v-data-table
                        :headers = "headers"
                        :items = "items"
                        class="elevation-1 align-start"
                        
                    >
                    <template v-slot:items="props">
                        <td class="text-xs-center"><v-icon>{{props.item.icon}}</v-icon> </td>
                        <td class="text-xs-center">{{ props.item.title }}</td>
                        <td class="text-xs-center">{{ props.item.status }}</td>
                        <td class="text-xs-center">{{ props.item.type }}</td>
                        <td class="text-xs-center">{{ props.item.url }}</td>
                    </template>
                    </v-data-table>
                  
                </v-card>
        
          </v-flex>   
                <v-divider></v-divider>
           
            </v-layout>
  
   </v-container>

</template>

<script>
export default {
    data () {
        return {

            currentMenu:'Current Menu',
            headers:[
                {
                    text:"",
                    align:"center",
                    sortable:false,
                    value:"icon"
                },
                {
                    text: "Title",
                    sortable: true,
                    value: "title"
                },
                {
                    text: "Status",
                    sortable: true,
                    value: "status"
                },
                {
                    text: "Type",
                    sortable: true,
                    value: "type"
                },
                {
                    text: "Url",
                    sortable: false,
                    value: "url"
                },

            ]            
        }
    },
    created(){
        const pageItems= {
            item:"pageItems"
        }
        this.$store.dispatch("retrievePageItems",pageItems)

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
.containerHeight{
    height: 900px;
}
</style>

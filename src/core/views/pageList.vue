<template>
   <v-container   row>

        <v-layout justify-center>
          <v-flex xs10 md8 sm6 >

                <v-card class="card--flex-toolbar" >
                    <v-toolbar card color="white" flat>
                        <v-toolbar-title class="body-2 grey--text">Pages linked to {{currentMenu}}</v-toolbar-title>
                   
                           
                            <v-tooltip bottom>
                                                         
                                <template v-slot:activator="{ on }">
                                    <v-btn icon>
                                        
                                        <v-icon hover v-on="on">add_box</v-icon>
                                    </v-btn>
                                   
                                </template>
                                 <span>Click to add a new page</span>
                            </v-tooltip>
                    </v-toolbar>
                    
                    <v-data-table
                        :headers = "headers"
                        :items = "items"
                        class="elevation-1 align-start"
                        
                    >
                    <template v-slot:items="props">
                        <v-hover>
                            <td  @click = "onIconClicked(props.item)"  
                                        slot-scope="{ hover }"
                                        :class="`elevation-${hover ? 12 : 1}`"
                                        class="mx-auto">
                                <v-icon :color="props.item.status"> {{ props.item.icon }} </v-icon>
                            </td> 
                        </v-hover>  
                         <td class="text-xs-left">{{ props.item.title }}</td>
                        <td class="text-xs-left">{{ props.item.status }}</td>
                        <td class="text-xs-left">{{ props.item.type }}</td>
                        <td class="text-xs-left">{{ props.item.url }}</td>
                    </template>
                    </v-data-table>
                  
                </v-card>
        
          </v-flex>   
                <v-divider></v-divider>
           
            </v-layout>
            <v-alert :color="alertColour" :value="alert" transition="fade-transition">
               
                {{ alertMessage }}
                
                <v-btn flat icon color="primary" @click="alert = false" >
                    <v-icon>highlight_off</v-icon>
                </v-btn>

             </v-alert>
   </v-container>

</template>

<script>
export default {
    data () {
        return {

            currentMenu:'Home Page',
            headers:[
                {
                    text:"",
                    align:"center",
                    sortable:false,
                    value:"icon",
                    width:"5%"
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

            ],
            alert:false,
            alertColour:"success",
            alertMessage:"",

        }
    },

    methods:{

        onIconClicked(item){

            console.log("Icon Clicked",item)
   
   //            
    // user has clicked a page they wish to edit
    // load the page details and send them to the editor based on the template linked to the page
    //
          this.$store.dispatch("updateCurrentPageName", item.title)

          this.$store.dispatch("retrievePageDetail", item.title)
          .then(template => {  
            
            console.log("template= " , template)
            
           // log which page the user is working on
           
             //template represents a master Layout style at present 2nd July 2019 there is only one template the master.vue

            if(template.length != 0){
                
                this.$router.push(template)
            }
        })
        .catch(err =>{
            console.log("error Alert")
            this.alertMessage = JSON.stringify( err)
            this.alertColour = "error"
            this.alert = true

        })
          


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
           // console.log('getPageItems called')
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

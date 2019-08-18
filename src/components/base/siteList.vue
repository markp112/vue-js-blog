<template>
    

    

<v-card>
    <close-Button @click = "onCloseClick" icon="keyboard_return" ></close-Button>
    <v-container grid-list-xs>
        <v-layout align-content-start row>
   <v-card v-for="site in sites" :key="site.siteId" class="ml-2">
       <v-toolbar color="secondary darken-1">
           <v-btn flat icon color="primary " class="white--text" @click="onEditSiteClicked(site.siteId)">
                <v-icon>create</v-icon>
            </v-btn>
           {{site.sitename}} 
       </v-toolbar>
      
       <v-layout row wrap v-if="showSiteDetail" class="mt-1">
           this is were the rest of the info about the site will be shown 
           such as the 
                date created
                an image
                is the site published
                site folder
                site url
                etc 
       </v-layout>
   </v-card>
   </v-layout>
   </v-container>
</v-card>
   


        
</template>


<script>



import closeButton from "./baseCloseButton"

export default {
    
    name:"siteList",

    components:{

        "close-Button":closeButton
    },

    props:{
      
        showSiteDetail:{
                type:Boolean,
                default:true
        }
    },
    data(){
        return {
        // sites:[],
        }
    },


    created(){

        this.$store.dispatch("retrieveListOfSites")
                    
    },

    methods:{
         onEditSiteClicked(siteId){

            console.log("-->OnEditSiteClicked-->" ,siteId)
            //update the store with the selected siteID
            this.$store.dispatch("updateSiteId",siteId)

            this.$emit("onSiteEditClick",siteId)

        },

        onCloseClick(){
            this.$emit("onCloseClick")
        }
    },

    

   computed:{
       sites(){
           console.log("siteList Computed Called")
           return this.$store.getters.getSiteList
       }
   }
}
</script>

<style>

</style>

/*
    sites.vue

    provides a list of sites the user has created and allows a user to select a site to edit


*/
<template>

 
    <div :class="pageHeightMax">

<v-container grid-list-xs>
    


<v-layout align-content-start column>

    <v-flex xs-8 >
        
   
            <div class="display-1">My Site List</div>
            <v-list two-line >
            <v-list-tile
              v-for="site in sites"
              :key="site.siteId"
              
            
            >
              <v-list-tile-action>
                  <v-btn flat icon color="primary" @click="onEditSiteClicked(site.siteId)">
                      <v-icon>create</v-icon>
                  </v-btn>
                
              </v-list-tile-action>
  
              <v-list-tile-content>
                <v-list-tile-content ><span class="subheading"> {{site.sitename}} </span></v-list-tile-content>
               
                    
              
              </v-list-tile-content>
  
            
            </v-list-tile>
            </v-list>
   
    </v-flex>
        </v-layout>
  </v-container>
           </div>
</template>

<script>

export default {

    methods:{

        onEditSiteClicked(siteId){

            console.log("OnEditSiteClicked-->" ,siteId)
            
            this.$store.dispatch("updateSiteId",siteId)
            this.$router.push("/pages")
        }

    },


    computed:{
        sites(){
            return this.$store.getters.getSiteList
        },
    pageHeightMax() {

      return this.$store.getters.getPageHeight
    
   }
    },
    
    created(){
        console.log("site = ",this.$store.dispatch("retrieveListOfSites"))
        this.$store.dispatch("retrieveListOfSites")
      }
}
</script>

<style>

</style>



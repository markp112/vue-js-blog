<template>
   <div class="pageHeight">
        <v-layout align-content-center row>
           <v-flex xs-12 > 

               <div class="display-3 banner " id="banner">
                        Welcome to Sparkz CMS
                </div>

                <div class = "subheading" >
                    <p>
                            A modern content management system using Vuejs, vuetify and Amazon Web Services.
                    </p>

                    <p>
                        Sparkz CMS allows you to create mutliple sites which once published are deployed automatically to Amazon Cloud Services.
                    </p>
                    <p  >
                        Sparkz CMS deploys to S3 buckets supported by DynamoDb.
                    </p>
                </div>

            
        </v-flex>
        </v-layout>   
   </div> 
</template>

<script>
export default {
    data() {
        return{
            dataItem:{
                item:"toolBarMenu",
                subItem:"home"

            }
        }
    },


    created(){
        
        this.$store.dispatch("retrieveToolbarItems",this.dataItem)
    },

    

 
    }


</script>


<style>
.p {
    margin-top: 10vh;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 16px;


}
.banner{
    margin-bottom: 10vh;
}
.pageHeight{height: 800px;}

</style>

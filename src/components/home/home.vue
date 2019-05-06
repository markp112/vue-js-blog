<template>
    <v-container grid-list-xl fluid fill-height align-content-start>
        <v-layout column>


            <v-responsive height="200px" :aspect-ratio="16/9">

                <div class="display-3 banner " id="banner">
                        Welcome to Sparkz CMS

                </div>
                
                

                <div class="display-0" justify-center>
                    <p>
                        A modern content management system using Vuejs, vuetify and Amazon Web Services.
                    </p>

                 <p class="display-0" justify-center>
                    Sparkz CMS allows you to create mutliple sites which once published are deployed automatically to Amazon Cloud Services.
                </p>
                 <p class="display-0" justify-center>
                    Sparkz CMS deploys to S3 buckets supported by DynamoDb.
                </p>
                </div>

            </v-responsive>

        </v-layout>
        
    </v-container>
    
</template>

<script>
export default {
    data() {
        return{
            dataItem:{
                menu:"toolBarMenu",
                menuLocation:"home"

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

</style>

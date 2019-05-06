/* 

Lets Get Started is the landing page for when the user first signs up or has no sites created 

The user should be able to create a new site from here and find help



*/


<template>
    <v-container fluid>
        <v-layout justify-center row wrap>
            <div v-if="showWelcome">
               <div class="display-1 align-content-center pa-3">
                    Welcome to SparkzCMS thank you for joining us today.
                    We hope you find our content management system helpful in creating the websites you want to build
               </div>
            </div>
                <v-spacer></v-spacer>
                
                <v-flex
                    xs10
                    justify-center
                  
                >
                    
                
                <v-carousel light >
                    <v-carousel-item
                        v-for = "(card,i) in cardItems "
                        :key="i"
                   
                        transition="fade"
                        
                    >
                    <v-container fluid >
                        <v-layout row wrap justify-center >
                            <v-flex xs8 >
                             <v-card  >
                           
                            <v-card-title  max-width class="primary darken-2  display-1 " >
                                    <span style="color:white ">  {{ card.cardTitle }} </span>
                            </v-card-title>  
                            <v-card-text>
                                {{ card.cardText }}
                            </v-card-text>    
                              
                            
                            
                        </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                 
                  
                    </v-carousel-item>
                </v-carousel>

            </v-flex>


        </v-layout>
        
    </v-container>


</template>

<script>
export default {
    data(){
        return {

             dataItem:{
                menu:"cards",
                menuLocation:"letsGetStarted"

            },

            showWelcome:true,

        }
    },

    beforeMount() {
    
        this.$store.dispatch("retrieveCardItems", this.dataItem)

    },

    computed:{

        cardItems() {
            return this.$store.getters.cardItems
        }


    }
}
</script>

<style>
.cardtitle{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border: 1px solid #000;
    background-color: cadetblue;

}

.fade{
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
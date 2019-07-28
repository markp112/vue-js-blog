/* 
    newSite.vue
    date Created: 5 may 2019
    Author: mark

    Purpose: newsite provides the means by which a user can create a new site. 
    the user should be able to define a site name a description and select a 
    template on which to build the site

*/

<template>

    <v-container fluid row align-content-start >
      
        
        <v-layout  justify-left>
            <v-flex xs6 sm8 md6  caption>
           
                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field
                        label = "Name of site"
                        v-model = "siteName"
                        :rules = "siteNameRules"
                        required
                        class="body-1"
                         box
                        :colour="textColour"
                    ></v-text-field>
                    <v-textarea
                        class = "body-1"
                        label = "Description"
                        v-model = "siteDescription"
                        :rules = "siteDescriptionRules"
                        required
                        box
                        :colour="textColour"
                    ></v-textarea>
                 
               
                   
                    <v-text-field
                        class="body-1"
                        label="Domain Name"
                        v-model="url"
                        box
                        :colour="textColour"
                        
                    ></v-text-field>
                      <v-text-field
                        class="body-1"
                        label="S3 Bucket Host"
                        v-model="s3BucketSiteHost"
                        box
                        :colour="textColour"
                        
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="Select default pages to be created"
                        disabled
                    ></v-text-field>
                    <v-layout align-center >
                        
                        <v-checkbox v-model="pages" label="Home" value ="Home" hide-details class="shrink mr-2"></v-checkbox>
                        <v-checkbox v-model="pages" label="About" value ="About" hide-details class="shrink mr-2"></v-checkbox>
                        <v-checkbox v-model="pages" label="Contact" value ="Contact" hide-details class="shrink mr-2"></v-checkbox>
                        <v-checkbox v-model="pages" label="Blog" value ="Blog" hide-details class="shrink mr-2"></v-checkbox>
                    </v-layout>

                    <v-flex mt-3 align-center>
                    <v-btn color="deep-purple"
                        @click="createSite"
                        :disabled="!valid"
                        outline
                    >
                        Create
                    </v-btn>   
                    <span  v-if="ShowSuccess" > 
                    
                        <v-avatar color="indigo" darken-1 size="48">
                            <v-icon color="green" ml-2 large fab>check</v-icon>        
                        </v-avatar>
                        Site Created 
                    </span>
                    </v-flex>
                    
                  <!--   <v-btn @click="clear">clear</v-btn> -->
                </v-form>

                 
         
            </v-flex>
        </v-layout>
         <v-layout align-content-start justify-right>
                    <v-flex xs6 sm4 md2>
                        <div class="mybox">
                        
                            <v-img :src="templateImage" contain height="150px" full-width> </v-img>
                        
                        </div>
                    </v-flex>
                </v-layout>
 </v-container>

</template>
        
    <script>
            
        export default {
            data: () => ({
                
                valid: true,
                siteName: "",
                siteNameRules: [v => !!v || "Name is required"],
                siteDescription: "",
                siteDescriptionRules: [v => !!v || "Description is required"],
                templateImage:"",
                s3EditorBucketName:null,
                s3BucketSiteHost: null,
                url:null,
                pages:['Home'],
                textColour : "deep-purple",
                ShowSuccess: false


            }),
        
            methods: {
                createSite() {
                    if (this.$refs.form.validate()) {
                        
                        
                        // save content to dynamodb - generate site ID
                        // create s3 folder
                        // update users profile, log site name, and id

                        const newSiteData = {
                            siteName : this.siteName,
                            siteDescription : this.siteDescription,
                            url: this.url,
                            pages: this.pages,
                            dateCreated : new Date(),
                            dateLastEdited : new Date(),
                            isPublished:false,

                        }

                    this.$store.dispatch("createNewSite",newSiteData)
                    .then (result =>{
                        if(result == "Success"){
                            
                            this.valid = false //prevent a resave
                            this.ShowSuccess = true


                        }
                    })

                    }
                },
                clear() {
                    this.$refs.form.reset();
                }
            },
            
        };
    </script>
    

<style scoped>
.myBox{
    border: 1px;
    border-color: cornflowerblue;
    background-color: deep-purple;

}

  .v-text-field input {
    font-size: 1.2em;
  }

</style>

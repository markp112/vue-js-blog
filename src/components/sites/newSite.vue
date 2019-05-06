/* 
    newSite.vue
    date Created: 5 may 2019
    Author: mark

    Purpose: newsite provides the means by which a user can create a new site. 
    the user should be able to define a site name a description add an image for the site and select a 
    template on which to build the site

*/

<template>

    <v-container fluid fill-height>
      
        
        <v-layout align-content-start justify-left>
            <v-flex xs6 sm8 md8>
           
                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field
                        label="Name of site"
                        v-model="siteName"
                        :rules="siteNameRules"
                        :counter="10"
                        required
                         box
                        colour="deep-purple"
                    ></v-text-field>
                    <v-textarea
                        label="Description"
                        v-model="siteDescription"
                        :rules="siteDescriptionRules"
                        required
                        box
                        colour="deep-purple"
                    ></v-textarea>
                 
                    <v-text-field
                        label="Path to Site Image"
                        v-model="siteImage"
                        box
                        colour="deep-purple"
                    ></v-text-field>
                    <v-select
                        label="Template"
                        v-model="templates"
                        :items="siteTemplates"
                        :rules="[v => !!v || 'Item is required']"
                        required
                         box
                        colour="deep-purple"
                    ></v-select>
                   
                    <v-text-field
                        label="Domain Name"
                        v-model="url"
                         box
                        colour="deep-purple"
                        
                    ></v-text-field>
                      <v-text-field
                        label="S3 Bucket Host"
                        v-model="s3BucketSiteHost"
                         box
                        colour="deep-purple"
                        
                    ></v-text-field>
                    <v-btn
                        @click="createSite"
                        :disabled="!valid"
                        outline
                    >
                        Create
                    </v-btn>
                  <!--   <v-btn @click="clear">clear</v-btn> -->
                </v-form>

                 
         
            </v-flex>
        </v-layout>
         <v-layout align-content-start justify-right>
                    <v-flex xs6 sm4 md2>
                        <div class="mybox">
                        
                            <v-img :src="siteImage" contain height="150px" full-width> </v-img>
                        
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
                siteNameRules: [v => !!v || "Name is required", v => (v && v.length <= 10) || "Name must be less than 10 characters"],
                siteDescription: "",
                siteDescriptionRules: [v => !!v || "Description is required"],
                siteTemplates: null,
                templateItems: [],
                s3BucketSiteHost:null,
                siteImage:"",
                url:null,


            }),
        
            methods: {
                createSite() {
                    if (this.$refs.form.validate()) {
                        
                        
                        


                    }
                },
                clear() {
                    this.$refs.form.reset();
                }
            }
        };
    </script>
    

<style>
.myBox{
    border: 1px;
    border-color: cornflowerblue;
    background-color: deep-purple;

}
</style>

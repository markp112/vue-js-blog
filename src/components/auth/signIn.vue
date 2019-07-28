<template>
<div class="pageHeight">


  <v-layout align-center column>
    <v-flex xl-6>
    
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
            <v-flex xs-12>
              
            <v-card width = "400px">
               <v-flex xl-8>
                <v-form @submit.prevent="onSubmit">
                <v-text-field
                label="E-mail"
                v-model="email"
                placeholder="Enter Email"
                box>
                
              </v-text-field>
            
            <v-text-field
                label="Password"
                v-model="password"
                type="password"
                
                placeholder="Enter Password"
                box
              >

            </v-text-field>
              
              <v-toolbar flat dense>
                <v-btn flat type="submit" v-if="email && password">Submit</v-btn>
              </v-toolbar>
            </v-form>
            </v-flex>
          </v-card>
            </v-flex>
          </v-layout>       
   
   
        </v-container>

    
          <v-snackbar
            v-model="showSnackBar"
          
            top>
            <div>{{ statusMsg }}</div>
            <v-btn
                color="secondary"
                flat
                @click="showSnackBar = false"
            >
                Close
            </v-btn>
          </v-snackbar>
       
    </v-flex>
  </v-layout>

</div>
</template>

<script>


import Amplify from "@aws-amplify/core"

const Logger = Amplify.Logger
const logger = new Logger("SignInPage")

  export default {
    data () {
      return {
        email: '',
        password: '',
        statusMsg:'',
        showSnackBar:false,
        msgColor:'success',
        isSignUpSubmitted:false,
        verificationCode:null,

          dataItem: {
                item : "toolBarMenu",
                subItem :"sites"

            },

      }
    },
    methods: {
      
      onSubmit () {
      
      logger.debug('--> SignIn Called')
      
      const formData = {
          email: this.email,
          password: this.password,

        }
  

      const Offline = this.$store.getters.isOffline

      if (Offline == true){
        this.$store.dispatch("offLineLogin")
        this.performLogin()
      }else{

        this.$store.dispatch('login',{
            email: formData.email,
            password: formData.password
        })
        .then (res=>{
            if(res == 'success'){
              
              this.performLogin()
            }
            else{
              this.statusMsg = res;
              this.showSnackBar=true;
            }
        })
        .catch(err=>{
          if(err.message == "Incorrect user name or password"){

              this.statusMsg = "Invalid user name or password";
              this.showSnackBar = true;

          }else{
              console.log(err);

              this.statusMsg=err.errMsg;
              this.showSnackBar=true;
          }
        })

        
      }
    


    },

     performLogin(){
              this.statusMsg = "Login Successful";
              this.showSnackBar = true;
              
              //retrieve items for the top toolbar based on the Sites page the page we are navigating to
              this.$store.dispatch("retrieveToolbarItems",this.dataItem)                        
                
               //retrieve items for sideBarMenu based on the Sites page the page we are navigating to
              this.dataItem.item = "sideBarMenu"
                
              this.$store.dispatch("retrieveMenuItems",this.dataItem)             

              this.$store.dispatch("updateIsInEditor", false)
              this.$router.push('/sites');
    },
   
  },

  created(){
    if (this.$store.dispatch("tryAutoLogin")){

      console.log("performing login via auto login")

        this.performLogin()
    }
  },
  beforeMount() {
      this.$store.dispatch("updatePageHeight","800px")
    },
  }
</script>

<style scoped>
 .signInContainer {
  height: 350px;

  
}
.pageHeight{height: 800px;}
</style>
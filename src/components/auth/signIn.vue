<template>
<v-container fluid 
               >
  
  <v-layout justify-start align-center  column fill-height>
    <v-flex xs-12>

      <div  class="signInContainer">
        <v-layout>
          <v-card width="400px">
            <v-form @submit.prevent="onSubmit">
            <v-text-field
                label="E-mail"
                v-model="email"
                placeholder="Enter Email"
            ></v-text-field>
            
            <v-text-field
                label="Password"
                v-model="password"
                type="password"
              >

            </v-text-field>
              
              <v-toolbar flat dense>
                <v-btn flat type="submit" v-if="email && password">Submit</v-btn>
              </v-toolbar>
            </v-form>
          </v-card>
          <v-snackbar
            v-model="showSnackBar"
          
            top>
            {{ statusMsg }}
            <v-btn
                color="secondary"
                flat
                @click="showSnackBar = false"
            >
                Close
            </v-btn>
          </v-snackbar>
        </v-layout>
      </div>
     
    </v-flex>
  </v-layout>
</v-container>
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
                menu:"toolBarMenu",
                menuLocation:"sites"

            },

      }
    },
    methods: {
      onSubmit () {
        logger.debug('SignIn Called')
        const formData = {
          email: this.email,
          password: this.password,

        }
  
        this.$store.dispatch('login',{
            email: formData.email,
            password: formData.password
        })
        .then (res=>{
            if(res == 'success'){
              
              this.statusMsg = "Login Successful";
              this.showSnackBar = true;
         
              
              this.$store.dispatch("retrieveToolbarItems",this.dataItem)                        
                
              this.dataItem.menu = "sideBarMenu"
                
              this.$store.dispatch("retrieveMenuItems",this.dataItem)             

              this.$router.push('/sites');
            }
            else{
              this.statusMsg = res;
              this.showSnackBar=true;
            }
        })
        .catch(err=>{
          if(err=="invalid user name or password"){
              this.statusMsg="invalid user name or password";
              this.showSnackBar=true;
          }else{
            console.log(err);
              this.statusMsg=err.errMsg;
              this.showSnackBar=true;
          }
        })

        
      },
    
    }
  }
</script>

<style scoped>
 .signInContainer {
  height: 350px;
}
</style>
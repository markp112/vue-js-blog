<template>
<v-container grid-list-xs>
    <v-layout align-center align-content-start column>
  <div id="signup">
 <form @submit.prevent="testMyFunction">
     <div class="submit">
          <button type="submit">Test function</button>

        </div>
    </form>

    <div class="signup-form" v-if="!isSignUpSubmitted">
      <form @submit.prevent="onSubmitSignUp">
        <div class="input">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword">
        </div>
        
        <div class="input inline">
          <input type="checkbox" id="terms" v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>

    </div>
     <div v-if="isSignUpSubmitted" class="signup-form">
           <v-layout>
          <v-card width="400px">
            <v-form @submit.prevent="onSubmitVerificationCode">
            <div>
              Please confirm your email address we have sent a 6 digit code to the email address you signed up with, please enter it here:
            </div>
            

            <v-text-field
                class="ma-2 pa-2"
                v-model = "verificationCode"
                label = "Enter Code"
                placeholder = "xxxxxx"
                background-color="light-blue"
                box
            ></v-text-field>
            <v-spacer></v-spacer>
              <v-toolbar flat dense>
                <v-btn flat type="submit">Submit</v-btn>
              </v-toolbar>
            </v-form>
          </v-card>
           </v-layout>
      </div>
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
  </div>
  </v-layout>
</v-container>
  
</template>

<script>


import Amplify from "@aws-amplify/core"

const Logger = Amplify.Logger
const logger = new Logger("SignUpPage")
//  const Logger = Amplify.Logger

  // const logger = new Logger("signUpPage")




  export default {
    data () {
      return {
        email: '',

        password: '',
        confirmPassword: '',
        showSnackBar:false,
        statusMsg:'',
        terms: false,
        isSignUpSubmitted:false,
        verificationCode:null,

             dataItem:{
                item : "toolBarMenu",
                subItem : "letsGetStarted"

            },
      }
    },
   mounted() {
    // clear existing status message
    this.$store.dispatch("clearAuthenticationState")
  },
    methods: {
      
      testMyFunction(){
        logger.debug('in test function')

        this.$store.dispatch('isUserRegistered')
      },


      async onSubmitSignUp () {
          
          logger.debug("sign-up")
          
          const formData = {
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
          
            terms: this.terms
        }
      
        if (this.password == this.confirmPassword)
         {   
            try{
            var result = await this.$store.dispatch('signup',formData)

            if(result.success){
                this.isSignUpSubmitted = true

            }else{
                console.log('err =',result.message)
                this.statusMsg = result.message;
                this.showSnackBar = true;
            }
            }
            catch (err) {
                console.log('err =',err.message)
                this.statusMsg = err.message;
                this.showSnackBar = true;
            }
         }
    },

  async onSubmitVerificationCode (){

    await this.$store.dispatch ('submitVerificationCode', this.verificationCode)
    .then( data =>{
      if(data == 'SUCCESS'){
        
        this.$store.dispatch('registerUser')

        this.statusMsg = "You have successfully signed up to Image Grabber";
        
        this.showSnackBar = true;
        
        this.$store.dispatch("retrieveToolbarItems",this.dataItem)
        this.$store.dispatch("updateIsInEditor",true)
        this.$router.push('/start');
      }
    })
    .catch( err => {
       console.log('err =',err.message)
              this.statusMsg = err.message;
              this.showSnackBar = true;
    })

      }

    }
  }
        
      

</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>
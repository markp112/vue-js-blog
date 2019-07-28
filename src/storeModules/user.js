//import router from '../router';


import Amplify from 'aws-amplify';

import auth from '@aws-amplify/auth';

import API from '@aws-amplify/api'

//configuration file for Amplify
import config from '@/AWS/amplifyConfigure';


Amplify.configure(config)


    //---------------------------------------------------------------------------
    const defaultstate = {
        
        refreshToken : null, // does token need refreshing
        user : {
            email: null,
            userId : null,
            idToken : null,
            confirmed : null,
            userName: null,
            avatar: null,
            sites:[],

        } , // current user details

        isSignedIn: false,
        
        ERRORCODES : {
            userExists:"UsernameExistsException"
        },
        
    };

    //---------------------------------------------------------------------------
    const mutations = {
        

  
      storeUser(state, userData){
        console.log('store User Called',userData)

        state.user.email  = userData.email
        state.user.idToken = userData.idToken
        state.user.confirmed = userData.confirmed
        state.user.userId = userData.userId

        console.log('state.user',state.user)

        localStorage.setItem('email',userData.email)
        localStorage.setItem('token',userData.idToken)
        localStorage.setItem('userId',userData.userId)

      },
      userConfirmed:(state, confirmed) =>{
        state.user.confirmed = confirmed
      },
      clearAuthData(state){
        console.log("--> ClearAuthData Called")
      
        state.dashboardOpen = false;
        state.user = {};
      
        
      
      },
    
      setUserId(state,userId){
         console.log("setUserId called",userId)

        if (state.user != undefined){
         
            state.user.userId = userId
        }
      }
    }
    //---------------------------------------------------------------------------
    const actions = {
     
      clearAuthenticationState({commit}){

        commit("clearAuthData")
      },
   

  
    signup: async ({commit},userData) =>{
       
       console.log('signup called',userData)
      
       return new Promise( function (resolve,reject){
      
         auth.signUp({
          username: userData.email,
          password: userData.password,
        })
        .then (data =>{
          
          console.log('data=',data)
          
          var user = {
            success: true,
            idToken: data.userSub,
            email: userData.email,
            userId: null,
            confirmed: data.userConfirmed
          }
          commit('storeUser',user)

          resolve(user)
        }
          
          )  
      
       .catch (err =>  {
         console.log('err=',err)
         //Todo Implement logic for when user is already registered with Cognito
         var user = {
          success: false,
          message:err.message
        }
        
         reject(user)
         
       })
      }
    )
    },

    //Allow user to submit verification code on sign up received from Cognito

  submitVerificationCode: async ({commit,state}, vCode) => {
    
    console.log('submit Verification Code called')

    return new Promise( function (resolve,reject){
     
      console.log('user=',state.user.email)

      auth.confirmSignUp(state.user.email, vCode)
      .then (data =>{

        console.log('userConfirmed = ',data)
        
        commit('userConfirmed',true)
        
        resolve(data)
      })
      .catch (err => {
        console.log('err= ',err)
        reject(err)

      })
    })
  },

  isUserRegistered: async({commit,state}) =>{
    console.log('isUserRegistered Called')

    if (state.user == undefined || state.user.email == null){
      throw {
             name:"Missing Email Error",
             message: "Email address is not defined or set"
             }
             
           }
        const userData = { 
            
            email:state.user.email,// state.user.userId,
            
        }
        
        let apiName = "sparkzCMS_isUserRegistered"
        let path = 'dev/sparkzCMS_isUserRegistered'
        let init = {
          body: userData,
       
        }
      
  
       var result = await API.post(apiName, path, init)
        
       const uuid = JSON.parse(result.body).uuid
      
      
      console.log('get user uuid = ',uuid)
    
        if(uuid == "not found" || uuid == undefined){
          
            return false
        
        } else {
          
          commit("setUserId",uuid)
          return true
        }
      

  },

  registerUser: async ({commit,state,dispatch}) =>{

    console.log('register User Called')
   
     
   if (state.user == undefined || state.user.email == null){
       throw {
              name:"Missing Email Error",
              message: "Email address is not defined or set"
              }
              
            }

      const isUserRegistered = await dispatch("isUserRegistered")    

      if(!isUserRegistered){
        
        console.log('get user not found')

        const userData = { 
            userData:{
            email:state.user.email,// state.user.userId,
            idToken:state.user.idToken
        }

        }
        let apiName = "sparkzCMS_RegisterUser"
        let path = '/dev/sparkzCMS_RegisterUser'
        let init = {
          body: userData,
      
        }
      
    try {

        var result = await API.post(apiName, path, init)

          // Add your code here
          console.log('Register User --> response = ',result)
         
          if (result.statusCode == "200"){
            var uuid = JSON.parse (result.body).uuid
            
            console.log('uuid = ',uuid)
           
            commit("setUserId",uuid)
            
            
          }
        }

      
       catch(error) {
          console.log('API Err=',error)
        }
 

    //})
  }
  },

  //
  //create a dummy login if offline so the site csn still function
  //
  offLineLogin({commit}){
    

                var userData = {
               //   userId: res.username,
                  email: "mark@text",
                  cognitoUserName:"mark",
                  confirmed: true,
                  idToken: "1234",
                  
                } 
                commit('storeUser', userData);
                

    
      return ("success")

  },
        
  
  //---------------------------------------------------------------------------
  // Login into App
  //---------------------------------------------------------------------------
    login({commit,dispatch},authData){
      
       console.log('-->Login called ',authData)
        
      
       return new Promise(function (resolve,reject){
        
          auth.signIn(authData.email, authData.password)
           .then(res =>{
             
            console.log('Cognito returned ',res)
              
              auth.currentSession()
              .then (data => {
                
                console.log('data =',data)
               
                const expires =  data.accessToken.payload.exp

                var userData = {
               //   userId: res.username,
                  email: authData.email,
                  cognitoUserName: res.username,
                  confirmed: true,
                  idToken: res.username,
                  expireTime : expires
                } 
                commit('storeUser', userData);

                const now = new Date();
               
                const expirationDate = new Date(now.getTime() + expires * 1000);
                
                localStorage.setItem('expiresIn',expirationDate)  

                dispatch('setLogOutTimer',expirationDate); 

              
                resolve('success')
              })
                 
                
              //  console.log('userData=',userData)
               
                
             
          })
          .catch(err =>{
            reject(err);
  
          } )
  
    })}  ,
    //---------------------------------------------------------------------------
    logout({commit}){
      
      commit('clearAuthData');

      this.$router.replace('/signin');

      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('userID');

  
    },
    //---------------------------------------------------------------------------
    tryAutoLogin({commit}){

      console.log("--> tryAutoLogin")
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      console.group
      console.log("token = ", token)
      console.log("email= ", email)
      console.groupEnd

      if (!token){
        return false
      }
       const expirationDate = localStorage.getItem('expiresIn') ;
       const now = new Date();
       
       if (now >= expirationDate){
         
        console.log("Expired.....")

         commit('clearAuthData');
        
         return false
       }

       const userId = localStorage.getItem('userId');
       
       console.log("userID = ",userId)
       
       commit('storeUser',{
              idToken : token,
              userId : userId,
              email : email,
              confirmed : true
              }

            )
          return true
    },
     //---------------------------------------------------------------------------
     
    
    
    //---------------------------------------------------------------------------
    // Operational functions
    //---------------------------------------------------------------------------
          
    setLogOutTimer({commit},expirationTime){
        setTimeout(()=>{
          
          commit('clearAuthData');
        }, expirationTime * 1000 )
      },
     
    }


    //---------------------------------------------------------------------------
    // getters
    //---------------------------------------------------------------------------
    
    const getters = {
        user(state){
            return state.user;
         },
         userId(state){
           if (state.user.idToken == undefined){
              return 'bf5f4f2f-6faa-4ed5-b53c-6b8f8cce9d26'
           }else{
              return state.user.idToken;
           }
         },
         isAuthenticated(state,rootState){
          


          const offline = rootState.isOffline

          if(offline){

            return true

          }else{
            
           return state.user.idToken !== null  || state.user.idToken !== '' || state.user.idToken !== undefined
          }
         },
    
         userName: state =>{
             if(state.user.userName !== undefined && state.userName !== null){
                 
                return state.userName

             }else{
               return "Mark Phillips"
             }

            

             },
         email: state =>{
                if(state.email !== undefined && state.email !== null ){
                  return state.email
                }else{
                  return "mark.phillips1965@gmail.com"
                }

             },
        
        userIdSiteId: (state,rootState) =>{
 
          console.log("RootState",rootState)

              return  state.user.idToken + "" + rootState.getSiteId
        },
         }
        
    
      

    export default {
      state : defaultstate,
      getters,
      actions,
      mutations
    }
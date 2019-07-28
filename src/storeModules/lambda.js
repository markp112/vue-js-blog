
import Amplify from 'aws-amplify';
//import auth from '@aws-amplify/auth';
import API from '@aws-amplify/api'
//import AWS from 'aws-sdk'
import config from '../AWS/amplifyConfigure';

Amplify.configure(config)

import axios from '../axios/mockserver';

import sparkzError from '../gobals/error'

const errorCodes = sparkzError.sparkCMSErrorCodes;
const stdError = sparkzError.stdErr;

const Logger = Amplify.Logger;

class logRecord {
    constructor(functionCalled,date, data){
        this.functionCalled = functionCalled
        this.date = date
        this.data = data

    }
}

Logger.LOG_LEVEL = "INFO"

const logger = new Logger("store:Lambda")

const defaultState = {
    OFFLINE : false,
    callLog :[] ,
    
}

const mutations ={

    updatelog : (state,logData ) => {
        //only capture last 100 calls
        if(state.callLog.length > 100){
            state.callLog = []
        }

        state.callLog.push(logData)
    },

}

const actions = {


    



    //
    // Retrieve items for the left hand menu  side bar based on the button clicked on the top toolbar
    // Expects  dataItems to contain the name of the menu to be retrieved
    // and the location of the menu, this is used by lambda to retrieve the correct item
    //
    // Parameter: object -- Item - Primary key correlating to the mainAttribute field
    ///                     subItem - subItem correlatiing to the sort key

    LambdaGetData: async ({state,commit,dispatch}, dataItems) => {


        console.log("--> LambdaGetData=",dataItems)
        
        const logRec = new logRecord("LambdaGetData",new Date(),dataItems)
        
        commit("updatelog", logRec)

            if(state.OFFLINE == true){
                return new Promise(function(resolve)
                {
                 dispatch("getMockedData",dataItems)
                 .then(data =>{
                    console.log("data=",data)
                    resolve (data)
                    
                    })
                                
                });
            }

            else{
           
            logger.debug('retireveMenuItems Called with parameter', dataItems.Item, dataItems.subItem);
            
            var data = {
                key: dataItems.item,
                sortKey: dataItems.subItem
            };
            let apiName = 'sparkzCMS_GetAttribute';
            let path = 'dev/sparkzCMS_GetAttribute';
            let init = {
                body: data
            };
   
              // return new Promise(function(resolve,reject){

            let result= await   API.post(apiName, path, init)
               //.then(result =>{
            if(result){
                console.log('res= ',result )
                
                if ( result.statusCode == 200 ){
                    
                    const data = JSON.parse (result.body).data
                    
                    if (data.hasOwnProperty('Item')){
                        return (data.Item.dataItems)
                    }else{
                        const data =
                                    {msg: errorCodes.dynamodb.noDataReturned.message ,
                                        code:errorCodes.dynamodb.noDataReturned.statusCode}
                   return data
                    }
                }
               }
               
              
            }
        
      
            
      
        },
    
    //---------------------------------------------------------------------------------------------------------
    // functions related to creating a new site 
    // create s3 bucket
    // create site record
    // create profile record

    LambdaCreateSiteRecord:({commit}, dataItems) =>{
        logger.debug('LambdaCreateSiteRecord Called with parameter', dataItems);
          const logRec = new logRecord("LambdaCreateSiteRecord",new Date(),dataItems)
        commit("updatelog", logRec)  

        var data = {
            siteName : dataItems.siteName,
            siteId : dataItems.siteId,
            userId : dataItems.userId,
            siteDescription : dataItems.siteDescription,
            dateCreated : dataItems.dateCreated,
            dateLastEdited : dataItems.dateLastEdited,
            isPublished : dataItems.isPublished,
            url : dataItems.url,
            s3EditorBucketName : dataItems.s3EditorBucketName,
            pages : dataItems.pages


        };
        let apiName = 'sparkzCMS_createMasterSiteRecord';
        let path = 'dev/sparkzCMS_createSiteRecord';
        let init = {
            body: data
        };

           return new Promise(function(resolve,reject){

           API.post(apiName, path, init)
           .then(result =>{
        
            console.log('res= ',result )
            
            if ( result.statusCode == 200 ){

                resolve (result.body.result)
                return
            }
           })
           
           .catch(err =>{
            logger.debug('error from dynamodb', err);
            reject(err)
           })
        })


    },

    LambdaCreateS3Bucket:({commit},dataItems) => {
        
        
        const logRec = new logRecord("LambdaCreateS3Bucket",new Date(),dataItems)
        commit("updatelog", logRec)

        var data = {
           
            siteId : dataItems.siteId,
            userId : dataItems.userId

        };
        
        let apiName = 'sparkzCMS_createS3SiteFolder';
        let path = 'dev/sparkzCMS-createS3SiteFolder';
        
        let init = {
            body: data
        };

           return new Promise(function(resolve,reject){

           API.post(apiName, path, init)
           .then(result =>{
        
            console.log('res= ',result )
            
            if ( result.statusCode == 200 ){

                resolve ("Success")
                return 
            
            }
           })
           
           .catch(err =>{
            logger.debug('error from dynamodb', err);
            reject(err)
           })
        })

    },

    LambdaAddSiteToProfile:({commit},dataItems) => {
        logger.debug('LambdaAddSiteToProfile Called with parameter', dataItems);
         
        const logRec = new logRecord("LambdaAddSiteToProfile",new Date(),dataItems)
        commit("updatelog", logRec)


        var data = {
            email : dataItems.email,
            siteName : dataItems.siteName,
            siteId : dataItems.siteId

        };
        
        let apiName = 'sparkzCMS_addSiteToProfile';
        let path = 'dev/sparkzCMS_addSiteToProfile';
        let init = {
            body: data
        };
        console.log('Init = ', init)
           return new Promise(function(resolve,reject){

            API.post(apiName, path, init)
            .then(result =>{
            
                console.log('res= ',result )
                
                if ( result.statusCode == 200 ){

                    resolve (result.body.result)
                    return
                }
           })
           
           .catch(err =>{
            logger.debug('error from dynamodb -',  err);
            reject(err)
           })
        })

    },

    //===========================================================================================================

    //
    // LambdaGetUsersListofSites - retrieve the list of site the user has created
    ///
    LambdaGetUsersListofSites:({commit},email)=>{
        logger.debug('LambdaGetUsersListofSites', email);
            
        const logRec = new logRecord("LambdaGetUsersListOfSites",new Date(),email)
        commit("updatelog", logRec)
        
        let apiName = 'sparkzCMS_GetUsersSiteList';
        let path = 'dev/sparkzCMS_GetUsersSiteList';
        let init = {
            body: email
        };
                
        return new Promise(function(resolve,reject){

            API.post(apiName, path, init)
            .then(result =>{
            
                           
                if ( result.statusCode == 200 ){
                    console.log("returning -->",(JSON.parse(result.body).data.Item.sites))

                    resolve (JSON.parse(result.body).data.Item.sites)
                    return
                }
           })
           
           .catch(err =>{
            logger.debug('error from dynamodb -',  err);
            reject(err)
           })
        })

    },

//===========================================================================================================
// lambdaSaveToolBarSettings(toolBarProps)
// 
// save any changes that have been made to the toolBarProps for the users toolbar at the top of the page 
// to AWS
// Expects toolBarProps which contains the list of toolBarProps as each property does not have a dirty flag
// the entire toolbar props are sent and these will replace those in the store
//===========================================================================================================
    lambdaSaveToolBarSettings:({commit},dataItems)=>{
        logger.debug('--> lambdaSaveToolBarSettings Called', dataItems)
        
        const logRec = new logRecord("LambdaSaveToolBarSettings",new Date(),dataItems)
        commit("updatelog", logRec)

        let apiName = 'sparkzCMS_saveToolBarProps';
        let path = 'dev/sparkzCMS_saveToolBarProps';
        
        let init = {
            body: dataItems
        };
       
        console.log("init=",init)
        return new Promise(function(resolve,reject){

            API.post(apiName, path, init)
            .then(result =>{
            
                console.log('res= ',result )
                
                if ( result.statusCode == 200 ){

                    resolve (result.body.result)
                    return
                }
           })
           
           .catch(err =>{
            logger.debug('error from dynamodb -',  err);
            reject(err)
           })
        })

    },

    //===========================================================================================================
    // lambda_putDynamodb
    //
    // Generic function to write content to dynamoDb that only needs a return status i.e. does not return
    // anything other than success or fail + error
    // dataItems contains the data to be sent to dynamo and should conform to :
    // key: main key
    // subKey: sub key
    // dataItems: data to be stored
    //===========================================================================================================
    lambda_putDynamodb:({commit},dataItems)=>{
        console.log ("--> lambdaGenericSave Called ")
        const logRec = new logRecord("Lambda_putDynamodb",new Date(),dataItems)
        commit("updatelog", logRec)
        console.table("dataItems", dataItems)

        let apiName = 'sparkzCMS_putDynamoDbRecord';
        let path = 'dev/sparkzCMS_putDynamoDbRecord';
        
        let init = {

            body: dataItems

        };
        
        
        return new Promise(function(resolve,reject){

            API.post(apiName, path, init)
            .then(result =>{
            
                console.log('res= ',result )
                
                if ( result.statusCode == 200 ){

                    resolve (result.body.result)
                    return
                }
           })
           
           .catch(err =>{
            logger.debug('error from dynamodb -',  err);
            reject(err)
           })
        })

    },


    //
      //===========================================================================================================
    // lambda_putcontentToS3
    //
    // Generic function to write an object as in not a file to an S3 bucket
    // expects parameter s3Data:
    // bucketName - name of bucket to write content to
    // fileName - name of file to create in S3
    // content - content to be stored in S3
    //===========================================================================================================
    lambda_putcontentToS3:({commit},s3Data)=>{
        console.log ("--> lambda_putcontentToS3Called ")
       
        const logRec = new logRecord("Lambda_putContentToS3",new Date(),s3Data)
        commit("updatelog", logRec)

      

        let apiName = 'sparkz_CMSPutContentToS3';
        let path = '/dev/sparkz_CMSPutContentToS3';
        
        let init = {

            body: s3Data

        };
        
        
        return new Promise(function(resolve,reject){

            API.post(apiName, path, init)
            .then(result =>{
            
                console.log('res= ',result )
                
                if ( result.statusCode == 200 ){

                    resolve (result.body.result)
                    return
                }
           })
           
           .catch(err =>{
            logger.debug('error from dynamodb -',  err);
            reject(err)
           })
        })

    },

    lambda_GetContentFromS3:({commit},bucketDetails) => {
        console.log ("-->  lambda_GetContentFromS3 ")


        const logRec = new logRecord("Lambda_GetContentFromS3",new Date(),bucketDetails)
        commit("updatelog", logRec)

        let apiName = 'sparkzCMS_GetContentFromS3';
        let path = '/dev/sparkzCMS_GetContentFromS3';
        
        let init = {

            body: bucketDetails

        };
        
        
        return new Promise(function(resolve,reject){

            API.post(apiName, path, init)
            .then(result =>{
            
                console.log('res= ',result.body )
                
                if ( result.statusCode == 200 ){
                   
                    resolve (result.body)
                    return
                }
           })
           
           .catch(err =>{
            logger.debug('error from dynamodb -',  err);
            reject(err)
           })
        })
    },

//-----------------------------------------------------------------------------------------------------------------

lambdaGetToolBarProps:({commit},dataItems)=>{
    logger.debug('--> lambdaGetToolBarProps Called', dataItems)
    
    const logRec = new logRecord("LambdaGetToolBarProps",new Date(),dataItems)
    commit("updatelog", logRec)

    let apiName = 'sparkzCMS_getToolBarProps';
    let path = 'dev/sparkzCMS_getToolBarProps';
    
    let init = {
        body: dataItems
    };
   
 
    return new Promise(function(resolve,reject){

        API.get(apiName, path, init)
        .then(result =>{
        
            console.log('res= ',result )
               
            if ( result.statusCode == 200 ){
               
                
                resolve (JSON.parse(result.body).data)
                return
            }
       })
       
       .catch(err =>{
        logger.debug('error from dynamodb -',  err);
        reject(err)
       })
    })
    
   
},


getMockedData:async  function(commit,dataItems) {
  
    let data =[]
    console.log('getMockedData called=',dataItems)
    /*const logRec = new logRecord("getMockedData",new Date(),dataItems)
         commit("updatelog", logRec) */

   return new Promise(function(resolve){
  
    axios.get(dataItems.item)
    .then(res =>{
        console.log("resp= ",res)
        data =res.data;
        resolve(data)
    })
    }



    )}
}

const getters={
    
    isOffline(state) {
        
        console.log("oofline called",state.OFFLINE)
        return (state.OFFLINE)
    },
}
export default{
    state:defaultState,
    actions,
    getters,
    mutations
}
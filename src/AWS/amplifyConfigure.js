
import config from './awsConfig'

export default ({
    Auth: {

        
        identityPoolId: config.AWS.cognito.identityPoolId ,
        // REQUIRED - Amazon Cognito Region
        region: config.AWS.cognito.region,

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: config.AWS.cognito.userPoolId,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: config.AWS.cognito.userPoolWebClientId,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        
        // OPTIONAL - customized storage object
        //storage: new MyStorage(),
        
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        //authenticationFlowType: 'USER_PASSWORD_AUTH'
    },
    API:{
        endpoints: [
            {
                name: "sparkzCMS_GetAttribute",
                
                endpoint: "https://uk81f8cud0.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            },
            {
                name: "sparkzCMS_isUserRegistered",
                
                endpoint: "https://rafu92nenk.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            },
            {
                name: "sparkzCMS_RegisterUser",
                endpoint: "https://79hqnk5v66.execute-api.eu-west-2.amazonaws.com",
                region: "eu-west-2",
            },
            
            
            //
            //API End points for creating a new site
            //          
            {
                //purpose adds the new site to the users profile in the users table where we maintain a list of sites for reference
                name: "sparkzCMS_addSiteToProfile",
                endpoint: "https://3mzad9wen0.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
                

            },
            {
                //purpose create the master site record for this site
                name: "sparkzCMS_createMasterSiteRecord",
                endpoint: "https://90oqyouxo8.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            },
            {
                //purpose create the S3 bucket into which the pages will sit
                name: "sparkzCMS_createS3SiteFolder",
                endpoint: "https://7y4mmpfyje.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            },
            {
                //Retrieve the list of sites the user has created
                name: "sparkzCMS_GetUsersSiteList",
                endpoint: "https://mf9h4d2rog.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            },
            {
                //Save the custom properties the user has added to the main site toolbar 
                name: "sparkzCMS_saveToolBarProps",
                endpoint: " https://3pdojan5qc.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            },
            {
                //retrieve the custom properties the user has added to the main site toolbar 
                name: "sparkzCMS_getToolBarProps",
                endpoint: "https://ivdofick0f.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            },
            {
                //generic put function for writing records to DynamoDb
                name: "sparkzCMS_putDynamoDbRecord",
                endpoint: "https://lbjcgzc9z2.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            },

            {
                //generic function for writing objects to S3 bucket that are not images or files
                name: "sparkz_CMSPutContentToS3",
                endpoint: "https://pyx40urz9e.execute-api.eu-west-2.amazonaws.com",
                region: "eu-west-2",
            },
         
            {
                //generic function for getting objects from S3 bucket  
                name: "sparkzCMS_GetContentFromS3",
                endpoint: "https://rqwtkkrz48.execute-api.eu-west-2.amazonaws.com",
                region: "eu-west-2",
            },
           

///            
            {
                name: "myLamdaFunction",
                endpoint: "https://nbip5tqqdd.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            }
            
        ]
    }
});

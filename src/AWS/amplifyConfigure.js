
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



            {
                name: "myLamdaFunction",
                endpoint: "https://nbip5tqqdd.execute-api.eu-west-2.amazonaws.com/",
                region: "eu-west-2",
            }
            
        ]
    }
});

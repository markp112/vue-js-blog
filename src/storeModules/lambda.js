
import Amplify from 'aws-amplify';
//import auth from '@aws-amplify/auth';
import API from '@aws-amplify/api'
//import AWS from 'aws-sdk'
import config from '../AWS/amplifyConfigure';

Amplify.configure(config)


const Logger = Amplify.Logger;

const OFFLINE =false;

Logger.LOG_LEVEL = "DEBUG"

const logger = new Logger("store:menus")

const actions = {

    //
    // Retrieve items for the left hand menu  side bar based on the button clicked on the top toolbar
    // Expects  dataItems to contain the name of the menu to be retrieved
    // and the location of the menu, this is used by lambda to retrieve the correct item
    //

    LambdaretrieveMenuItems:  ({dispatch}, dataItems) => {


        console.log("LambdaRetrieveMenuItems=",dataItems)
       
            if(OFFLINE == true){
                return new Promise(function(resolve,reject)
                {
                 dispatch("getMockedData",dataItems)
                 .then(data =>{
                    console.log("data=",data)
                    resolve (data)
                    
                    })
                                
                });
            }

            else{
           
            const menu = dataItems.menu
            const menuLocation = dataItems.menuLocation
            
            logger.debug('retireveMenuItems Called with parameter', menu, menuLocation);
            
            var data = {
                key: menu,
                sortKey: menuLocation
            };
            let apiName = 'sparkzCMS_GetAttribute';
            let path = 'dev/sparkzCMS_GetAttribute';
            let init = {
                body: data
            };
   
               return new Promise(function(resolve,reject){

               API.post(apiName, path, init)
               .then(result =>{
            
                console.log('res= ',result )
                
                if ( result.statusCode == 200 ){

                    resolve (JSON.parse(result.body).data.Item.dataItems)
                
                }
               })
               
               .catch(err =>{
                logger.debug('error from dynamodb', err);
                reject(err)
               })
            })
        }
      
            
      
        },
    
    



getMockedData: ({},dataItems)=>{
    let data =[]

console.log('getMackedData called=',dataItems)

    return new Promise(function(resolve,reject){

    switch (dataItems.item){
        case "Pages":
         data=[{
               menuItem:"Main Menu",
               component:"mainMenu",
               icon:"Home"
               },
               {
               menuItem:"Side Bar",
               component:"sideBarLHS",
               icon:"Home"
               },
        ]
        break;
        case "pageItems":
        data =[
        {
            title:"Home",
            status:"edit",
            icon:"home",
            url:"/",
            type:"page",
            dateCreated:"",
            dateEdited:"",
            version:""
        },
        {
            title:"Content",
            status:"edit",
            icon:"",
            url:"/Content",
            type:"page",
            dateCreated:"",
            dateEdited:"",
            version:""
        },
        {
            title:"About",
            status:"edit",
            icon:"question",
            url:"/about",
            type:"page",
            dateCreated:"",
            dateEdited:"",
            version:""
        }
      ];

        break

}
console.log('resolving with',data)
resolve( data)
}


)
    
}
}

export default{
    actions,
}
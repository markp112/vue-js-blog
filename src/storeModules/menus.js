
import Amplify from 'aws-amplify';
//import auth from '@aws-amplify/auth';
import API from '@aws-amplify/api'
//import AWS from 'aws-sdk'
import config from '../AWS/amplifyConfigure';

Amplify.configure(config)


const Logger = Amplify.Logger
Logger.LOG_LEVEL = "DEBUG"

const logger = new Logger("store:menus")


const defaultstate ={
    
    menuItems:[],
    currentPage:'',


}
const mutations = {

    setMenuItems: (state,menu)=>{
       logger.debug('setMenuItems called',menu)
        
       state.menuItems=[...menu]

    
    },
    
    
    }
    


const getters= {

    getMenuItems:state =>{
        logger.debug('getMenuItems Called',state)

        if (state.menuItems !== undefined){
            return state.menuItems
        }else{
            return [{menuItem:"No Items",component:'',icon:''}]
        }
        
    },

    
}


const newLocal = {
   
    retrieveMenuItems: async ({commit,dispatch}, dataItems) => {

        
        try {


            
            var menuItems = await dispatch("LambdaretrieveMenuItems",dataItems,{root:true})

                console.log('menuItems =',menuItems)
                        
                commit('setMenuItems', menuItems);
                  
    }
        catch (err) {
            logger.debug('error from dynamodb', err);
        }
    },


   
};


const actions = newLocal


export default {
  
   state: defaultstate,
   getters,
   mutations,
   actions
}
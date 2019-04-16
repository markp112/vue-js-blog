
import Amplify from 'aws-amplify';
//import auth from '@aws-amplify/auth';
import API from '@aws-amplify/api'
//import AWS from 'aws-sdk'
import config from '../AWS/amplifyConfigure';

Amplify.configure(config)


const Logger = Amplify.Logger
Logger.LOG_LEVEL = "DEBUG"

const logger = new Logger("store:menus")


const actions = {

    LambdaretrieveMenuItems: async ({commit}, dataItems) => {

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
        try {
            var result = await API.post(apiName, path, init);
            console.log('res=',result )
            
            if (result.statusCode == 200){
                return JSON.parse( result.body).data.Item.menuItems
            }
        }
        
        catch (err) {
            logger.debug('error from dynamodb', err);
            return err
        }
    },



}
export default{
    actions,
}
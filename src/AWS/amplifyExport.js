
import Amplify from 'aws-amplify';
//import auth from '@aws-amplify/auth';
import API from '@aws-amplify/api'
//import AWS from 'aws-sdk'
import config from './amplifyConfigure';

Amplify.configure(config)


const Logger = Amplify.Logger
Logger.LOG_LEVEL = "DEBUG"

const logger = new Logger("store:menus")

export default {
    Amplify,
    logger
}
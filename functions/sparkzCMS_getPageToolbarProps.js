//
// sparkzCMS_getToolBarProps.js
// Purpose: retrieves any custom toolbar settings for the current page
// f
// created: 01 July 2019
// required parameter - dataItems
// contains 
// the siteKey - userId+SiteId
// subKey - Text field indicating the element to be retrieved 
//
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' });


const response = {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ message: "Hello World" })
}


exports.handler = async(event, context, callback) => {

    const data = event.dataItems

    let params = {
        TableName: "sparkCMS",
        Item:{
            'mainAttribute': data.siteKey,
            'subAttribute' : data.subKey
        },

            


        },

        const data =  await docClient.get(params).promise()
        .then(data => {
            console.log('post dynamodbCall')
            response.statusCode = 200
            response.body = JSON.stringify({data })
            callback(null, response)
            return
        })
        .catch(err => {
            console.log('err=', err)
            response.statusCode = 500
            response.body = JSON.stringify({ errorMessage: err })
            callback(err);
            return
        })
    };

//
// sparkzCMS_saveToolBarPRops.js
// Purpose: writes the updated toolbar props the user has changed to Dynamodb
// f
// created: 01 July 2019
// required parameter - dataItems
// contains the list of toolBarProps
// the siteKey - userId+SiteId
// subKey - Text field indicating the element to be updated
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
        TableName: "sparksCMS",
        Key: {
            'mainAttribute': data.siteKey,
            'subAttribute' : data.subKey
        },

        Item:  data.dataItems 
    }


        const data =  await docClient.put(params).promise()
        .then(data => {
            console.log('post dynamodbCall')
            response.statusCode = 200
            response.body = JSON.stringify({ result: "update completed" })
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



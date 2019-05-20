//
// sparkzCMS_getSiteList.js
// Purpose: returns a list of the sites the user has created
// from the CMSUsers table
// created: 19 May 2019
// required parameter - Email of the user to look them up in the table
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

    const email = event.email
    

    console.log('Event=', event)

    if (email == undefined ) {
        response.statusCode = 400
        response.errorMessage = "Missing or invalid parameters"
        response.body = JSON.stringify({ errorMessage: "Missing or invalid parameters" })
        callback(response)
        return
    }

    const params = {
        TableName: "cmsUsers",
        Key: {
            email: email,
            
        },
        ProjectionExpression:"sites",
        ConsistentRead: false
    }
    try {
        
        const data = await docClient.get(params).promise()
            .then(data => {
              
                response.body = JSON.stringify({ data })
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

    }
    catch (err) {
        console.log('outter error=', err)
    }

};

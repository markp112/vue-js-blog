// sparkzCMS_addSiteToProfile.js
// purpose: when creating a new site add the basic details to the users profile
// to avoid having to retreive these from the sites linked to a user as we will have 
// read the users table when we logged in
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

    console.log("Function Called with event-->", event)

    const siteName = event.siteName
    const siteId = event.siteId
    const email = event.email


    console.log('Event=', event, siteId, siteName)

    if (siteId == undefined || siteName == undefined) {
        response.statusCode = 400
        response.errorMessage = "Missing or invalid parameters"
        response.body = "Missing or invalid parameters "

        callback(response)
        return
    }

    let params = {
        TableName: "cmsUsers",
        Key: {
            'email': email,

        },
        AttributesToGet: ['sites']
    };


    // check if the user has created at least one site previously

    const sitesExist = await docClient.get(params).promise()
        .then(sites => {
            console.log('sites= ', sites)

            //if item is empty then this is the first time the user is creating a site

            if (Object.entries(sites.Item).length === 0 && sites.Item.constructor === Object) {
                console.log('Adding Sites to Prfile')
                params = {
                    TableName: "cmsUsers",
                    Key: {
                        'email': email,

                    },
                    UpdateExpression: "SET #attrName =  :attrValue ",
                    ExpressionAttributeNames: {
                        "#attrName": "sites"
                    },
                    ExpressionAttributeValues: {
                        ':attrValue': [{
                            "siteId": siteId,
                            "sitename": siteName
                        }],
                    }
                }
            }
            // user has created at least one site before
            else {
                console.log('appending to list')
                params = {
                    TableName: "cmsUsers",
                    Key: {
                        'email': email,

                    },
                    UpdateExpression: "SET #attrName = list_append(#attrName, :attrValue) ",
                    ExpressionAttributeNames: {
                        "#attrName": "sites"
                    },
                    ExpressionAttributeValues: {
                        ':attrValue': [{
                            "siteId": siteId,
                            "sitename": siteName
                        }]
                    },
                }
            }
        })



    const data = await docClient.update(params).promise()
        .then(data => {
            console.log('post dynamodbCall')
            response.statusCode = 200
            response.errorMessage = ""
            response.body = JSON.stringify({ result: "updated completed" })
            callback(null, response)
            return
        })
        .catch(err => {
            console.log('err=', err)
            response.statusCode = 500
            response.body = err
            callback(err);
            return
        })


};

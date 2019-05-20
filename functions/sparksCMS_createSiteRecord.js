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
    body: JSON.stringify({ message: "" })
}


exports.handler = async(event, context, callback) => {

    const siteName = event.siteName
    const siteId = event.siteId
    const userId = event.userId
    const siteDescription = event.siteDescription
    const dateCreated = event.dateCreated
    const dateLastedEdited = event.dateLastedEdited
    const pages = event.pages
    const isPublished = event.isPublished
    const url = event.url
    
    


    console.log('Event=', event, siteId, siteName)

    if (siteId == undefined || userId == undefined) {
        response.statusCode = 400
        response.errorMessage = "Missing or invalid parameters"
        response.body = JSON.stringify({ errorMessage: "Missing or invalid parameters" })
        callback(response)
        return
    }

    let params = {
        TableName: "sparksCMS",
        Key: {
            'mainAttribute': userId,
            'subAttribute': siteId

        },
        Item: {
            siteName: siteName,
            siteDescription: siteDescription,
            isPublished: false,
            dateCreated: dateCreated,
            dateLastedEdited: dateLastedEdited,
            s3EditorBucketName: s3EditorBucketName,
            pages: pages
        }
    }



    const data = await docClient.put(params).promise()
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

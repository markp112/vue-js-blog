const AWS = require("aws-sdk");
const s3 = new AWS.S3()


const response = {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ message: "Hello World" })
}


exports.handler = async(event, context, callback) => {

    const bucketName = event.bucketName
    const userId = event.userId
    const siteId = event.siteId

    const s3BucketHome = 

    s3.

    console.log('Event=', event, key, sortKey)

    if (key == undefined || sortKey == undefined) {
        response.statusCode = 400
        response.errorMessage = "Missing or invalid parameters"
        response.body = JSON.stringify({ errorMessage: "Missing or invalid parameters" })
        callback(response)
        return
    }

    const params = {
        TableName: "sparkCMS",
        Key: {
            mainAttribute: key,
            subAttribute: sortKey,
        },
        ConsistentRead: false
    }
    try {
        console.log('entered Try')
        const data = await docClient.get(params).promise()
            .then(data => {
                console.log('post dynamodbCall')
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

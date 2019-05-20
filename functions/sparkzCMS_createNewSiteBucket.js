const AWS = require("aws-sdk");
const s3 = new AWS.S3()
const siteBucket = "sparkzcmssites"

const response = {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ message: "Hello World" })
}

// create a 'folder' in S3 ready for the new site
// calling the function multiple times with the same folder key will not cause an error S3 will not create a duplicate bucket
//
exports.handler = async(event, context, callback) => {

    //    const bucketName = event.bucketName
    const userId = event.userId
    const siteId = event.siteId
    let statusCode = 200
    let err1 = null

    console.log('Event=', event, userId, siteId)

    if (userId == undefined || siteId == undefined) {
        response.statusCode = 400
        response.errorMessage = "Missing or invalid parameters"
        response.body = JSON.stringify({ errorMessage: "Missing or invalid parameters" })
        callback(response)
        return
    }



    var params = {
        Bucket: siteBucket,
        Key: "users/" + userId + "/" + siteId + "/"

    }
    // check to see if Bucket and key combo already by attempting to read the head object

    const head = await s3.headObject(params).promise()
        .then(head => {
            console.log('Found head', head)
            response.body = JSON.stringify(head)
            callback(null, response)
            return
        })

        .catch(err => {

            console.log("error-->", err, '############')

            statusCode = err.statusCode
            err1 = err
        })

    //
    // 404 indicates bucket does not exist, so create it
    //
    if (statusCode == 404) {

        const data = await s3.putObject(params).promise()
            .then(data => {
                console.log('S3 put returned with ', data)
                response.body = JSON.stringify({ data })
                callback(null, response)
                return
            })
    }
    else {
        console.log('err=', err1)
        response.statusCode = 500
        response.body = JSON.stringify({ errorMessage: err1 })
        callback(response);
        return
    }
}

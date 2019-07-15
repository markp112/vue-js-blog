var AWS = require('aws-sdk');
var s3 = new AWS.S3();

const response = {
    statusCode: 200,
    body: JSON.stringify('success'),
};

exports.handler = async(event, context, callback) => {
    // TODO implement


    const s3Bucket = event.s3BucketName
    const content = event.content
    const filename = event.fileName

    console.log("event= ", event)
    console.log("content =", content)

    const params = {
        Bucket: s3Bucket,
        Key: filename,
        Body: content
    }

    console.log("Params = ", params)

    const res = await s3.putObject(params).promise()
        .then(r => {
            console.log('S3 put returned with ', r)

            response.statusCode = 200

            response.body = JSON.stringify({ r })

            callback(null, response)

            return
        })
        .catch(err => {

            console.log("err-->", err)

            response.statusCode = 500

            response.body = JSON.stringify({ errorMessage: err });

            callback(response)

            return
        })



}

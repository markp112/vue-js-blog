var AWS = require('aws-sdk');
var s3 = new AWS.S3();

const response = {
    statusCode: 200,
    body: JSON.stringify('success'),
};

exports.handler = async(event, context, callback) => {
    // TODO implement


    const s3Bucket = event.s3BucketName
  
    const key = event.key
    //console.log("event= ", event)


    const params = {
        Bucket: s3Bucket,
        Key: key  

    }

    //console.log("Params = ", params)

    const res = await s3.getObject(params).promise()
        .then(text => {
            console.log('S3 put returned with ', text)

            response.statusCode = 200

            response.body = JSON.stringify({ text })

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

const AWS = require("aws-sdk");

const response ={
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ message: "Hello World" })
  }


module.exports.index = (event, context, callback) => {
  callback(null, response );
};
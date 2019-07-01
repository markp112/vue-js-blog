const stdErr = {
    message:"",
    statusCode:0,
    source:""
}

const sparkCMSErrorCodes ={

    dynamodb:{
        noDataReturned:{
                        statusCode : 1001,
                        message : "An error occurred no matching data was found for the query" 
                        }
    }

}
export default {
    stdErr,
    sparkCMSErrorCodes
}
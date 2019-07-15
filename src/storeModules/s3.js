// not used at present 14 July 2019

import { Storage } from 'aws-amplify'



 function s3PutObject (bucket,object){



    console.log("--> s3PutObject")
   

        return new Promise(function(resolve, reject){
            const stored =  Storage.put(bucket, object ,{ contentType: 'text/plain'})
            .then(res=>{
                console.log("res=",res)

            })
            .catch(err=>{
                console.log("###Error:", err)
            })
        })

        
    }

    
export default{
    s3PutObject
}
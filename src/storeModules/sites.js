

/// newSite.js
// store for data associated to creating a new site
//


const guid = function () {
      
    
    // Public Domain/MIT
            var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
    
            return newGuid;
    }


const defaultState = {

    // holds list of pre defined templates once these have been built
    templates:[],

    // siteData contains the attributes associated to the site
    siteData:{
        siteName : "",
        siteDescription : "",
        domainName : "",
        s3EditorBucketName : "",        // deployment bucket for previewing site before making live
        s3Buckethost : "",
    },

    //site list holds the list of sites the user has created
    siteList:[],

}

const mutations = {

    setTemplates: (state, templateList)=> {
        
        if(templateList){
            state.templates = [...templateList]
        }
    },

    clearTemplates: state =>{
        
        state.templates = [];

    },

    setSiteData: (state, newSiteData) => {

        state.siteData = newSiteData;
    },

    setListofSites: (state, siteList) =>{
        state.siteList = [...siteList]
    }

}

const actions = {

    // createNewSite
    // write the new site data to the cloud
    // populate the site working folder with the content from the template
    // write the record to DynamoDb logging details of the bucket
    //
    //
    createNewSite: async ({commit,dispatch,rootState},newSiteData) => {

        console.log('createNewSite called', newSiteData)

        const tokenId = rootState.moduleUsers.user.idToken

        //add required attributes to each page
        if(newSiteData.pages){
            let pageId = 0
            let newPages =[]
            let page = {}

            for (let pg of newSiteData.pages){
                page.pageName = pg
                page.dateCreated = new Date()
                page.dateEdited = new Date()
                page.pageId = pageId++    
                page.publish = "n"
                page.folder = "default"
                newPages.push({"page":page})
            }

            console.log("newPages",newPages)
            newSiteData.pages = newPages

        }

        newSiteData.siteId = guid();
        newSiteData.userId = tokenId
        newSiteData.s3EditorBucketName = tokenId + "/" + newSiteData.siteId

        try{
                const userModule = rootState.moduleUsers
                console.log ("userModule = ", userModule)
                
                let data = {
                    email : userModule.user.email,
                    siteId : newSiteData.siteId,
                    siteName : newSiteData.siteName 
                } 

                console.log("data = ",data)

                const resultProfile  = await dispatch("LambdaAddSiteToProfile",data,{root:true})
                .then( dispatch("LambdaCreateSiteRecord",newSiteData,{root:true}))
                .then (() =>{
                    data.userId = tokenId
                     dispatch("LambdaCreateS3Bucket",data,{root:true})
                    .then (status =>{
                        console.log('resolved 3 rd promise results = ',status)
                        commit("setSiteData",newSiteData)

                    })
                }

                )
                .catch(err=>{
                    console.log("Failed to create new website", err)
                })
  
        }

        catch (err){
            console.log('Error= ',JSON.parse(err))
        }



    },

    retrieveListOfSites: async({commit, dispatch, rootState}) => {

        console.log('retrieveListOfSites')

        
        const userModule = rootState.moduleUsers
                
        let data = {
            email : userModule.user.email,
        } 

        const resultProfile  = await dispatch("LambdaGetUsersListofSites",data,{root:true})
        .then( sites =>{

            commit("setListofSites",sites)
            return 
        }
        

        )
        .catch(err=>{
            console.log("Failed to create new website", err)
        })

}


}

const getters = {

    getSiteList:state =>{
        return state.siteList
    }

}

export default {
    state:defaultState,
    mutations,
    actions
}
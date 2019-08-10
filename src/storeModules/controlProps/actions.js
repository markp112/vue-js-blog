import { button } from "@aws-amplify/ui";


export const     updateProperty = ({commit,dispatch}, item)=>{

        commit("setProperty", item)
        dispatch("updateDirtyFlag",item.control)
    
    }

    
/// retireve properties from dynamoddb which are user specific
//PageName - the name of the page the user has requested this is used to
// tag onto the Key to create a unique ID per page
export const   retrieveProperties=({commit,getters,dispatch}, pageName)=>{

        console.log("--> Retrieve Properties Called -->", pageName)
        
        const dataItems ={
            subItem : pageName,
            item    : getters.userIdSiteId

        }
        return new Promise(function(resolve, reject){
            
            dispatch("LambdaGetData", dataItems ,{root:true})

            .then(res =>{
                const data ={
                    key :   pageName,
                    attributes  : res
                    }
   
                //commit("setProps", data)
                commit("setAllProps", data)
                resolve()
           
            })
            .catch(err=>{
                reject(err)
            })
        })
     

    }

// retrieve properties from dynamodb which are not user specific
export const   retrieveNonUserProperties = async ({commit,dispatch}, data)=>{

        console.log("--> Retrieve Non User Properties Called -->", data)
        
     
        
        let res = await dispatch("LambdaGetData", data ,{root:true})
        if(res){

            console.log("Lambda Called -->", res)
            
            const propData ={
                key:data.key,
                attributes: res
                }

            commit("setProps", propData)
            return
       
        }
       
        

    }

    export const  showProperties = ({commit}, data) =>{

        commit ("setActiveControl", data.component)
    }

    // Update allToolBarProps -- used to update with data returned from database
    export const  updateAllToolBarProps=({commit}, toolBarProps)=>{
        commit("setToolBarAllProps",toolBarProps)
    }
    
    // action to update the properties of teh buttons on the user Toolbar
    export const updateToolBarButtonProperty=({commit,dispatch}, buttonProps)=>{
        
        console.log("--> updateToolBarButtonProperty",buttonProps)

        commit("setToolBarButtonProperty", buttonProps)
        
        const dirtyFlag = {
            controlName: "toolBarProps",
            value: true
        }
        dispatch("updateDirtyFlag", dirtyFlag)

    }

    // updateDirtyFlag sets the flag when a control is edited so when 
    // we come to save the data we only need to touch those controls that have been changed
    // minimising the amount of data to be to the cloud
    // expects:
    // object flagToSet - controlName - the control e.g. toolbar
    //                     value - boolean true or false true= control is dirty
    export const   updateDirtyFlag = ({commit},flagToSet) => {
        commit("setIsDirtyFlag",flagToSet)
    }

    // whichPropControl.controlName = the name of the component which we want to set the isLoaded Flag for
    // whichPropControl.value = boolean to indicate true is loaded or false it is not currently loaded
    export const  updateIsPropLoaded=({commit}, whichPropControl) => {
        console.log("--> updateIsPropLoaded", whichPropControl)
        commit("setPropIsLoaded", whichPropControl)
    }

    //saveToolbarSettings
    // save any chnages that have been made to the toolbar, this can be detected by checking the isDirtyFlag
    export const saveToolbarSettings=({state,dispatch,commit},siteData)=>{

        console.table("--> saveToolbarSettings Called", siteData)
        
        return new Promise(function(resolve, reject){
            
            if (state.isDirty && state.isControlDirty.toolBarProps){
                const dataItems = {
                    dataItems : state.toolBarProps,
                    siteKey: siteData.key(),                 //made up of user ID and SiteID
                    subKey: "toolBarProps"
                }
                
                console.log("dataItems=",dataItems)

                dispatch("lambdaSaveToolBarSettings", dataItems)
                .then(() =>{

                    console.log("returned from Lambda Saved toolbarItems")
                    // clear is dirty flag for this item
                    const flagDetails = {
    
                        controlName : "toolBarProps",
                        value : false
                    }
    
                    commit("setIsDirtyFlag", flagDetails)
                   resolve()
    
                })
                .catch(err=>{
                    console.log("toolBarProps Saved failed with ",err)
                    reject(err)
                })
           
           
                }else{
                    resolve()
                }
                
        })
    }

    //Save Changes to the componens that have been edited
    // changes can be detected by checking the isControlDirty Object
    // this function needs to call the save methods of the other store components to have them save their content
    export const    saveChanges=({getters,dispatch,rootState})=>{

            const siteId = rootState.moduleSites.siteId
            const userId = rootState.moduleUsers.user.idToken
            
            console.log("getters.getCurrentPagename()=", getters.getCurrentPageName)

            const siteData = {
                
                siteId : siteId,
                userId : userId,
                pageName : getters.getCurrentPageName,

               key: function  (){
                return  this.userId + this.siteId
               },

               s3BucketName: function (){
                   const s3BucketDefault = "sparkzcmssites/users/"
                   const bucketName = s3BucketDefault + this.userId + "/" + this.siteId + "/" + this.pageName 
                   return  bucketName
               }
            }
           
            console.log("siteData =",siteData)

            return new Promise(function(resolve,reject){
            dispatch("saveToolbarSettings",siteData)  
            .then(()=>{

                dispatch("pageContent_saveContent", siteData)    
            })
            .catch(
              reject()
          )
        })
    }

   
   const MAINTOOLBAR = "toolBarProps"
   
   // retrievePageItems -- retrieve the list of pages for the current section
        // i.e a home page might have an about contact and blog section
        //   
        //
        // TODO: remove hard coded values and substitue with Params    
        export const retrievePageItems = ({commit,dispatch}, dataItems)=>{
        

            console.log('retrievePageItems Called with parameter', dataItems);
        
            try {
                dataItems.item = "pageItems"
                
                dataItems.subItem = "mainMenu"
                
                dispatch("LambdaGetData",dataItems,{root:true})
                .then(pages=>{
                
                    if(pages !== undefined)     {
                        commit('setPageItems', pages);

                    }
                
                })
                
            }
            
            catch (err) {
                console.log('error from dynamodb', err);
            }
        }

        //
        // retrievePageDetail - retrieves the details about the current page the user has clicked on
        // from the list of pages in their site
        //
        export const       retrievePageDetailzz = ({ commit, dispatch, rootState}, page)=>{
            
            console.log("retrievePageDetail Called",page)

            return new Promise(function (resolve, reject){
                
                const siteId = rootState.moduleSites.siteId
                
                const userId = rootState.moduleUsers.user.idToken
                
                // retrieve the basic details for this page
                const dataItems = {
                    item : userId + siteId + "pageDetails",
                    subItem : page
                }
                
                dispatch("LambdaGetData",dataItems,{root:true})
                .then( pageData =>{
                
                    if(pageData !== undefined)     {
                                            
                        commit("setPageData", pageData)
                    
                        if(pageData.hasOwnProperty('toolBarProps')){

                            
                            dataItems.item = userId + siteId
                            dataItems.subItem = "mainToolBar"
                            // retrieve toolBarProperties
                            dispatch("LambdaGetData",dataItems,{root:true})
                            .then (toolbarProps =>{
                                dispatch("updateAllToolBarProps", toolbarProps)
                            }) 
                            
                        }
                    
                    resolve( pageData.template)

                    }else{
                        //No data has been saved
                        const err = {err:"pageData has no content", statusCode:1002}
                        reject (err)
                    }
                
                })
                .catch(err =>{
                    console.log('error from dynamodb', err);
                    reject (err)
                })
            })

        
        }
        
        export const    retrievePageDetail = ({state, getters,dispatch}, page)=>{
            
            console.log("retrievePageDetail Called", page)

            return new Promise(function (resolve, reject){
                
                              // retrieve the basic details for this page
                const dataItems = {

                    item : getters.userIdSiteId + "pageDetails",
                    subItem : page
                }
                console.log("dataItems =", dataItems)
                
                dispatch("getPageDetails", dataItems)
                .then(dispatch("retrieveProperties", MAINTOOLBAR,{root:true}))
                .then(dispatch("pageContent_retrieveContent",page,{root:true}))
                .then(dispatch("pageContent_retrieveTextContent",page,{root:true}))
                .then(()=>{
                    resolve( state.pageData.template)
                })   
                 
                    
             
                .catch(err =>{
                    console.log("Error ",err)
                    reject(err)
                })
                
               
            })
        }
        
        
    export const   getPageDetails=({commit,dispatch},dataItems)=>{
            console.log("--> GetPageDetails called",dataItems)
            
            return new Promise(function (resolve, reject){
                dispatch("LambdaGetData",dataItems,{root:true})
                .then( data =>{
                
                    if(data !== undefined)     {
                        
                        commit("setPageData", data)
                        resolve(data)

                    }else{
                        //No data has been saved
                        const err = {err:"pageData has no content", statusCode:1002}
                        reject (err)
                    }

            })
        
        .catch(err =>{
            console.log('error from dynamodb', err);
            reject (err)
        })
    })
    }

   
    



    
        //set the name of the page we are working on
        export const updateCurrentPageName = ({commit},pageName)=>{
            commit("setCurrentPageName",pageName)
        }